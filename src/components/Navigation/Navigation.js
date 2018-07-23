import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class Navigation extends Component {
  constructor(){
    super()
    this.state={
      toggleNav:false,
    }
  }
  toggleNav() {
    this.setState({
      toggleNav: !this.state.toggleNav
    })
  }
  
  
  
  render() {
    return (
      <div className="App">
      <header>
        <nav>
          <h2>Lucrative Business Co.</h2>
          <div className="good-burger" onClick={() => this.toggleNav()}>
            <div>
              MENU
            </div>
              <div className="ingredients">
                <div></div>
                <div></div>
                <div></div>
              </div>
          </div>
          <div className="nav-menu">
          <h3><Link to='/'>Log In</Link></h3>
                <h3><Link to='/dashboard'>Home</Link></h3>
                <h3><Link to='/calendar'>Calendar</Link></h3>
                <h3><Link to='/about'>About</Link></h3>
          </div>
        </nav>
      </header>
      <div className={this.state.toggleNav ? 'show-nav mobile-nav' : 'mobile-nav'}>
        <div className="mobile-nav-content">
        <h3><Link to='/'>Log In</Link></h3>
                <h3><Link to='/dashboard'>Home</Link></h3>
                <h3><Link to='/calendar'>Calendar</Link></h3>
                <h3><Link to='/about'>About</Link></h3>
        </div>
      </div>
      </div>
    );
  }
}
export default Navigation;
