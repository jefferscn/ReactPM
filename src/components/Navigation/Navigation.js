/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import s from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';
import withFluxContainer from '../../decorators/withFluxContainer';
import userinfoStore from '../../stores/userinfo';

@withStyles(s)
@withFluxContainer
class Navigation extends Component {
  static getStores(){
      return [userinfoStore];
  }

  static calculateState(prevState){
      return {
        user:userinfoStore.getState()
      }
  }
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div className={cx(s.root, this.props.className)} role="navigation">
        <Link className={s.link} to="/about">About</Link>
        <Link className={s.link} to="/contact">Contact</Link>
        <span className={s.spacer}> | </span>
        <Link className={cx(s.link,this.state.user.get('logined')?s.hidden:'')} to="/login">Log in</Link>
        <Link className={cx(s.link, s.highlight,this.state.user.get('logined')?s.hidden:'')} to="/register">Sign up</Link>
      </div>
    );
  }

}

export default Navigation;
