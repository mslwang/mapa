//import * as firebase from 'firebase';
//require('firebase/firestore');
var firebase = require('firebase');

// Run `npm init`, then `npm install request request-debug request-promise-native --save`
"use strict";
var fs = require("fs")
const util = require('util') // for printing objects
const req = require('request-promise-native'); // use Request library + promises to reduce lines of code
//req.debug = true
//require('request-debug')(req);

const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDQlAiLCJ0ZWFtX2lkIjoiNjc3NTU3ZGEtOGY2My0zYTVjLThhNDktZjRmYzhiZjUwYjQyIiwiZXhwIjo5MjIzMzcyMDM2ODU0Nzc1LCJhcHBfaWQiOiJiOWZjYTBhOS03MGFiLTQ0YTEtYjQyNi1mZmU3MDIwZTM1MmUifQ.kFraAWFWj_J3OUhs1xODiFuDz7jbjHKwKHz9D2EJDHw";
const initialCustomerId = "24a794a3-ea5b-4245-bd7a-eb8466f4eb7d";
var config = {
  apiKey: "AIzaSyBKo669TN8weWWWOtrBIaya9lq2Dqotej0",
  authDomain: "td-app-c4b43.firebaseapp.com",
  databaseURL: "https://td-app-c4b43.firebaseio.com",
  projectId: "td-app-c4b43",
  storageBucket: "td-app-c4b43.appspot.com",
  messagingSenderId: "649798001798",
  appId: "1:649798001798:web:557fa094e4e0b8da0e1d07"
}

firebase.initializeApp(config);

const db = firebase.firestore(); 
function options(method, uri, body = null) {
  return {
    json: true,
    body: body,
    uri: 'https://api.td-davinci.com/api/' + uri,
    method: method,
    headers: { 'Authorization': apiKey }
  };
}

//this sounds like tail recursion needing to happen
function get1kCustomers(cont){
  
  var postbody = JSON.parse("{\"continuationToken\": \""+cont+"\"}");
  return req(options("POST","raw-customer-data",postbody))
    .then((resp)=>{

      var users = new Array();

      for(var i=0;i<1000;i++){
        var singleuser = resp.result.customers[i].id;
        users[i]=singleuser;
      //users.push(resp.result.customers[i].id);
      //console.log(resp.result.custreturn omers[i].id);
      }
      /*
      for(var i=0;i<1000;i++){
        console.log(users[i]);
      }*/
      //console.log(resp.result.customers);
      //console.log(users);
      return users.slice();
      return new Promise( (resolve, reject)=> {
          resolve("test");
      })

      resolve(users2);
    }, handleError);
}
//get1kCustomers("")
//var firstcusts = get1kCustomers("").then((result) => {
//  console.log(result);
//});
//console.log(firstcusts);
//console.log(users);
async function test2(){
  let users = await get1kCustomers("");
  console.log(users);
}
//test2();

async function getAllTxnFromUser(custId){

  return req(options("GET", "customers/"+custId+"/transactions"))
    .then((resp) => {
      var trans = resp.result;
      trans = trans.filter(function (e){
        const excludeTypes = ["Income", "Transfer", "Bills and Utilities", "Taxes"];
        return !(excludeTypes.includes(e.categoryTags)) &&
               (typeof e.locationLatitude != "undefined") &&
               (typeof e.locationLongitude != "undefined")

      });
      //todo: get following from transaction data:
      //latitude, longitude, tag
      //todo 2: filter out useless stuff like bills/transfer/etc tags, txns w/o location data, etc.
      const len = trans.length;
      //console.log("Showing "+len+" transactions:\n");
      var locationData = [];

      for(var i=0; i<len; i++){
        //console.log("Transaction occured at location "+trans[i].locationLatitude+", "+trans[i].locationLongitude+" with tags "+trans[i].categoryTags);
        
        var singleloc = ("{\"locationLatitude\":"+trans[i].locationLatitude+", \"locationLongitude\":"+trans[i].locationLongitude+", \"categoryTags\":\""+trans[i].categoryTags+"\"}\n");
        locationData.push(singleloc);
      }
      return locationData;
    }, handleError)
}
getAllTxnFromUser(initialCustomerId);


async function getAllTransactions(){
  let users = await get1kCustomers(""); //this is an array that we will work with 
  let transactions = [];
  for(let i=0;i<5;i++){
    transactions = transactions.concat(await getAllTxnFromUser(users[i]));
  }
  
  
  return ("{\"transactions\":["+transactions+"]}");
}
/*
function upload(lat, lng, tags){
  db.collection("points").doc("Info").set({
    lat, lng, tags
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

let latitude1 = [];
let longitude1 = [];
let tags1 = [];
*/
async function printAllTransactions(){
  let asdf = await getAllTransactions();
  /*
  for(let i=0; i<10; i++){
    latitude1[i]= asdf.transactions[i].locationLatitude;
    longitude1[i]= asdf.transactions[i].locationLongitude;
    tags1[i]= asdf.transactions[i].categoryTags;
  }
  upload(latitude1, longitude1, tags1);*/
  //console.log(asdf);
  
  fs.writeFile("output2.json",asdf,function(err) {
    if (err) {
       return console.error(err);
    }});
  };

