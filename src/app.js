const https = require('https');
const express = require("express");
const bodyParser = require("body-parser");
const databox = require('node-databox');

//
// Get the needed Environment variables
//
const DATABOX_STORE_BLOB_ENDPOINT = process.env.DATABOX_STORE_ENDPOINT;
const DATABOX_ZMQ_ENDPOINT = process.env.DATABOX_ZMQ_ENDPOINT

//HTTPS certs created by the container mangers for this components HTTPS server.
credentials = databox.getHttpsCredentials();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/status", function(req, res) {
    res.send("active");
});

app.get("/ui", function(req, res) {
  res.send("<h1>Hello!!! world!!!</h1>");
});

https.createServer(credentials, app).listen(8080);