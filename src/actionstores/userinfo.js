/**
 * 处理用户登录登出操作的ActionStore
 */
import ActionHandler from './actionhandler' 
var ActionTypes= require('../constants/ActionTypes');
var AppDispatcher= require('../dispatcher/AppDispatcher');
var ActionCreator = require('../actions/UserInfoActionCreators');

ActionHandler.regHandler(ActionTypes.LOGIN,(action,session)=>{
	if(action.user=='admin' && action.pwd=='111'){
		session['userinfo']={name:'admin'};
		return ActionCreator.loginresponse(true,{name:'admin'});
	}
	return ActionCreator.loginresponse(false,null,'name or password wrong!');
});

ActionHandler.regHandler(ActionTypes.LOGOUT,(action,session)=>{
	delete session['userinfo'];
	return ActionCreator.logoutresponse(true);
});

module.exports = dispatchToken;
