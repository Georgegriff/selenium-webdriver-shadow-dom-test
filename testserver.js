const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8008';

const path = require('path');
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.use(express.static(__dirname)); //Serves resources from public folder

let server;

const start = async () => {

  return new Promise((resolve) => {
    server = app.listen(port, () => {
        console.log('Server is ready');
        resolve();
      });
  })
};

const stop = async () => {
  return new Promise((resolve) => {
    server.close(resolve);
  })
};

module.exports.start = start;
module.exports.stop = stop;
module.exports.HOST = host;
module.exports.PORT = port;
