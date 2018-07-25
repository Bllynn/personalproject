import React,{Component} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import{getUserData} from '../../dux/reducer';
import {getAppointmentData} from '../../dux/reducer';
import {editAppointment} from '../../dux/reducer';
import MasterBS from '../MasterBS/MasterBS';






class Master extends Component{
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
        if(this.props.user.id){
            axios.get('/api/users').then(user=>{
                this.props.getUserData(user.data)
            })
        }
        if(this.props.appointment.length === 0){
            axios.get('/api/allappointments').then(appointment=>{
                this.props.getAppointmentData(appointment.data)
            })
        }
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
        let appointments = this.props.appointment.map((e,id)=>{
            return(
                <MasterBS
                picture={e.picture}
                client={e.client_id}
                time={e.time}
                key={e.id}
                id={e.id}
                delete={this.deleteApt}/>
            )
        })
        return(
            <div className='dashboard'>
                <div className='dashboard2'>
                 {/* <img className='avatar'src={user.picture} alt="avatar"/> */}
                    <h1>All Appointments</h1>              
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
    getAppointmentData,
    getUserData
}

export default connect(mapStateToProps, actions)(Master)