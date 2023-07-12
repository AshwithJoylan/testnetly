import http from 'http';

import app from './express';

const server = http.createServer(app);

server.addListener(808890, () => {
  console.log('Listening to express');
});
