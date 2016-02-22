/* 
* @Author: gmf
* @Date:   2016-02-13 20:08:44
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-15 14:13:42
*/

'use strict';
var ActionTypes= require('../constants/ActionTypes');

export function saveblog(title,content){
    return {
        type: ActionTypes.SAVEBLOG,
        title: title,
        content : content
    }
}

export function openblog(title){
    return {
        type: ActionTypes.OPENBLOG,
        title: title
    }
}

export function blogopened(success,blog,error){
    return {
        type: ActionTypes.BLOGOPENED,
        success:success,
        blog:blog,
        error:error
    }
}

export function fetchblog(){
    return {
        type:ActionTypes.FETCHBLOG
    }
}

export function removeblog(title){
    return {
        type:ActionTypes.DELETEBLOG,
        title:title
    }
}

export function fetchblogresponse(success,blogs,error){
    return {
        type:ActionTypes.FETCHBLOGRESPONSE,
        success:success,
        blogs:blogs,
        error:error
    }
}


