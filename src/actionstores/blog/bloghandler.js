/* 
* @Author: gmf
* @Date:   2016-02-11 11:57:42
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-17 11:19:45
*/
import {regHandler} from '../actionhandler'
import {user,blog} from '../../db/db'
import { addPermission,regActionPermission } from '../permissionmgr'
var ActionTypes= require('../../constants/ActionTypes');
var ActionCreator = require('../../actions/BlogActionCreators');

addPermission(ActionTypes.SAVEBLOG,'保存Blog');

regActionPermission(ActionTypes.SAVEBLOG,new Set([ActionTypes.SAVEBLOG]));

regHandler(ActionTypes.FETCHBLOG,async (action,session)=>{
    try{
        let blogs = await blog.find().populate('creater').exec();
        return ActionCreator.fetchblogresponse(true,blogs);
    }
    catch(ex){
        return ActionCreator.fetchblogresponse(false,null,ex);
    }
});

regHandler(ActionTypes.OPENBLOG,async (action,session)=>{
    try{
        let dt = await blog.findOne({title:action.title}).populate('creater').exec();
        if(dt){
            return ActionCreator.blogopened(true,dt)
        }
        return ActionCreator.blogopened(true,{title:action.title,content:''});
    }
    catch(ex){
        return ActionCreator.blogopened(true,{title:action.title,content:''});
    }
});

regHandler(ActionTypes.SAVEBLOG,async (action,session)=>{
    // try{
        let dt = await blog.findOne({title:action.title}).exec();
        if(dt){
            dt.content = action.content;
            dt = await dt.save();
        }else{
            dt = new blog({
                title : action.title,
                content : action.content,
                creater : session['userinfo'],
                createDate : new Date()
            });
            dt = await dt.save();
        }
        return ActionCreator.blogopened(true,dt);
    // }
    // catch(ex){
    //     return ActionCreator.fetchblogresponse(false,null,ex);
    // }
});