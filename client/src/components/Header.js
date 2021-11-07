import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  userdata = this.props.auth
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
        return [
          <li key="3" style={{ margin: '0 10px' }}>
            <Link to="/secure/sempeak/otpcodes">Totp codes</Link>
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
            to={this.props.auth ? '/secure/sempeak/otpcodes' : '/'}
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

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
