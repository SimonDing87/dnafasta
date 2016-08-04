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
    for (var row = 0; row < str1Length; row++) {
      var subArray = new Array(str2Length);
      for (var col = 0; col < str2Length; col++)
        subArray[col] = 0;
      num[row] = subArray;
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
  return {
    longestCommonSubstring: longestCommonSubstring
  };
}
