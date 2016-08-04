module.exports = function() {
  // module for reconstructing FASTA fragments
  var utility = require('./utility.js')();

  function mapFragments(parsedData) {
    // takes parsedData and creates a linked list of fragment relationships.
    // the offset property indiciates the index at which the next fragment overlaps the first
    // output:
    // {
    //   frag1: {         // (head)
    //     next: frag3,
    //     offset: 4
    //   },
    //   frag2: {         // (tail)
    //     next: frag4,
    //     offset: 2
    //   },
    //   frag3: {
    //     next: frag2,
    //     offset: 6
    //   }
    // }
    var results = {};
    for (var key1 in parsedData) {
      for (var key2 in parsedData) {
        if (key1 !== key2) {
          var current = utility.longestCommonSubstring(parsedData[key1], parsedData[key2]);

          if (current.length > parsedData[key1].length / 2 && current.offset !== 0) {
            results[key1] = { next: key2, offset: current.offset };
          }
        }
      }
    }
    return results;
  }

  function findHead(fragmentMap) {
    // finds head of linked list
    var hashMap = {};
    // consider grabbing array of keys instead of looping through object or using underscore / lodash
    for (var key1 in fragmentMap) {
      hashMap[key1] = true;
    }
    for (var key2 in fragmentMap) {
      if (hashMap[fragmentMap[key2].next]) {
        hashMap[fragmentMap[key2].next] = false;
      }
    }

    for (var key3 in hashMap) {
      if (hashMap[key3]) {
        return key3;
      }
    }
    return "Could not find head!";
  }

  function constructResult(fragmentMap, parsedData) {
    // constructs complete sequence from linked list fragment map
    var output = "";

    var currentFragment = findHead(fragmentMap); // start from head

    while (fragmentMap[currentFragment]) {
      // console.log(currentFragment + " -> " + fragmentMap[currentFragment].next);
      output += parsedData[currentFragment].substring(0, fragmentMap[currentFragment].offset);
      //while loop will exit when tail is reached
      currentFragment = fragmentMap[currentFragment].next;
    }
    output += parsedData[currentFragment];

    return output;
  }

  return {
    mapFragments: mapFragments,
    findHead: findHead,
    constructResult: constructResult
  };
};
