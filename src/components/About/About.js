import React from 'react';
import {Link} from 'react-router-dom';

export default function about(){

   return (
   
    <div className='About'>
    <p id="title">Massage Therapy</p>
    <p id="subtitle">Becuase I'm Bored</p>
   
    
        <Link to='/'><i class="fas fa-arrow-circle-left"></i></Link>
    </div>
   ) 
}