var request = require('request'),
  base_url = 'http://localhost:3000/',
  server = require('./../server/server.js'),
  textParser = require('./../server/textParser.js')(),
  FASTALogic = require('./../server/FASTALogic.js')(),
  utility = require('./../server/utility.js')(),
  reconstructor = require('./../server/reconstructor.js')(),
  TEST_FILE = 'spec/test_data/test_data.txt';

describe('Server', function() {
  it('should respond with status code 200', function(done) {
    request(base_url, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('reconstructor', function() {
  it('should take a formatted input text file and return constructed DNA sequence', function(done) {
    reconstructor.constructFASTA(TEST_FILE, function(data) {
      expect(data).toBe('ATTAGACCTGCCGGAATAC'); // from given text
      done();
    });
  })
})

describe('utility', function() {
  describe('should have a method called longestCommonSubstring which', function() {
    it('should exist', function(done) {
      expect(typeof utility.longestCommonSubstring).toBe('function');
      done();
    })
    it('should take two strings and return longest substring, length, and offset', function(done) {
      var result = utility.longestCommonSubstring('hiworld', 'worldismine');
      expect(result.sequence).toBe('world');
      expect(result.length).toBe(5);
      expect(result.offset).toBe(2);
      done();
    })
  });
});

describe('textParser', function() {
  describe('should have a method called parseFASTA which', function() {
    it('should exist', function(done) {
      expect(typeof textParser.parseFASTA).toBe('function');
      done();
    })
    it('should parse FASTA formatted text file into object', function(done) {
      var sampleRawText = ">Frag_56\nATTAGACCTG\n>Frag_57\nCCTGCCGGAA\n>Frag_58\nAGACCTGCCG\n>Frag_59\nGCCGGAATAC",
        parsedFASTA = textParser.parseFASTA(sampleRawText),
        keys = Object.keys(parsedFASTA);
      expect(keys[0]).toBe('Frag_56');
      expect(parsedFASTA[keys[0]]).toBe('ATTAGACCTG');
      expect(keys[1]).toBe('Frag_57');
      expect(parsedFASTA[keys[1]]).toBe('CCTGCCGGAA');
      expect(keys[2]).toBe('Frag_58');
      expect(parsedFASTA[keys[2]]).toBe('AGACCTGCCG');
      expect(keys[3]).toBe('Frag_59');
      expect(parsedFASTA[keys[3]]).toBe('GCCGGAATAC');
      done();
    })
  });
})

describe('FASTALogic', function() {
  describe('should have a method called mapFragments which', function() {
    it('should exist', function(done) {
      expect(typeof FASTALogic.mapFragments).toBe('function');
      done();
    })
    it('should process a parsed FASTA object and return a fragment map (TODO)', function(done) {
      // test functionality
      // FASTALogic.mapFragments();
      done();
    })
  });

  describe('should have a method called findHead which', function() {
    it('should exist', function(done) {
      expect(typeof FASTALogic.findHead).toBe('function');
      done();
    })
    it('should process a FASTA fragment map and return the fragment that has no other fragments pointing to it', function(done) {
      // test functionality
      // FASTALogic.findHead();
      done();
    })
  });

  describe('should have a method called constructResult which', function() {
    it('should exist', function(done) {
      expect(typeof FASTALogic.constructResult).toBe('function');
      done();
    })
    it('should process a FASTA fragment map and return a constructed sequence', function(done) {
      // test functionality
      // FASTALogic.constructResult();
      done();
    })
  });

});
