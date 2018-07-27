import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
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
    const { pathname } = this.props.location

    let loginClass = pathname === "/" ? 'link-active' : 'link-inactive'
    let calClass = pathname === "/calendar" ? 'link-active' : 'link-inactive'
    let dashClass = pathname === "/dashboard" ? 'link-active' : 'link-inactive'
    let abtClass = pathname === "/about" ? 'link-active' : 'link-inactive'
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
          <ul>
            <li><Link className={ loginClass } to='/'>Home</Link></li>
            <li><Link className={dashClass} to='/dashboard'>My Appointments</Link></li>
            <li><Link className={calClass} to='/calendar'>All Appointments</Link></li>
            <li><a href={`${process.env.FRONTEND_DOMAIN}/api/logout`}>Logout
                        </a></li>




          </ul>
      
          </div>
        </nav>
      </header>
      <div className={this.state.toggleNav ? 'show-nav mobile-nav' : 'mobile-nav'}>
        <div className="mobile-nav-content">
        <h4 onClick={() => this.toggleNav()}><Link className={ loginClass } to='/'
        >Home</Link></h4>
                <h4 onClick={() => this.toggleNav()}><Link className={dashClass} to='/dashboard'
                >My Appointments</Link></h4>
                <h4 onClick={() => this.toggleNav()}><Link className={calClass} to='/calendar'
                >All Appoinments</Link></h4>
                <h4 onClick={() => this.toggleNav()}><Link className={abtClass}to='/about'
                >About</Link></h4>
                <h4 onClick={() => this.toggleNav()}><a href={`${process.env.FRONTEND_DOMAIN}/api/logout`}
                >Logout</a></h4>
        </div>
      </div>
      </div>
    );
  }
}
export default withRouter(Navigation);
