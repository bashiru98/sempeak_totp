import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
state = { 
  email:''
}
  renderContent() {
   
    switch (this.props.auth) {
      
      case null:
        return;
      case false:
        return (
          <li>
            <a href={'/auth/google'}>Login With Google</a>
          </li>
        );
      default:
        this.state.email = this.props.auth.email
        return [
          <li key="3" style={{ margin: '0 10px' }}>
            <Link to= {this.props.auth.email.includes("sempeak.com") ? "/secure/sempeak/otpcodes" : '/auth/logout'}>Totp codes</Link>
          </li>,
          <li key="2">
            <a href={'/auth/logout'}>Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav className="indigo">
        <div className="nav-wrapper">
          <Link
            to='/'
            className="left brand-logo"
            style={{ marginLeft: '10px' }}
          >
            Sempeak
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth,current_user }) {
  return { auth,current_user };
}

export default connect(mapStateToProps)(Header);
