import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import './Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import {createAppointment} from '../../dux/reducer';
import Navigation from '../Navigation/Navigation';


// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date:moment(),
      description:''
    }
  }
  handleAppointment=()=>{
    console.log( moment(this.state.date).toISOString())
    axios.post('/api/appointment',{
        date:moment(this.state.date).toISOString(),
    }).then((res)=>{
      this.props.createAppointment(res.data)
      this.props.history.push('/Dashboard')
    }).catch(err=>{
      console.log(err)
    })
  }
 
  handleChange=(date)=> {
    console.log(typeof date._d)
    this.setState({
      date: date._d
    });
  }
  handleChangeTime=(date)=> {
    this.setState({
      time: date
    });console.log(this.state)
  }

  render() {
    return <div className='Apt-scheduler'>
    <Navigation/>
    <div className='Calendar-Container'>
        <h1>Please select a date and time for your appointment:</h1>
        <div className='Date'>

        <DatePicker
          value={moment(this.state.date.toISOString())}
          onChange={this.handleChange}
          excludeDates={[moment(), moment().subtract(1, "days")]}
          placeholderText="Select a date other than today or yesterday"
          />

            <div className='Time'>
            <DatePicker
              onChange={this.handleChangeTime}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat="LT"
              timeCaption="Time"
              />
            
            </div>
        </div>
       <button
        onClick={this.handleAppointment}>Schedule</button>
    </div>      
  </div>
  }
}
function mapStateToProps(state){
  return{
      user:state.user,
      appointment:state.appointment
  }
}

const actions = {
  createAppointment
}

export default connect(mapStateToProps, actions)(Calendar)