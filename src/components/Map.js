import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'


const AnyReactComponent = ({ text }) => <div>{text}</div>;

var heatmapData = {
    positions: [
        {lat: 43.65, lng: -79.3832},
        {lat: 43.67, lng: -79.3833},
        {lat: 43.67, lng: -79.3834},
        {lat: 43.67, lng: -79.39},
        {lat: 43.67, lng: -79.3833},
        {lat: 43.67, lng: -79.3833}
    ],
    options: {   
    radius: 40,   
    opacity: 0.6,
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
            <div style={mapStyle}>
               {/*<button onClick = {toggleMap()}>Toggle Heatmap</button>*/}

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
            </div>
        )
    }
}

const mapStyle = {
    padding: '5rem',
    height: '100vh', 
    width: '100%'
}
