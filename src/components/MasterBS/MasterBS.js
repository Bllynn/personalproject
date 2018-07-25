import React, {Component} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
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
class MasterBS extends Component{
    constructor(){
        super()
        this.state={
            toggleEdit:false
        }
    }
    toggleEdit=()=>{
        this.setState({
          toggleEdit: !this.state.toggleEdit
        })
      }
        render(){
            const userId = this.props.user.id
            const picture = this.props.appointment.filter(appointment=>{
                return appointment.client_id === userId
            })
            return(
                <div className='appointmentCard'>
                <img className='avatar'src={this.props.picture} alt="avatar"/>
                <h3>Date:{moment(this.props.time).format('MMMM, Do')}</h3>
                    <h3>Day: {moment(this.props.time).format('dddd')}</h3>
            
                    <h3>
                        When: {moment(this.props.time).format('h:mm a')}
                    </h3>
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
  
  
  export default connect(mapStateToProps)(withStyles(styles)(MasterBS))