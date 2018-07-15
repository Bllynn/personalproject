import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import{getUserData} from '../../dux/reducer';
import {getAppointmentData} from '../../dux/reducer';
import Appointment from '../Appointment/Appointment'
import 'react-datepicker/dist/react-datepicker.css';
import Navigation from '../Navigation/Navigation';


class Dashboard extends Component{
    constructor(){
        super()
     
    }
    componentDidMount(){
        axios.get('/api/user-data').then(user=>{
            console.log(11111111111, user.data)
            this.props.getUserData(user.data)
        })
        axios.get('/api/appointment').then((appointment)=>{
            console.log(22222222222222, appointment)
            this.props.getAppointmentData(appointment.data)
        })
    }
  
    // deleteApt=(id)=>{
    //     axios.delete('/api/appointment/'+id).then(appointment=>{
    //         if(id===appointment.id){
    //             return appointment.data.splice(1,id)
    //             this.setState({
    //                 appointment:appointment.data

    //             })
    //         };
    //     })
    // };
    logout() {
        axios.post('/api/logout').then(() => {
            this.props.state({
                users:{}
            })
    })
}
whatIsProps=()=>{
    return console.log(this.props.appointment.map((e,id)=>{
        }))
    
}
    render(){
        
        // let appointments = this.props.appointment.map((e,id)=>{
        //     return(
        //         <Appointment
        //         time={e.time}
        //         key={e.id}
        //         id={e.id}
        //         delete={this.deleteApt}/>
        //     )
        // })
        return(
            <div className='dashboard-view'>
            <Navigation/>
            <button
            onClick={this.whatIsProps}>Any appointments?</button>
            Dashboard SCREWDRIVER
            <Link to='/Calendar'><button>New Appointment</button></Link>
            {/* {appointments} */}
            <button onClick={this.logout}>logout</button>
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
    getUserData,
    getAppointmentData
}

export default connect(mapStateToProps, actions)(Dashboard)