import React, {Component} from 'react';
import moment from 'moment';


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
            const client=this.props.client;
            const picture = this.props.user.filter(user=>{
                if(user.id===client){
                    return user;
                }
            })
            return(
                <div className='appointmentCard'>
                <img className='avatar'src={picture[0].picture} alt="avatar"/>
                <h3>Date:{moment(this.props.time).format('MMMM, Do')}</h3>
                    <h3>Day: {moment(this.props.time).format('dddd')}</h3>
            
                    <h3>
                        When: {moment(this.props.time).format('h:mm a')}
                    </h3>
                    </div>
            )
        
        }

}
  export default MasterBS
