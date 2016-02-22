/* 
* @Author: gmf
* @Date:   2016-02-11 11:57:42
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-20 15:25:11
*/
import {regHandler} from '../actionhandler'
import {user} from '../../db/db'
import { addPermission,regActionPermission } from '../permissionmgr'

var ActionTypes= require('../../constants/ActionTypes');
var ActionCreator = require('../../actions/UserInfoActionCreators');

regHandler(ActionTypes.LOGIN,async (action,session)=>{
    let userObj = await user.findOne({code:action.user,password:action.pwd}).populate('roles').exec();
    if(userObj){
        var debug = require('debug')('server');
        session['userinfo']=userObj;
        var permissions = [];
        for(let role of userObj.roles){
            for(let permission of role.permissions){
                if(!permissions.includes(permission)){
                    permissions.push(permission);
                }
            }
        }
        session['rights'] = permissions;
        debug(session);
        return ActionCreator.loginresponse(true,{code:userObj.code,name:userObj.name,permissions:permissions});
    }
    return ActionCreator.loginresponse(false,null,'code or password wrong!');
});

regHandler(ActionTypes.LOGOUT,(action,session)=>{
    delete session['userinfo'];
    return ActionCreator.logoutresponse(true);
});

regHandler(ActionTypes.CHECKLOGINSTATUS,(action,session)=>{
    var userinfo = session['userinfo'];
    if(userinfo){
        return ActionCreator.loginresponse(true,{
            code:userObj.code,name:userObj.name,permissions:session['rights']});
    }
    return null;
});