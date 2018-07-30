import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import {editAppointment} from '../../dux/reducer';
import swal from 'sweetalert';

// import 'react-datepicker/dist/react-datepicker.css';


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
  constructor () {
    super()
    this.state = {
      date:'',
      time:''
    }
  }
  componentDidMount(){
    this.setState({
      date:moment(this.props.aptTime).format('YYYY-MM-DD'),
    time:moment(this.props.aptTime).format('HH:mm')
    })
  }


  handleEdit=(id)=>{
    const timeString=this.state.date+' '+this.state.time
    const timeChecker = moment(timeString,'YYYY-MM-DD HH:mm').toISOString()
    
    axios.put('/api/appointment/'+id,{
        date:timeChecker,
    }).then((res)=>{
      if(res.data ==='F'){
        swal('OH NO!',`Cannot schedule appointment that has already passed`,"error")
      }
      else if(res.data ==='T'){
        swal('Uh-oh!', `Appointment time of ${this.state.time} is unavailable for ${this.state.date}`,"error")
      }else{
        this.props.toggle()
        this.props.editAppointment(res.data)
        swal({
          title:`See you at ${this.state.time} ${this.state.date}`,
          text:'Appointment Scheduled',
          icon:'success',
          button:'Ok',
        });
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
    
    <div className='Edit'>
        <div className='Date'>
        <form className={classes.container} noValidate>
        <TextField
          onChange={this.dateChange}
              id="date"
              label="Please select a date"
              type="date"
              defaultValue={moment(this.props.aptTime).format("YYYY-MM-DD")}
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
            defaultValue={moment(this.props.aptTime).format('HH:mm')}
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
        <i class="fas fa-check"
        onClick={()=>this.handleEdit(this.props.aptId)}>Done
        </i>
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
  editAppointment
}

export default connect(mapStateToProps, actions)(withStyles(styles)(Calendar))