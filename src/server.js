/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import assets from './assets';
import { port } from './config';
import { enable } from 'debug';
enable('sessionactionmgr');
enable('server');
enable('express-session');
import schema from './db/db';
import {onSessionDestroy,onSessionCreated} from './actionstores/sessionactionmgr'
import actionhandlermgr from './actionstores/actionhandlermgr'
import userinfoStore from './stores/userinfo'

const server = global.server = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));
var session = require('express-session');
var sessionstore = new session.MemoryStore();
sessionstore.on('onSessionCreated',onSessionCreated);
sessionstore.on('onSessionDestroy',onSessionDestroy);
server.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  cookie: { maxAge: 60 * 60 * 1000 ,httpOnly:false},
  store:sessionstore,
  resave:true
}));

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content'));
server.use('/api/actionproxy', require('./api/actionproxy'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
// 
var debug = require('debug')('server');
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
    const css = [];
    const context = {
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404
    };
    await Router.dispatch({ req , path: req.path, query: req.query, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send(html);
  } catch (err) {
    next(err);
  }
});

server.schema = schema;
//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
