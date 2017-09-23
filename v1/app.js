"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

require('dotenv').config();

const API_PREFIX = '/api/v1';

const app = express();

/*
  It is advisable to control which client domains can have 
  access and which methods they can use and, mainly, 
  which headers must be required to the clients inform in the request. 
  In our case let’s setup only three attributes: origin (allowed domains), 
  methods (allowed methods) and allowedHeaders (requested headers).
*/
app.use(cors());

/*
  To make requests lighter and load faster, let’s enable another middleware 
  which is going to be responsible for compacting the JSON responses and also 
  the static files which your application will serve to GZIP format, a compatible 
  format to several browsers. We’ll do this simple but important refactoring just 
  using the module 
*/
app.use(compression());

/**
 * Finishing the development of our API, let’s include a very important module, 
 * which is a security middleware that handles several kinds of attacks in the 
 * HTTP/HTTPS protocols. This module is called helmet which is a set of nine 
 * internal middlewares, responsible to treat the following HTTP settings:
 *
  1. Configures the Content Security Policy;
  2. Removes the header X-Powered-By that informs the name and the version of a server;
  3. Configures rules for HTTP Public Key Pinning;
  4. Configures rules for HTTP Strict Transport Security;
  5. Treats the header X-Download-Options for Internet Explorer 8+;
  6. Disables the client-side caching;
  7. Prevents sniffing attacks on the client Mime Type;
  8. Prevents ClickJacking attacks;
  9. Protects against XSS (Cross-Site Scripting) attacks.
 *
 */
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(favicon(path.join(__dirname, 'favicon.ico')));

//  Connect all our routes to our application
app.use(API_PREFIX, require('./routes'));

// exposing app
module.exports = exports = app;