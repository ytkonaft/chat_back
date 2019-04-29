#!/usr/bin/env node
/**
 * Module dependencies.
 */

import debugLib from 'debug';
import http from 'http';
import mongoConnect from './db';
import app from '../app';

/**
 * Get consts from .env
 */

const {
  DB_MONGO_CONNECTION, DB_MONGO_HOST, DB_MONGO_PORT, DB_MONGO_DATABASE, PORT
} = process.env;

const debug = debugLib('chat:server');
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * MongoDB connection.
 */

const db = mongoConnect({
  connection: DB_MONGO_CONNECTION,
  host: DB_MONGO_HOST,
  port: DB_MONGO_PORT,
  dbName: DB_MONGO_DATABASE
});

console.log('---->', db);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
