import React from 'react';
import {Link} from 'react-router-dom';
export default function Navigation(props){

    return(
        <div className='Menu'>
            Menu
            <ul className='Nav-bar'>
                <li><Link to='/'>Log In</Link></li>
                <li><Link to='/dashboard'>Home</Link></li>
                <li><Link to='/calendar'>Calendar</Link></li>
                <li><Link to='/about'>About</Link></li>
            </ul>
        </div>
            
    )
}