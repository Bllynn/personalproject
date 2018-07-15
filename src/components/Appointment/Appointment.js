import React from 'react';



export default function Appointment(props){
    return(
    <div className='apt-comp'>
    <p>
    {props.time}
    </p>
    <button onClick={()=>props.delete(props.id)}>Cancel Apt</button></div>
        
    )
}
