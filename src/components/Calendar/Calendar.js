import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';

import Navigation from '../Navigation/Navigation';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment(),
      startTime: moment().format('LT')
    }
  }

  handleChange=(date)=> {
    this.setState({
      startDate: date
    });console.log(this.state)
  }
  // handleChangeTime=(date)=> {
  //   this.setState({
  //     startTime: date
  //   });console.log(this.state)
  // }

  render() {
    return <div className='Apt-scheduler'>
    <Navigation/>
    <div className='Calendar-Container'>
        <h1>Please select a date and time for your appointment:</h1>
        <div className='Date'>

        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="LLL"
          timeCaption="time"
          />
            {/* <div className='Time'>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChangeTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                dateFormat="LT"
                timeCaption="Time"
                />
            
            </div> */}
        </div>
    </div>      
  </div>
  }
}


export default Calendar