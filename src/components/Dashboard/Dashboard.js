import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import{getUserData} from '../../dux/reducer';
import {getAppointmentData} from '../../dux/reducer';
import {editAppointment} from '../../dux/reducer';
import {deleteAppointment} from '../../dux/reducer';
import Appointment from '../Appointment/Appointment'
import Navigation from '../Navigation/Navigation';



class Dashboard extends Component{
    constructor(){
        super()
        this.state={
            toggleEdit:false,
        }
     
    }
    componentDidMount(){
        this.setState({
            toggleEdit:false
        })
        axios.get('/api/user-data').then(user=>{
        
            this.props.getUserData(user.data)
        })
        axios.get('/api/appointment').then(appointment=>{
           
            this.props.getAppointmentData(appointment.data)
        })
    }
    toggleEdit() {
        console.log(this.state);
        this.setState({
          toggleEdit: !this.state.toggleEdit
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
                showEdit={()=>this.toggleEdit()}
                delete={this.deleteApt}/>
            )
        })
        return(
            <div className='dashboard'>
                <Navigation/>
                    <div className='appointment-list'>
                    <img className='avatar'src={user.picture} alt="avatar"/>
                    <h1>Appointments for {user.first_name} {user.last_name}</h1>
                    <button>New Appointment</button>
                    {appointments}
                    <a href="http://localhost:3001/api/logout">
                    <button>Logout</button>
                    </a>

                </div>
            
               
             
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