var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionTypes= require('../constants/ActionTypes');

export function login(user,pwd){
	return {
      	type: ActionTypes.LOGIN,
      	user: user,
		pwd : pwd
	}
}

export function logout(){
	return {
      	type: ActionTypes.LOGOUT
	}
}

export function loginresponse(success,userinfo,error){
	return {
		type: ActionTypes.LOGINRESPONSE,
		success:success,
		userinfo:userinfo,
		error:error
	}
}

export function logoutresponse(success,error){
	return {
		type:ActionTypes.LOGOUTRESPONSE,
		success:success,
		error:error
	}
}

export function checkloginstatus(){
	return {
		type:ActionTypes.CHECKLOGINSTATUS
	}
}