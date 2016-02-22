/* 
* @Author: gmf
* @Date:   2016-02-14 21:38:54
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-17 10:54:36
*/

'use strict';

import React, { Component, PropTypes } from 'react';
import s from './BlogList.scss';
import withStyles from '../../../decorators/withStyles';
import { ListGroup } from 'react-bootstrap'
import BlogListItem from './BlogListItem'

@withStyles(s)
class BlogList extends Component {

  render() { 
    return (
      <ListGroup>
        {this.props.blogs.map((blog)=>
          <BlogListItem blog={blog}></BlogListItem>
        )}
      </ListGroup>
    );
  }

}

export default BlogList;