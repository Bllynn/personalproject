import React from 'react';
import './Navigation.css'
import {Link} from 'react-router-dom';
export default function Navigation(props){

    return(
        <div className='Menu'>
            Navigation Bar
            
                    <ul className='Nav-bar'>
                        <li>Home</li>
                        <li>Calendar</li>
                        <li><Link to='/about'>About</Link></li>
                    </ul>
            </div>
            
    )
}