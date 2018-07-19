import React from 'react';
import moment from 'moment';







export default function Appointment(props){
        return(
        <div className='appointment-card'>
            <p>What</p>
    
            <p>When: {moment(props.time).format('LLLL')}</p>
    
            <button
            onClick={props.showEdit}>Edit Apt</button>
            
            <button onClick={()=>props.delete(props.id)}>Cancel Apt</button>
        </div>        
        )
}
