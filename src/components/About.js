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
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at tellus nulla. Aliquam eget condimentum dui. Pellentesque mi justo, egestas sed feugiat vitae, dapibus ac arcu. Morbi eget sem vitae lorem consectetur pharetra. Ut magna justo, facilisis et tincidunt eget, condimentum et diam. Quisque tellus est, mollis et vulputate eget, porta convallis quam. Ut sed maximus massa, at suscipit diam. Curabitur placerat consequat nibh vel bibendum. Fusce auctor, tellus viverra sodales scelerisque, est arcu tincidunt lacus, non posuere nibh augue in sem. Praesent nunc libero, congue a tellus quis, consequat egestas tellus. Nullam eget ex justo.</p>
                    </div> 
                </div>
            )}       
        </Spring>   
    )
}
const aboutStyle = {
    padding: '5rem'
}