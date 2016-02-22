/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import BlogListPage from './components/BlogListPage';
import BlogPage from './components/BlogPage';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/contact', async () => <ContactPage />);

  on('/login', async () => <LoginPage />);

  on('/blog' , async ()=> <BlogListPage />);

  on('/blog/:title/:status' , async (state)=> {
      return <BlogPage title={state.params.title} status={state.params.status}/>
    });

  on('/blog/:title' , async (state)=> <BlogPage title={state.params.title}/>);

  on('/register', async () => <RegisterPage />);

  on('*', async (state) => {
    var response = null;
    if(state.req){
      response = await fetch(`/api/content?path=${state.path}`,{
              credentials: 'include',
              headers: {'Cookie': state.req.headers.cookie}
            });
    }else{
      response = await fetch(`/api/content?path=${state.path}`,{
    	  credentials: 'same-origin'
    	});
    }
    const content = await response.json();
    return content && <ContentPage {...content} />;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
