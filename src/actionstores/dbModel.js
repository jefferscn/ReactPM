/* 
* @Author: gmf
* @Date:   2016-02-11 14:31:18
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-12 12:44:45
*/

var objectAssign = require('object-assign');
var model= {};
export function addModel(key,model){
    if(!model.has(key)){
        model.add(key,model);
    }else{
        let md=model.get(key);
        objectAssign(md,model);
    }
}
export default model;