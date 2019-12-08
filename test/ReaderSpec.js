var expect = require('chai').expect;
var {parseArgs} = require('../lib/Reader');

describe('Reader', () => {
  
  it('should throw an error if no instructions are passed', (done) => {
    parseArgs('', (err) => {
      expect(err).to.exist;
      done();
    });
  });

  it('should correctly parse file contents into an array of instructions', (done) => {
    parseArgs('PLACE 0,0,NORTH\nMOVE\nLEFT\nRIGHT\nREPORT', (err, instructionList) => {
      expect(instructionList).to.deep.equal([
        {
          command: 'place',
          args: [0, 0, 'north']
        }, {
          command: 'move'
        }, {
          command: 'turn',
          args: 'left'
        }, {
          command: 'turn',
          args: 'right'
        }, {
          command: 'report'
        }
      ]);
      done();
    });
  });

  it('should not parse any unknown instructions', (done) => {
    parseArgs('PLACE 0,0,NORTH\nslartybartfast\nmarco polo\nPLACE 0,1,north-west\nMOVE\nREPORT', (err, instructionList) => {
      expect(instructionList).to.deep.equal([
        {
          command: 'place',
          args: [0, 0, 'north']
        }, {
          command: 'move'
        }, {
          command: 'report'
        }
      ]);
      done();
    });
  });
});