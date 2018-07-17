import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import{getUserData} from '../../dux/reducer';
import {getAppointmentData} from '../../dux/reducer';
import {editAppointment} from '../../dux/reducer';
import {deleteAppointment} from '../../dux/reducer';
import Appointment from '../Appointment/Appointment'
import 'react-datepicker/dist/react-datepicker.css';
import Navigation from '../Navigation/Navigation';


class Dashboard extends Component{
    constructor(){
        super()
        this.state={
            showEdit:false
        }
     
    }
    componentDidMount(){
        axios.get('/api/user-data').then(user=>{
        
            this.props.getUserData(user.data)
        })
        axios.get('/api/appointment').then(appointment=>{
           
            this.props.getAppointmentData(appointment.data)
        })
    }
    editApt=(id)=>{
        axios.put('/api/appointment/'+id).then(appointment=>{
        this.props.editAppointment(appointment.data)
    })}
    deleteApt=(id)=>{
        axios.delete('/api/appointment/'+id).then(appointment=>{
            this.props.deleteAppointment(appointment.data)
        })
    };


    render(){
        let user =this.props.user
        let appointments = this.props.appointment.map((e,id)=>{
            return(
                <Appointment
                time={e.time}
                key={e.id}
                id={e.id}
                edit={this.editApt}
                delete={this.deleteApt}/>
            )
        })
        return(
            <div className='dashboard-view'>

                <Navigation/>

            <h1>Appointments for {user.first_name} {user.last_name}</h1>
            
            

            <Link to='/Calendar'><button>New Appointment</button></Link>
            {appointments}
            <a href="http://localhost:3001/api/logout">
                <button>Logout</button>
            </a>
            </div>
            
        )
    }
    

}

function mapStateToProps(state){
    return{
        user:state.user,
        appointment:state.appointment
    }
}

const actions = {
    editAppointment,
    getUserData,
    getAppointmentData,
    deleteAppointment
}

export default connect(mapStateToProps, actions)(Dashboard)