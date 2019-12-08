var expect = require('chai').expect;
var {readFile} = require('../lib/InputFile');
var path = require('path');

describe('InputFile', () => {
  it('should throw an error if the file is not a text file', (done) => {
    readFile(path.join(__dirname, 'data/nonTextFile.xml'), (err) => {
      expect(err).to.exist;
      done();
    });
  });

  it('should correctly read the contents of a text file', (done) => {
    readFile(path.join(__dirname, 'data/test1.txt'), (err, fileData) => {
      expect(err).to.be.null;
      expect(fileData).to.equal('PLACE 0,0,NORTH\nMOVE\nREPORT');
      done();
    });
  });

  it('should throw an error if file is empty', (done) => {
    readFile(path.join(__dirname, 'data/testEmpty.txt'), (err) => {
      expect(err).to.exist;
      done();
    });
  });
});