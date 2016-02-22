/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import s from './BlogPage.scss';
import withStyles from '../../decorators/withStyles';
import withFluxContainer from '../../decorators/withFluxContainer';
import { doRemote } from '../../actions/RemoteActionHandler';
import { openblog,saveblog } from '../../actions/BlogActionCreators';
import BlogListStore from '../../stores/BlogListStore';
import { ButtonGroup,Button } from 'react-bootstrap'
import PermissionCheck from '../PermissionCheck';
import Location from '../../core/Location';

var Markdown = require('markdown').markdown;
var MarkdownEditor = require('react-markdown-editor').MarkdownEditor;

const title = 'Blog';

@withStyles(s)
@withFluxContainer
class BlogPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static getStores(){
      return [BlogListStore];
  }

  static calculateState(prevState){
    var data = BlogListStore.getState();
    return {
      blogs:data
    };
  }

  componentWillMount() {
    this.context.onSetTitle(title);
    var data = BlogListStore.getState().get('data').find((item)=>item.get('title')==this.props.title);
    if(!data){
      doRemote(openblog(this.props.title));
    }
  }

  onSave(e){
    var content = this.refs.editor.state.content;
    doRemote(saveblog(this.props.title,content));
    Location.push({
      pathname: "/blog/" + this.props.title,
      state: this.props && this.props.state || null,
    })
  }

  onEdit(e){
    Location.push({
      pathname: "/blog/" + this.props.title + '/edit',
      state: this.props && this.props.state || null,
    })
  }

  render() { 
    var loading = null;
    if(this.state.fetching){
        loading = <div className="s.loading"></div>;
    }
    var contentDiv = null;
    var actionDiv = null;
    var blog = this.state.blogs.get('data').find((item)=>item.get('title')==this.props.title);
    if(this.props.status=="edit" && blog){
      //编辑模式打开
      contentDiv = <MarkdownEditor ref="editor" initialContent={blog.get('content')}></MarkdownEditor>
      actionDiv = <ButtonGroup><Button onClick={(e)=>this.onSave(e)}>Save</Button></ButtonGroup>;
    }else{
      var htmlContent ="";
      if(blog)
        htmlContent = blog.get('content').replace(/[\n]/g, '  \n');
      htmlContent = Markdown.toHTML(htmlContent);
      contentDiv = <div
        dangerouslySetInnerHTML={{__html: htmlContent}}
        ></div>;
      actionDiv = <ButtonGroup><Button onClick={(e)=>this.onEdit(e)}>Edit</Button></ButtonGroup>;
    }
    return (
      <div className={s.root}>
        <div className="container">
          {loading}
          <h1>{this.props.title}</h1>
          {contentDiv}
          <PermissionCheck permissions="SAVEBLOG">
            {actionDiv}
          </PermissionCheck>
        </div>
      </div>
    );
  }

}

export default BlogPage;