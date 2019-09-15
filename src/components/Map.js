/* global google */
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import * as firebase from 'firebase';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

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

db.collection("points").get().then(function(doc) {
  console.log(doc.docs.map(doc => doc.data()));
  console.log(doc)
  if (!doc.empty) {
      console.log("Document data:", doc);
      //arr.push(doc.docs);

      tags = doc.docs[0].get("tags");
      long = doc.docs[0].get("lng");
      lat = doc.docs[0].get("lat");

      console.log("Tags is " +tags);
      console.log("Longitude is " +long);
      console.log("Latitude is " +lat);
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});

var heatmapData = {
    positions: [],
    options: {   
    radius: 40,   
    opacity: 0.6,
    }
}

console.log("Hi");


let test1 = [49, 49];
let test2 = [-78, -78];

for(var i in tags) {
    let newPoint = {lat: test1[i], lng: test2[i]};
    heatmapData.positions.push(newPoint);
    console.log(lat[i] +" " +long[i]);
    console.log(newPoint);
}

export default class Map extends Component {
    static defaultProps = {
        center: {
          lat: 43.6532,
          lng: -79.3832
        },
        zoom: 13
    };
    
    
    render() {
        return (
            <div style = {paddingStyle}>
                <h1>Map</h1>
                <div style = {mapStyle}>
                {/*<button onClick = {toggleMap()}>Toggle Heatmap</button>*/}
                    {
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: '***REMOVED***'}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    heatmapLibrary={true}          
                    heatmap={heatmapData}
                    >
                        <AnyReactComponent
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        />
                    </GoogleMapReact>
                }                 
                </div>
            </div>
        )
    }
}

const paddingStyle= {
    padding: '5rem'
}

const mapStyle = {
    height: '100vh', 
    width: '100%'
}
