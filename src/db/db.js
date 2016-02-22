/* 
* @Author: gmf
* @Date:   2016-02-11 14:10:29
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-20 14:33:47
*/
var userSchema = require('./entities/user');
var blogSchema = require('./entities/blog');
var roleSchema = require('./entities/role');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp');

// var schema = new Schema('mysql',{
//     host:'1.1.2.191',
//     port:3306,
//     username:'mysql',
//     password:'mysql',
//     database:'yigoprojects// });
//     
var roleModel = mongoose.model('role',roleSchema);
var userModel = mongoose.model('user',userSchema);
var blogModel = mongoose.model('blog',blogSchema);

async function init(){
    var count = await userModel.count({code:'admin'}).exec();
    if(count===0){
        var adminrole = new roleModel();
        adminrole.code="admin";
        adminrole.name="管理员角色";
        adminrole.permissions=['admin'];
        await adminrole.save();
        var admin = new userModel();
        admin.code="admin";
        admin.password="111";
        admin.name="管理员";
        admin.roles.push(adminrole);
        await admin.save();
    }
}

init();

export default mongoose;
export var user = userModel;
export var blog = blogModel;
export var role = roleModel;