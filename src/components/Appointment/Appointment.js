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
            return(
                <div className='appointment-card'>
                <h3>Date:{moment(this.props.time).format('MMMM, Do')}</h3>
                    <h3>Day: {moment(this.props.time).format('dddd')}</h3>
            
                    <h3>
                        When: {moment(this.props.time).format('hh:mm a')}
                        
                    </h3>
                    <div className={this.state.toggleEdit ? 'show-edit hide-edit': 'hide-edit'}>
                                <Edit
                                aptTime={this.props.time}
                                aptId={this.props.id}
                                toggle={this.toggleEdit}
                                />
        
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
  export default Appointment
