module.exports = function() {
  // module for reconstructing sequence fragments in various formats

  var fs = require('fs'),
    textParser = require('./textParser.js')(),
    FASTALogic = require('./FASTALogic.js')();

  function constructFASTA(FASTAText, callback) {
    fs.readFile(FASTAText, 'utf8', function(err, rawText) {
      if (err) {
        throw err;
      }
      var parsedFASTA = textParser.parseFASTA(rawText);
      var fragmentMap = FASTALogic.mapFragments(parsedFASTA);
      var result = FASTALogic.constructResult(fragmentMap, parsedFASTA);
      callback(result);
    });
  }

  return {
    constructFASTA: constructFASTA
  };
};
