import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(){
    super()
    this.state={
      user:''
    }
  }

  componentDidMount(){
    axios.get('/api/user-data').then(res=>{
      this.setState({user: res.data.user? res.data.user : null});
    })
  }

  login() {
    let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
    let redirectUri= encodeURIComponent(`${window.location.origin}/auth/callback`)
    window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  }

  logout() {
    axios.post('/api/logout').then(() => {
      this.setState({ user:'' });
    });
  }

  getMessage(error) {
    return error.response
      ? error.response.data
        ? error.response.data.message
        : JSON.stringify(error.response.data, null, 2)
      : error.message;
  }


  render() {
    return (
      <div className="Main">
        <div className='Welcome'>
        <p className='title'>
          Come find your Oasis
          <div className='signin'>
          <i class="fas fa-sign-in-alt"
          onClick={this.login}><p className='login'>Login</p>
          </i></div>
        </p>
          
            </div>
      </div>
    );
  }
}

export default App;
