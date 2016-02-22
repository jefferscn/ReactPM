/* 
* @Author: gmf
* @Date:   2016-02-13 19:47:46
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-17 11:16:27
*/

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

export default new Schema({
            createDate:Date,
            title:String,
            content:String,
            creater:{type: Schema.Types.ObjectId, ref: 'user'},
        });