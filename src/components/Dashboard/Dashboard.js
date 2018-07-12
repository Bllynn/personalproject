import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Appointment from '../Appointment/Appointment'
import axios from 'axios';
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
export default Dashboard