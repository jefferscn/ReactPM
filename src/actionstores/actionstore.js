/**
 * Session相关的所有的响应Action保存在这个ActionStore中
 */
import AppDispatcher from '../dispatcher/ServerDispatcher'
var ActionTypes= require('../constants/ActionTypes');
var ActionCreator = require('../actions/UserInfoActionCreators');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var { getHandler } = require('./actionhandler');

var ActionStore = function(session){
	this.actions = [];
	this.token = AppDispatcher.register(session,async (action,session) => {
		var handlers = getHandler(action.type);
		if(handlers){
            for(let handler of handlers){
                //var process = (action)=>handler(action,this.session);
                var result = await handler(action,session); 
                if(result)
                    this.actions.push(result);
            }
		}
	});
}

objectAssign(ActionStore.prototype, EventEmitter.prototype, {
    emitChange: function () {
        this.emit('change');
    },
    getAllActions: function () {
        return this.actions;
    },
	clear:function(){
		this.actions = [];
	},
    /**
     * 判断当前的Action是否符合要求
     * @param  {[type]} action [description]
     * @return {[type]}        [description]
     */
    validate:function(action){
        //要进行权限等判断
    },
	add:function(action){
		this.actions.push(action);
	},
	destroy:function(){
		AppDispatcher.unregister(this.token);
	}
});

export default ActionStore;
