/**
 * 客户端发送action到后台进行处理，处理完成之后返回action到前台
 */
import { Router } from 'express';
import ActionStore from '../actionstores/actionstore'
import {ERROR} from '../constants/ActionTypes'
import bodyParser from 'body-parser'
import debugbuild from 'debug'
import AppDispatch  from '../dispatcher/ServerDispatcher';
import {getSessionActionStore} from '../actionstores/sessionactionmgr'
var debug = debugbuild('actionproxy');


const router = new Router();

var jsonParser = bodyParser.json();

router.post('/', jsonParser,async (req, res, next) => {
  try {
    var action= req.body;
	debug('action received from session:' + req.session.key);
	debug(action);
	var actionstore = getSessionActionStore(req.session.key);
	if(!action){
		actionstore.add({
			type:ERROR,
			msg:'action format error!'
		});
	}else{
        // try{
		  await AppDispatch.dispatch(req.session,action);
        // }catch(ex){
        //     actionstore.add({
        //         type:ERROR,
        //         msg:ex
        //     })
        // }
	}
	res.json(actionstore.getAllActions());
	actionstore.clear();
  } catch (err) {
    next(err);
  }
});

export default router;
