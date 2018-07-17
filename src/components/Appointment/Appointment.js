import React from 'react';
import moment from 'moment';
import Calendar from '../Calendar/Calendar';





export default function Appointment(props){
        return(
        <div className='apt-comp'>
            <p>What</p>
    
            <p>When: {moment(props.time).format('LLLL')}</p>
    
            <button
            onClick={()=>props.edit(props.id)}>Edit Apt</button>
            <button onClick={()=>props.delete(props.id)}>Cancel Apt</button>
        </div>        
        )
}
