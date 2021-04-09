const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";

//Currently I am using a substitute api for the feedback 
const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
  res.send('This is a proxy service which should represent MUD client');
});

// Authorization (sends 403 (Forbidden) if the Authorization Header is missing)
app.use('', (req, res, next) => {
  if (req.headers.authorization) {
    next();
  } else {
    res.sendStatus(403);
  }
});


// We will send request pointing to /json_placeholder to the JSONPlaceholder API
// Proxy endpoints
app.use('/json_placeholder', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    [`^/json_placeholder`]: '',
  },
}));


// Start the Proxy

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});


// yarn start
// curl localhost:3000/info

// GET Request
// curl -H "Authorization: prince" localhost:3000/json_placeholder/posts/1