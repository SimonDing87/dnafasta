var express = require('express'),
  bodyParser = require("body-parser"),
  path = require('path'),
  app = express(),
  reconstructor = require('./reconstructor.js')();
  FASTA_FILE = './server/data/coding_challenge_data_set.txt';

// serve static files
app.use(bodyParser.json());
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use(express.static('client'));

// routes
app.get('/test', function(req, res) {
  reconstructor.constructFASTA(FASTA_FILE, function(result) {
    res.send(result);
  });
});

// listen
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port + '...');
});