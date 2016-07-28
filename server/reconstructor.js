module.exports = function() {

  function longestCommonSubstring(str1, str2) {
    // algorithm for finding longest common substring via dynamic programming
    if (!str1 || !str2)
      return {
        length: 0,
        sequence: "",
        offset: 0
      };

    var sequence = "",
      str1Length = str1.length,
      str2Length = str2.length,
      num = new Array(str1Length),
      maxlen = 0,
      lastSubsBegin = 0;

    // init 2D array with 0
    for (var i = 0; i < str1Length; i++) {
      var subArray = new Array(str2Length);
      for (var j = 0; j < str2Length; j++)
        subArray[j] = 0;
      num[i] = subArray;
    }

    var thisSubsBegin = null;
    for (var i = 0; i < str1Length; i++) {
      for (var j = 0; j < str2Length; j++) {
        if (str1[i] !== str2[j]) {
          num[i][j] = 0;
        } else {
          if ((i === 0) || (j === 0)) {
            num[i][j] = 1;
          } else {
            num[i][j] = 1 + num[i - 1][j - 1];
          }
          if (num[i][j] > maxlen) {
            maxlen = num[i][j];
            thisSubsBegin = i - num[i][j] + 1;
            if (lastSubsBegin === thisSubsBegin) {
              //if the current LCS is the same as the last time this block ran
              sequence += str1[i];
            } else {
              //this block resets the string builder if a different LCS is found 
              lastSubsBegin = thisSubsBegin;
              sequence = ""; //clear it
              sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin);
            }
          }
        }
      }
    }
    return {
      length: maxlen,
      sequence: sequence,
      offset: thisSubsBegin
    };
  }

  var parseData = function(rawText) {
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
  }

  function mapFragments(parsedData) {
    var results = {};
    for (var key1 in parsedData) {
      for (var key2 in parsedData) {
        if (key1 !== key2) {
          var current = longestCommonSubstring(parsedData[key1], parsedData[key2]);

          if (current.length > parsedData[key1].length / 2 && current.offset !== 0) {
            results[key1] = { next: key2, offset: current.offset };
          }
        }
      }
    }
    return results;
  }

  function findHead(fragmentMap) {
    var hashMap = {};
    for (var key in fragmentMap) {
      hashMap[key] = true;
    }
    for (var key in fragmentMap) {
      if (hashMap[fragmentMap[key].next]) {
        hashMap[fragmentMap[key].next] = false;
      }
    }

    for (var key in hashMap) {
      if (hashMap[key]) {
        return key;
      }
    }
    return "Could not find head!";
  }

  function constructResult(fragmentMap, parsedData) {
    var output = "";

    var currentFragment = findHead(fragmentMap);

    while (fragmentMap[currentFragment]) {
      console.log(currentFragment + " -> " + fragmentMap[currentFragment].next);
      output += parsedData[currentFragment].substring(0, fragmentMap[currentFragment].offset);
      //while loop will exit if there is no next fragment
      currentFragment = fragmentMap[currentFragment].next;
    }
    output += parsedData[currentFragment];

    return output;
  }

  return {
    longestCommonSubstring: longestCommonSubstring,
    parseData: parseData,
    mapFragments: mapFragments,
    findHead: findHead,
    constructResult: constructResult
  }
}
