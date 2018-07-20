import React, {Component} from 'react';
import moment from 'moment';
import Edit from '../Edit/Edit';
import axios from 'axios';
import { connect } from 'react-redux';
import editApt from '../../dux/reducer';







class Appointment extends Component{
    constructor(){
        super()
        this.state={
            toggleEdit:false
        }
    }
    toggleEdit=()=>{
        console.log(this.state);
        this.setState({
          toggleEdit: !this.state.toggleEdit
        })
      }

    editAppointment=(id)=>{
        axios.put('/api/appointment/'+id).then(appointment=>{
        this.props.editApt(appointment)
    })}
        render(){
            return(
                <div className='appointment-card'>
                    <h3>What</h3>
            
                    <h3>
                        When: {moment(this.props.time).format('LLLL')}
                        
                    </h3>
                    <div className={this.state.toggleEdit ? 'show-edit hide-edit': 'hide-edit'}>
                                <Edit
                                edit={this.editAppointment}/>
        
                        </div>
                    <div className='editButtons'>
                    <button
                    onClick={this.toggleEdit}>Edit Apt</button>
                    
                    <button onClick={()=>this.props.delete(this.props.id)}>Cancel Apt</button>
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
    editApt
  }
  export default connect(mapStateToProps,actions)(Appointment)
