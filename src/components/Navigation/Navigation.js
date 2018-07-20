import React from 'react';
import {Link} from 'react-router-dom';
export default function Navigation(props){

    return(
        <div className='Menu'>
            Menu
            <div className='Nav-bar'>
                <h3><Link to='/'>Log In</Link></h3>
                <h3><Link to='/dashboard'>Home</Link></h3>
                <h3><Link to='/calendar'>Calendar</Link></h3>
                <h3><Link to='/about'>About</Link></h3>
            </div>
        </div>
            
    )
}