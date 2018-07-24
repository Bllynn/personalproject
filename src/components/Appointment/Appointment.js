import React, {Component} from 'react';
import moment from 'moment';
import Edit from '../Edit/Edit';


class Appointment extends Component{
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
            let edit = this.state.toggleEdit? 'edit':'cardNormal'// declare variable that will be class string for appointment card
            return(
                <div className='appointmentCard'>
                <div className={edit}>
                <h3>Date:{moment(this.props.time).format('MMMM, Do')}</h3>
                    <h3>Day: {moment(this.props.time).format('dddd')}</h3>
            
                    <h3>
                        When: {moment(this.props.time).format('h:mm a')}
                        
                    </h3>
                    </div>
                    <div className={this.state.toggleEdit ? 'show-edit hide-edit': 'hide-edit'}>
                                <Edit
                                aptTime={this.props.time}
                                aptId={this.props.id}
                                toggle={this.toggleEdit}
                                />
        
                        </div>
                    <div className='editButtons'>
                    <i class="far fa-edit"
                    onClick={this.toggleEdit}></i>
                    
                    <i class="far fa-trash-alt" onClick={()=>this.props.delete(this.props.id)}></i>
                </div>        
                    
                    </div>
                    
            )
        
        }

}
  export default Appointment
