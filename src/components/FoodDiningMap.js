import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import * as firebase from 'firebase';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

let tags = [];
let lat = [];
let long = [];

tags = JSON.parse(localStorage.getItem("tags"));
long = JSON.parse(localStorage.getItem("long"));
lat = JSON.parse(localStorage.getItem("lat"));

var heatmapData = {
    positions: [],
    options: {   
    radius: 40,   
    opacity: 0.6,
    }
}

for (var i in tags){
    if (tags[i]=="Food and Dining"){
        let newPoint = {lat: lat[i], lng: long[i]};
        heatmapData.positions.push(newPoint);
        console.log(newPoint);
    }
    
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
                <h1>Food & Dining Map</h1>
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
