import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import './Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import {newAppointment} from '../../dux/reducer';
import Navigation from '../Navigation/Navigation';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date:moment(),
      time:moment()
    }
  }
  handleAppointment=()=>{
    axios.put('/api/appointment').then(()=>{
      this.props.newAppointment()
    })
  }
 
  handleChange=(date)=> {
    console.log(date)
    this.setState({
      date: date
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
        <Link to='/Dashboard'><button>Schedule</button></Link>
    </div>      
  </div>
  }
}
function mapStateToProps(state){
  return{
      appointment:state.appointment
  }
}

const actions = {
  newAppointment
}

export default connect(mapStateToProps, actions)(Calendar)