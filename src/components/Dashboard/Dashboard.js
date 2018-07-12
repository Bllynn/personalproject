import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Appointment from '../Appointment/Appointment'



class Dashboard extends Component{
    constructor(){
        super()
        this.state={
            users:[],
            appointment:[]
        }
    }
    componentDidMount(){
        axios.get('/api/appointment').then(appointment=>{
            this.setState({
                appointment:appointment.data
            })
        })
        axios.get('/api/users').then(users=>{
            this.setState({
                users:users
            })
        })
    }
    deleteApt=(id)=>{
        axios.delete('/api/appointment/:id').then(appointment=>{
            if(id===appointment.id){
                return appointment.data.splice(1,id)
                this.setState({
                    appointment:appointment.data

                })
            };
        })
    };

    render(){
        let appointments=this.state.appointment.map((e,id)=>{
            return(
                <Appointment
                delete={this.deleteApt}/>
            )
        })
        return(
            <div className='dashboard-view'>
            Dashboard
            <Link to='/Calendar'><button>New Appointment</button></Link>
            {appointments}
            
            </div>
        )
    }
    

}

// function moveFromStateToProps(state){
//     return{
//         users:state.users,
//         appointments:state.appointments
//     }
// }
// let connectedFunction=connect(moveFromStateToProps,actions);
// let ConnectedDashboard=connectedFunction(Dashboard)
// export default ConnectedDashboard
export default Dashboard