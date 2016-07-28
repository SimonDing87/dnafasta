var request = require('request'),
  base_url = 'http://localhost:3000/',
  server = require('./../server/server.js'),
  fileReader = require('./../server/fileReader.js'),
  reconstructor = require('./../server/reconstructor.js'),
  TEST_FILE = 'spec/test_data/test_data.txt';

describe('Server', function() {
  it('should respond with status code 200', function(done) {
    request(base_url, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});