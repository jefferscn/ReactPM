/* 
* @Author: gmf
* @Date:   2016-02-16 09:13:03
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-20 15:13:44
*/

'use strict';
const permissions = new Set();
const actionpermissions = new Map();

addPermission("admin",'管理员权限');

export function addPermission(code,name){
    permissions.add({
        code:code,
        name:name
    })
}

export function regActionPermission(action,permissionCodes){
    actionpermissions.set(action,permissionCodes);
}

export function needPermission(permissionSet){
    return function(){
        return 
    }
}

export async function permissionValidator(session,action){
    var permissions = actionpermissions.get(action.type);
    if(!permissions)
        return [true];
    var rights=session['rights'];
    if(!rights)
        return [false,'permission denied!'];
    if(rights.includes('admin')){
        return [true];
    }
    var userRights = rights.filter((item)=>permissions.has(item));
    if(userRights.length==permissions.size){
        return [true];
    }else{
        return [false,'permission denied!'];
    }
}