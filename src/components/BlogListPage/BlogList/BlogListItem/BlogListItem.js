/* 
* @Author: gmf
* @Date:   2016-02-14 21:38:54
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-17 11:05:34
*/

'use strict';

import React, { Component, PropTypes } from 'react';
import s from './BlogListItem.scss';
import withStyles from '../../../../decorators/withStyles';
import { ListGroupItem } from 'react-bootstrap'
import Link from '../../../Link'

@withStyles(s)
class BlogListItem extends Component {

  render() { 
    return (
      <ListGroupItem header=<Link to={ "/blog/" + this.props.blog.get('title')}>{this.props.blog.get('title')}</Link>>
        created by {this.props.blog.getIn(['creater','name'])} at {this.props.blog.get('createDate')}
      </ListGroupItem>
    );
  }

}

export default BlogListItem;