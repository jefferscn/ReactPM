/* 
* @Author: gmf
* @Date:   2016-02-16 10:19:05
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-20 15:10:57
*/

'use strict';

import React, { Component, PropTypes } from 'react';
import userinfoStore from '../../stores/userinfo';
import { Container } from 'flux/utils';
import withFluxContainer from '../../decorators/withFluxContainer';

@withFluxContainer
class PermissionCheck extends Component {
    static getStores(){
        return [userinfoStore];
    }

    static calculateState(prevState){
        return {
            user:userinfoStore.getState()
        }
    }

    hasPermission(){
        if(!this.props.permissions)
            return true;
        var permissions=this.props.permissions.split(',');
        var userPermissions = this.state.user.get('permissions');
        if(!userPermissions)
            return false;
        if(userPermissions.includes('admin')){
            return true;
        }
        if(permissions.some((item)=>!userPermissions.includes(item))){
            return false;
        }
        return true;
    }

    render() {
        if(this.hasPermission())
            return (
                this.props.children
            );
        else
            return null;
    }
}

export default PermissionCheck;