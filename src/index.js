import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

/*
let tags = [];
let lat = [];
let long = [];

var config = {
    apiKey: ***REMOVED***
    authDomain: ***REMOVED***
    databaseURL: ***REMOVED***
    projectId: ***REMOVED***
    storageBucket: ***REMOVED***
    messagingSenderId: ***REMOVED***
    appId: ***REMOVED***
}

firebase.initializeApp(config);

const db = firebase.firestore(); 

/*
db.collection("points").get().then(function(doc) {
  console.log(doc.docs.map(doc => doc.data()));
  console.log(doc)
  if (!doc.empty) {
      console.log("Document data:", doc);
      //arr.push(doc.docs);

      tags = doc.docs[2].get("tag");
      long = doc.docs[2].get("longitude");
      lat = doc.docs[2].get("latitude");

      console.log("Doc data is " +tags);

  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});


function test(name, state, country) {
  db.collection("points").doc("LA").set({
    name, state, country
  })
  .then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

test("Mexico", "Africa", "Denmark");
*/
ReactDOM.render(
    <Router>
      <App />  
    </Router>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
