import React from 'react';
import moment from 'moment';




export default function Appointment(props){

    return(
    <div className='apt-comp'>
    <p>
    {moment(props.time).format('LLLL')}
    </p>
    <button>Edit Apt</button>
    <button onClick={()=>props.delete(props.id)}>Cancel Apt</button></div>
        
    )
}