printAllTransactions();

/*
fs.open("output.json","w+",function(err, fd) {
  if (err) {
     return console.error(err);
  }});
*/
//for(var i=0;i<1000;i++){
//  getAllTxnFromUser(firstcusts[i]);
//}
//getAllTxnFromUser(initialCustomerId);
/*
(async () => {
  await req(options('GET', 'customers/' + initialCustomerId))
    .then((resp) => {
      const cust = resp.result;
      console.log("\nCustomer\n- Name: " + cust.givenName + " " + cust.surname);
      console.log("- Address: " + util.inspect(cust.addresses.principalResidence));
    }, handleError)

  const [creditCardId, bankAccountId] = await req(options('GET', 'customers/' + initialCustomerId + '/accounts'))
    .then((resp) => {
      return [resp.result.creditCardAccounts[0].id, resp.result.bankAccounts[0].id];
    }, handleError)

  await req(options('GET', 'accounts/' + creditCardId))
    .then((resp) => {
      const cc = resp.result.creditCardAccount;
      console.log("\nCredit Card\n- Number: " + cc.maskedNumber);
      console.log("- Balance: " + cc.balance);
    }, handleError)

  await req(options('GET', 'accounts/' + bankAccountId))
    .then((resp) => {
      const acct = resp.result.bankAccount;
      console.log("\nBank Account\n- Number: " + acct.maskedAccountNumber);
      console.log("- Balance: " + acct.balance);
    }, handleError)

  const tranId = await req(options('GET', 'accounts/' + creditCardId + "/transactions"))
    .then((resp) => {
      return resp.result[0].id;
    }, handleError)

  await req(options('GET', 'transactions/' + tranId))
    .then((resp) => {
      const tran = resp.result;
      console.log("\nCredit Card Transaction\n- $" + tran.currencyAmount);
      console.log("- Timestamp: " + tran.originationDateTime);
      console.log("- Merchant: " + tran.merchantName);
      console.log("- Description: " + tran.description);
      console.log("- Lat/Lon: " + tran.locationLatitude + "/" + tran.locationLongitude);
      console.log("- Tags: " + util.inspect(tran.categoryTags));
    }, handleError)

  const randomNum = Math.floor(Math.random() * 112357) + 1;
  const newTagArray = ["tag" + randomNum.toString()];
  await req(options('PUT', 'transactions/' + tranId + '/tags', newTagArray))
    .then((resp) => {
      console.log("\n***TAGS NOW UPDATED***");
      const tran = resp.result;
      console.log("\nCredit Card Transaction\n- $" + tran.currencyAmount);
      console.log("- Timestamp: " + tran.originationDateTime);
      console.log("- Merchant: " + tran.merchantName);
      console.log("- Description: " + tran.description);
      console.log("- Lat/Lon: " + tran.locationLatitude + "/" + tran.locationLongitude);
      console.log("- Tags: " + util.inspect(tran.categoryTags));
    }, handleError)

  await req(options('GET', 'customers/' + initialCustomerId + '/transactions'))
    .then((resp) => {
      console.log("\nCustomer had " + resp.result.length + " total transactions");
    }, handleError)

  const branchId = await req(options('GET', 'customers/' + initialCustomerId + '/accounts'))
    .then((resp) => {
      const cc = resp.result.creditCardAccounts[0];
      const acct1 = resp.result.bankAccounts[0];
      const acct2 = resp.result.bankAccounts[1];
      console.log("\nCustomer has $" + acct1.balance + " + $" + acct2.balance + " - $" + cc.balance);
      console.log("- Net worth: $" + (acct1.balance + acct2.balance - cc.balance).toFixed(2));
      return resp.result.bankAccounts[0].branchNumber;
    }, handleError)

  await req(options('GET', 'branches/' + branchId))
    .then((resp) => {
      console.log("\nCustomer has an account with a TD branch at " + resp.result.address);
    }, handleError)

  const appAccountId = await req(options('GET', 'accounts/self'))
    .then((resp) => {
      console.log("\nYour app has $" + resp.result.balance + " in its account ready to use");
      return resp.result.id;
    }, handleError);

  const xfer = {
    "amount": 1,
    "currency": "CAD",
    "fromAccountId": appAccountId,
    "toAccountId": bankAccountId,
    "receipt": "{ \"Note\": \"Thanks for being such a loyal user of my app!\" }",
  }
  const transferReceiptId = await req(options('POST', 'transfers', xfer))
    .then((resp) => {
      return resp.result.id;
    }, handleError);

  await req(options('GET', 'accounts/self'))
    .then((resp) => {
      console.log("\nYour app now has $" + resp.result.balance + " in its account after a transfer");
    }, handleError);

  await req(options('GET', 'transfers/' + transferReceiptId))
    .then((resp) => {
      console.log("\nReceipt from our money transfer: " + util.inspect(resp.result));
    }, handleError)
})();
*/
function handleError(err) {
  let outErr = err;
  if (err.response) {
    if (err.response.body) {
      outErr = err.response.body;
      console.dir(outErr.errorDetails);
    } else {
      outErr = err.response;
    }
  }
  console.dir(outErr);
  process.exit(1);
}