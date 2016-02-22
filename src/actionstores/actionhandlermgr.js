/* 
* @Author: gmf
* @Date:   2016-02-11 13:13:40
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-20 14:27:07
*/
import account from './account/actionhandler'
import blog from './blog/bloghandler'
import { permissionValidator } from './permissionmgr'

var AppDispatcher= require('../dispatcher/ServerDispatcher');
AppDispatcher.regValidator(permissionValidator);