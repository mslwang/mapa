import React, { Component } from 'react'
import '../App.css'
import {Spring} from 'react-spring/renderprops';

export default class Home extends Component {
    render() {
        return (
        <Spring 
            from ={{ opacity: 0, marginTop: 500}}
            to ={{ opacity: 1, marginTop: 0}}
        >
         {props => (
            <div className = "bg" style = {props}></div>
         )}
        </Spring>    
        )
    }
}

