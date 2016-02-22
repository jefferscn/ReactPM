/* 
* @Author: gmf
* @Date:   2016-02-12 10:09:04
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-12 15:17:11
*/

'use strict';
import fetch from '../core/fetch'
import AppDispatcher from '../dispatcher/AppDispatcher'

export async function doRemote(action,cb){
    let response = await fetch('/api/actionproxy',{
        method:'post',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(action)
    });
    var res = await response.json();
    if(cb){
        cb(res);
    }
    for(let act of res){
        AppDispatcher.dispatch(act);
    }
}
