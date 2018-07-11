import React from 'react';
import './Navigation.css'
import {Link} from 'react-router-dom';
export default function Navigation(props){

    return(
        <div className='Menu'>
            Navigation Bar
            
                    <ul className='Nav-bar'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/Calendar'>Calendar</Link></li>
                        <li><Link to='/about'>About</Link></li>
                    </ul>
            </div>
            
    )
}