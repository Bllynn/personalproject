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
          <h4><Link className={ loginClass } to='/'>Log In</Link></h4>
                <h4><Link className={dashClass} to='/dashboard'>Home</Link></h4>
                <h4><Link className={calClass} to='/calendar'>Calendar</Link></h4>
                <h4><Link className={abtClass} to='/about'>About</Link></h4>
                <h4><a href="http://localhost:3001/api/logout"><i class="fas fa-sign-out-alt"></i>
                        </a></h4>
          </div>
        </nav>
      </header>
      <div className={this.state.toggleNav ? 'show-nav mobile-nav' : 'mobile-nav'}>
        <div className="mobile-nav-content">
        <h4><Link className={ loginClass } to='/'>Log In</Link></h4>
                <h4><Link className={dashClass} to='/dashboard'>Home</Link></h4>
                <h4><Link className={calClass} to='/calendar'>Calendar</Link></h4>
                <h4><Link className={abtClass}to='/about'>About</Link></h4>
                <h4><a href="http://localhost:3001/api/logout">
                            Logout
                        </a></h4>
        </div>
      </div>
      </div>
    );
  }
}
export default withRouter(Navigation);
