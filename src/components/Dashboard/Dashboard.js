import React,{Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import{getUserData} from '../../dux/reducer';
import {getAppointmentData} from '../../dux/reducer';
import {editAppointment} from '../../dux/reducer';
import {deleteAppointment} from '../../dux/reducer';
import Appointment from '../Appointment/Appointment'
import Calendar from '../Calendar/Calendar';



class Dashboard extends Component{
    constructor(){
        super()
        this.state={
            toggleAppointment:false,

        }
     
    }
    componentDidMount(){
        this.setState({

            toggleAppointment:false,
        })
        axios.get('/api/user-data').then(user=>{
        
            this.props.getUserData(user.data)
        })
        axios.get('/api/appointment').then(appointment=>{
           
            this.props.getAppointmentData(appointment.data)
        })
    }

    toggleAppointment=()=>{
        this.setState({
          toggleAppointment: !this.state.toggleAppointment
        })
      }



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
                delete={this.deleteApt}/>
            )
        })
        return(
            <div className='dashboard'>
                <div className='dashboard2'> 
                 <img className='avatar'src={user.picture} alt="avatar"/>
                    <h1>Appointments for {user.first_name} {user.last_name}</h1>
                    <i class='far fa-calendar-alt'onClick={this.toggleAppointment}> <p className='new'>New</p>    </i>
                    <div className={this.state.toggleAppointment ? 'show-apt hide-apt': 'hide-apt'}>
                        <Calendar
                        toggle={this.toggleAppointment}/>
              
                </div>

                </div>
                <div className='appointment-list'>
                {appointments}
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