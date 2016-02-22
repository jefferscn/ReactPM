/**
 * Session相关的所有的响应Action保存在这个ActionStore中
 */
import ActionStore from './actionstore'
import debugbuild from 'debug';
var uid = require('uid-safe').sync;
var sessionActionMap = new Map();

export function onSessionCreated(session){
	session.key = uid(24);
    var debug = debugbuild('sessionactionmgr');
	sessionActionMap.set(session.key,new ActionStore(session));
	debug('ActionStore attach to Session key=' + session.key);
} 

export function onSessionDestroy(session){
    var debug = debugbuild('sessionactionmgr');
	var actionstore = sessionActionMap.get(session.key);
	actionstore.destroy();
	sessionActionMap.delete(session.key);
	debug('ActionStore dettach from Session key=' + session.key);
}

export function getSessionActionStore(sessionId){
	return sessionActionMap.get(sessionId);
}
