/* 
* @Author: gmf
* @Date:   2016-02-14 21:38:54
* @Last Modified by:   gmf
* @Last Modified time: 2016-02-19 13:36:29
*/

'use strict';

import React, { Component, PropTypes } from 'react';
import s from './BlogListPage.scss';
import withStyles from '../../decorators/withStyles';
import withFluxContainer from '../../decorators/withFluxContainer';
import { doRemote } from '../../actions/RemoteActionHandler';
import { fetchblog,openblog } from '../../actions/BlogActionCreators';
import BlogListStore from '../../stores/BlogListStore';
import AppDispatcher from '../../dispatcher/AppDispatcher'
import { ButtonToolbar,ButtonGroup,Badge,Button } from 'react-bootstrap'
import Link from '../Link'
import Location from '../../core/Location';
import PermissionCheck from '../PermissionCheck';
import BlogList from './BlogList'

const title = 'Blogs';

@withStyles(s)
@withFluxContainer
class BlogListPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static getStores(){
    return [BlogListStore];
  }

  static calculateState(prevState){
    var data = BlogListStore.getState();
    if(!data.get('lastUpdateDate')){//已经有数据则直接返回数据进行渲染
        doRemote(fetchblog());
        AppDispatcher.dispatch(fetchblog());
    }
    return {
      blogs:data
    }
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  onNewBlog(e){
    var title = prompt("please input blog title");
    if(title){
      Location.push({
          pathname: "/blog/" + title + "/edit",
          state: this.props && this.props.state || null,
        });
    }
  }

  onRefreshBlog(e){
    doRemote(fetchblog());
  }

  render() { 
    var loading = null;
    if(this.state.blogs.fetching){
        loading = <div className="s.loading"></div>;
    }
    return (
      <div className={s.root}>
        <div className="container">
        <ButtonToolbar>
            <ButtonGroup bsSize="small">
              <Button onClick={(e)=>this.onRefreshBlog(e)}>刷新</Button>
              <PermissionCheck permissions="SAVEBLOG">
                <Button onClick={(e)=>this.onNewBlog(e)}>创建</Button>
              </PermissionCheck>
            </ButtonGroup>
        </ButtonToolbar>
          {loading}
          <BlogList blogs={this.state.blogs.get('data')}></BlogList>
        </div>
      </div>
    );
  }

}

export default BlogListPage;