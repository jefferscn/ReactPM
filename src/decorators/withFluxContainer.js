/* 
* @Author: gmf
* @Date:   2016-02-13 10:20:33
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-13 10:23:26
*/

'use strict';
import { Container } from 'flux/utils';
function withFluxContainer(component){
    return Container.create(component);
}

export default withFluxContainer;