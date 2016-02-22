/* 
* @Author: gmf
* @Date:   2016-02-13 20:26:54
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-16 10:59:23
*/

'use strict';

import { Store } from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher'
import Immutable from 'immutable'

var actionTypes= require('../constants/ActionTypes');
var data =  new Immutable.Map({
            totalsize:0,
            data:Immutable.List(),
            fetching:false,
            lastUpdateDate:null
        });

class BlogListStore extends Store{

    getState(){
        return data;
    }

    __onDispatch(action) {
        switch(action.type) {
            case actionTypes.FETCHBLOG:
                data = data.set('fetching',true);
                this.__emitChange();
                break;  
            case actionTypes.FETCHBLOGRESPONSE:
                data = data.set('fetching',false);
                if(action.success){
                    //action.count,action.start,action.totalsize
                    data = data.set('data',Immutable.fromJS(action.blogs));
                    data = data.set('totalsize',action.blogs.length);
                    data = data.set('lastUpdateDate',new Date());
                }
                this.__emitChange();
                break;
            case actionTypes.BLOGOPENED:
                if(action.success){
                    var bg = data.get('data').find((item)=>item.get('title')==action.blog.title);
                    if(bg){
                        var index = data.get('data').indexOf(bg);
                        data = data.setIn(['data',index],Immutable.fromJS(action.blog));
                    }else{
                        data = data.set('data',data.get('data').push(Immutable.fromJS(action.blog)));
                    }
                    data = data.set('totalsize',data.get('data').size);
                }
                this.__emitChange();
                break;  
            case actionTypes.BLOGDELETED:
                //this.data = this.data.remove();
                this.__emitChange();
                break;  
            default:
             // no op
        }
   }
}

export default new BlogListStore(AppDispatcher);