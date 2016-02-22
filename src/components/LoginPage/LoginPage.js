/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './LoginPage.scss';
import withStyles from '../../decorators/withStyles';
import withFluxContainer from '../../decorators/withFluxContainer';
import { doRemote } from '../../actions/RemoteActionHandler';
import { login } from '../../actions/UserInfoActionCreators';
import userinfoStore from '../../stores/userinfo';
import { Container } from 'flux/utils';

const title = 'Log In';

@withStyles(s)
@withFluxContainer
class LoginPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static getStores(){
      return [userinfoStore];
  }

  static calculateState(prevState){
      return {
        user:userinfoStore.getState()
      }
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  onSubmit(e){
    e.preventDefault();
    var user = this.refs.user.value;
    var pwd = this.refs.pwd.value;
    doRemote(login(user,pwd));
  }

  render() { 
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
              <form onSubmit={(e)=>this.onSubmit(e)} className={this.state.user.get('logined')?s.hidden:''}>
                <div className={s.user}>
                  <input type="text" ref="user" name="user"/>
                </div>
                <div className={s.pwd}>
                  <input type="password" ref="pwd" name="pwd"/>
                </div>
                <button className={s.submit}>登录</button>
              </form>
              <p className={this.state.user.get('logined')?'':s.hidden}>当前登录用户：{this.state.user.get('name')}</p>;
        </div>
      </div>
    );
  }

}

export default LoginPage;