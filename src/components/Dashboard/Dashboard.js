import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Appointment from '../Appointment/Appointment'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class Dashboard extends Component{
    constructor(){
        super()
        this.state={
            users:[],
            appointment:[]
        }
    }
    componentDidMount(){
        axios.get('/api/appointment').then((appointment)=>{
            this.setState({
                appointment:appointment.data
            })
        })
        axios.get('/api/users').then(users=>{
            this.setState({
                users:users.data
            })
        })
    }
    // myAppointments=()=>{
    //     axios.get('/api/appointment').then(appointment=>{
    //        return this.setState({
    //             appointment:appointment.data
    //         })
    //     })
    // };
    deleteApt=(id)=>{
        axios.delete('/api/appointment/'+id).then(appointment=>{
            if(id===appointment.id){
                return appointment.data.splice(1,id)
                this.setState({
                    appointment:appointment.data

                })
            };
        })
    };
    logout() {
        axios.post('/api/logout').then(() => {
          this.setState({ user:[]});
        });
      }

    render(){
        let appointments=this.state.appointment.map((e,id)=>{
            return(
                <Appointment
                time={e.time}
                key={e.id}
                id={e.id}
                delete={this.deleteApt}/>
            )
        })
        return(
            <div className='dashboard-view'>
            <button
            onClick={console.log(this.state)}>Any appointments?</button>
            Dashboard SCREWDRIVER
            <Link to='/Calendar'><button>New Appointment</button></Link>
            {appointments}
            <button onClick={this.logout}>logout</button>
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