import React from 'react';
import {Spring} from 'react-spring/renderprops';

export default function About() {
    return (
        <Spring
            from ={{ opacity: 0, marginTop: 500}}
            to ={{ opacity: 1, marginTop: 0}}
        >
            {props => (
                <div style = {props}>
                    <div style = {aboutStyle}>
                        <h1>About</h1>
                        <p>Mapa is a tool created for aspiring entrepreneurs seeking to start their own businesses. It extracts data from tens of thousands of transactions which is categorized into different tags such as entertainment, shopping, food and dining, etc. This is then color-coded and plotted, allowing users to see a heatmap. Users can then use this information to find trends that can help them decide where they want to start their business.</p>
                    </div> 
                </div>
            )}       
        </Spring>   
    )
}
const aboutStyle = {
    padding: '5rem'
}