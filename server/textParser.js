module.exports = function() {
  // module for parsing various forms of file data
  var fs = require('fs');

  function parseFASTA(rawText) {
    // parses data based on given text format
    // output:
    // {
    //   frag1: sequence1,
    //   frag2: seqeunce2,
    //   frag3: sequence3
    // }

    var array = rawText.split("\n"),
      obj = {},
      currentKey = "";
    for (var i = 0; i < array.length; i++) {
      if (array[i][0] === ">") {
        currentKey = array[i].substring(1);
        obj[currentKey] = "";
        continue;
      }
      obj[currentKey] += array[i];
    }
    return obj;
  };

  return {
    parseFASTA: parseFASTA
  };
};
