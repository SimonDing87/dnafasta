var fs = require('fs'),
  reconstructor = require('./reconstructor.js')();
TEXT_SOURCE = './server/data/coding_challenge_data_set.txt';



fs.readFile(TEXT_SOURCE, 'utf8', function(err, data) {
  if (err) {
    throw err;
  }
  var parsedData = reconstructor.parseData(data);
  var fragmentMap = reconstructor.mapFragments(parsedData);
  var result = reconstructor.constructResult(fragmentMap, parsedData);
  // console.log(result);
});
