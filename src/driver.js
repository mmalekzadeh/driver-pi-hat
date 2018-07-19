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

//conect to databox store 
let tsc = databox.NewTimeSeriesClient(DATABOX_ZMQ_ENDPOINT, false);

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/status", function(req, res) {
    res.send("active");
});

app.get("/ui", function(req, res) {
  res.send("<h1>Coming Soon.... 3 </h1>");
});


let ds1 = databox.NewDataSourceMetadata();
ds1.Description = 'Databox ds1';
ds1.ContentType = 'application/json';
ds1.Vendor = 'Databox Inc.';
ds1.Unit = 'kg';
ds1.DataSourceType = 'ds1kg';
ds1.DataSourceID = 'ds1kg_1';
ds1.StoreType = 'ts';


tsc.RegisterDatasource(ds1)
.then(()=>{
  tsc.Write('ds1kg_1',{value:34})
  .catch((err)=>{
    console.log("Error writing to store")
  })
})
.catch((err)=>{
  console.log("Error Registering datasource")
});


https.createServer(credentials, app).listen(8080);
