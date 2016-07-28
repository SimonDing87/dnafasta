var request = require('request'),
  base_url = 'http://localhost:3000/',
  server = require('./../server/server.js'),
  fileReader = require('./../server/fileReader.js')(),
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

describe('fileReader', function() {
  it('should take a formatted input text file and return constructed DNA sequence', function(done) {
    fileReader.getSequence(TEST_FILE, function(data) {
      expect(data).toBe('ATTAGACCTGCCGGAATAC'); // from given text
      done();
    });
  })
})

describe('reconstructor', function() {
  describe('should have a method called longestCommonSubstring which', function() {
    it('should exist', function(done) {
      expect(typeof reconstructor.longestCommonSubstring).toBe('function');
      done();
    })
    it('should work (TODO)', function(done) {
      // test functionality
      // reconstructor.longestCommonSubstring();
      done();
    })
  });

  describe('should have a method called parseData which', function() {
    it('should exist', function(done) {
      expect(typeof reconstructor.parseData).toBe('function');
      done();
    })
    it('should work (TODO)', function(done) {
      // test functionality
      // reconstructor.parseData();
      done();
    })
  });

  describe('should have a method called mapFragments which', function() {
    it('should exist', function(done) {
      expect(typeof reconstructor.mapFragments).toBe('function');
      done();
    })
    it('should work (TODO)', function(done) {
      // test functionality
      // reconstructor.mapFragments();
      done();
    })
  });

  describe('should have a method called findHead which', function() {
    it('should exist', function(done) {
      expect(typeof reconstructor.findHead).toBe('function');
      done();
    })
    it('should work (TODO)', function(done) {
      // test functionality
      // reconstructor.findHead();
      done();
    })
  });

  describe('should have a method called constructResult which', function() {
    it('should exist', function(done) {
      expect(typeof reconstructor.constructResult).toBe('function');
      done();
    })
    it('should work (TODO)', function(done) {
      // test functionality
      // reconstructor.constructResult();
      done();
    })
  });

});
