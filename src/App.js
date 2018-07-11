import React, { Component } from 'react';
import './App.css';
import './components/Navigation/Navigation.css'
import Navigation from './components/Navigation/Navigation';
import axios from 'axios';

class App extends Component {
  constructor(){
    super()
    this.state={
      user:null,
    }
  }

  componentDidMount(){
    axios.get('/api/user-data').then(res=>{
      this.setState({user: res.data.user? res.data.user : null});
    })
  }

  login() {
    let { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } = process.env;
    let redirectUri= encodeURIComponent('http://localhost:3001/auth/callback')
    window.location = `https://${REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  }

  logout() {
    axios.post('/api/logout').then(() => {
      this.setState({ user: null });
    });
  }

  getMessage(error) {
    return error.response
      ? error.response.data
        ? error.response.data.message
        : JSON.stringify(error.response.data, null, 2)
      : error.message;
  }

  clickHandler=()=>{
    return console.log('this is a thing that happens')
 }

  render() {
    return (
      <div className="App">
      <Navigation
      clickHandler={this.clickHandler}/>
        <div className='Welcome'>
        Welcome to the schedule meister! Please log in to veiw or schedule any appointments
          <button
            onClick={this.login}>Sign In
            </button>
        </div>
      </div>
    );
  }
}

export default App;
