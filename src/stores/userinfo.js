/**
 * 当前登录的用户信息store
 */
import { Store } from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher'
import Immutable from 'immutable'

var actionTypes= require('../constants/ActionTypes');
var userinfo = Immutable.Map({
		fetching:false,
		id:-1,
		name:'guest',
		code:'guest',
		logined:false
	});

class UserInfoStore extends Store {

	getState(){
		return userinfo;
	}

	initState(data){
		userinfo = Immutable.Map({
			id:data._id,
			code:data.code,
			name:data.name,
			fetching:false,
			logined:true
		});
	}

	__onDispatch(action) {
        switch(action.type) {
			case actionTypes.REQUEST:
				userinfo = userinfo.set('fetching',true);
				this.__emitChange();
				break;
			case actionTypes.LOGINRESPONSE:
				userinfo = userinfo.set('fetching',false);
				if(action.success){
					userinfo = Immutable.Map({
						id:action.userinfo._id,
						code:action.userinfo.code,
						name:action.userinfo.name,
						permissions:Immutable.List(action.userinfo.permissions),
						fetching:false,
						logined:true
					});
				}
				this.__emitChange();
			    break;	
			case actionTypes.LOGOUTRESPONSE:
				userinfo = Immutable.Map({
					fetching:false,
					id:-1,
					name:'guest',
					code:'guest',
					logined:false
				});
				this.__emitChange();
			    break;	
			default:
	         // no op
     	}
   }
}

export default new UserInfoStore(AppDispatcher);
