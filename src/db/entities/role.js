/* 
* @Author: gmf
* @Date:   2016-02-17 11:12:39
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-17 11:15:55
*/

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

export default new Schema({
            code:String,
            name:String,
            permissions:[String],
        });