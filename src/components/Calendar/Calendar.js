import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';

// import 'react-datepicker/dist/react-datepicker.css';
import {createAppointment} from '../../dux/reducer';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 225,
  },
});

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date:'',
      time:''
    }
  }
  handleAppointment=()=>{
    const timeString=this.state.date+' '+this.state.time
    const timeChecker = moment(timeString,'YYYY-MM-DD HH:mm').toISOString()
    
    axios.post('/api/appointment',{
        date:timeChecker,
    }).then((res)=>{
      if(res.data ==='T'){
        alert(`Appointment time of ${this.state.time} is unavailable for ${this.state.date}`)
      }else{
        console.log(res.data)
        this.props.createAppointment(res.data)
        
        this.props.toggle()
}
    }).catch(err=>{ 
      console.log(err)
    })
  }
 
dateChange=(event)=> {
    
    this.setState({
      date: event.target.value
    });
  }
timeChange=(event)=>{
 
  this.setState({
    time:event.target.value
  })
}

  render() {
    const { classes } = this.props;


    return (
    <div className='Apt-scheduler'>
    <div className='Calendar-Container'>
        <h1>Please select a date and time for your appointment:</h1>
        <div className='Date'>
        <form className={classes.container} noValidate>
        <TextField
          onChange={this.dateChange}
              id="date"
              label="Please select a date"
              type="date"
              defaultValue={moment().format("YYYY-MM-DD")}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>     

            <div className='Time'>
        <form className={classes.container} noValidate>
        <TextField
            onChange={this.timeChange}
            id="time"
            label="Please select a time"
            type="time"
            defaultValue={moment().format('HH:mm')}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
        </form>

            
        </div>
        </div>
       <button
        onClick={this.handleAppointment}>Schedule</button>
    </div>      
  </div>)
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

export default connect(mapStateToProps, actions)(withStyles(styles)(Calendar))