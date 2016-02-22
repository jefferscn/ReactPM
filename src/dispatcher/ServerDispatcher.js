/* 
* @Author: gmf
* @Date:   2016-02-11 20:05:24
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-16 09:43:20
*/

'use strict';
var callbacks = new Map();
var lastId = 0;
var validators = new Set();
function register(session,callback){
    let id = session.key;
    callbacks.set(id,callback);
    return id;
}

function unregister(id){
    callbacks.delete(id);
}

async function validateAction(session,action){
    for(let validator of validators){
        let result = await validator(session,action);
        if(!result[0])
            return result;
    }
    return [true];
}

async function dispatch(session,action){
    var [success,error] = await validateAction(session,action);
    if(success){
        var callback = callbacks.get(session.key);
        if(callback)
            await callback(action,session);
    }else{
        throw error;
    }
}

export function regValidator(validator){
    validators.add(validator);
}

export default {
    register:register,
    unregister:unregister,
    dispatch:dispatch
}

