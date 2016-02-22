/* 
* @Author: gmf
* @Date:   2016-02-11 14:42:36
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-17 11:16:04
*/
import roleSchema from './role'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
export default new Schema({
            code:String,
            name:String,
            roles:[{type: Schema.Types.ObjectId, ref: 'role'}],
            password:String,
            admin:Boolean});