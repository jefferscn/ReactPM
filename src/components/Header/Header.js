/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import s from './Header.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import { Navbar,Nav,NavItem } from 'react-bootstrap'
import withFluxContainer from '../../decorators/withFluxContainer';
import userinfoStore from '../../stores/userinfo';

@withStyles(s)
@withFluxContainer
class Header extends Component {

  static getStores(){
      return [userinfoStore];
  }

  static calculateState(prevState){
      return {
        user:userinfoStore.getState()
      }
  }

  render() {
    var userinfoDivs = [];
    if(this.state.user.get('logined')){
      userinfoDivs.push(<li><Link to="/profile">{this.state.user.get('name')}</Link></li>);
      userinfoDivs.push(<li><Link to="/logout">Logout</Link></li>);
    }else{
      userinfoDivs.push(<li><Link to="/register">Sign up</Link></li>);
      userinfoDivs.push(<li><Link to="/login">Login</Link></li>);
    }
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">mUI</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <li><Link to="/document">Docs</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </Nav>
        <Nav pullRight>
          {userinfoDivs}
        </Nav>
      </Navbar>
    );
  }

}

export default Header;
