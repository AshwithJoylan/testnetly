import express from 'express';

const server = express();

import path from 'path';
import React from 'react';
import {webpack} from 'webpack';
import ReactDomServer from 'react-dom/server';

const isProd = false;

if (!isProd) {
  const webpack = require('webpack');
  const config = require('../webpack.config');
  const compiler = webpack(config);
  require('webpack-mild-compile')(compiler);

  const webpackDevMidleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer,
  );

  const webpackHotMiddleware = require('webpack-hot-middleware')(
    compiler,
    webpack.devServer,
  );

  server.use(webpackDevMidleware);
  server.use(webpackHotMiddleware);
  console.log('Midleware Enabled');
}

server.get('*', (req, res) => {
  console.log('req', req);
  const html = ReactDomServer.renderToString(Hello);
  res.send(html);
});

export default server;
