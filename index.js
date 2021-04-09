const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";

// Logging
app.use(morgan('dev'));