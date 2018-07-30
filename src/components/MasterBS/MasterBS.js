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
            
            return(
                <div className='appointmentCard2'>
                <img className='avatar'src={this.props.picture} alt="avatar"/>
                <h3>Date:{moment(this.props.time).format('MMMM, Do')}</h3>
                    <h3>Day: {moment(this.props.time).format('dddd')}</h3>
            
                    <h3>
                        Time: {moment(this.props.time).format('h:mm a')}
                    </h3>
                    </div>
            )
        
        }

}

  function mapStateToProps(state){
    return{
        user:state.user,
        appointment:state.appointment,
        allappointments:state.allappointments
    }
  }
  
  
  export default connect(mapStateToProps)(withStyles(styles)(MasterBS))