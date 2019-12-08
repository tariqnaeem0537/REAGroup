var expect = require('chai').expect;
var sinon = require('sinon');
var {place, move, turn} = require('../lib/Robot');

describe('Robot', () => {
  var robot;
  var stub;


  it('should place a robot correctly on valid position on the table', () => {
    robot = place([0,1,'north']);
    expect(robot.isPlaced).to.be.true;
    expect(robot.position).to.deep.equal({x: 0, y: 1});
    expect(robot.direction).to.equal('north');
  });

  it('should ignore any place instruction which is off the board', () => {
    robot = place([0,1,'north']);
    robot = place([5,3,'west']);
    expect(robot.isPlaced).to.be.true;
    expect(robot.position).to.deep.equal({x: 0, y: 1});
    expect(robot.direction).to.equal('north');
  });

  it('should correctly replace the robot if asked to', () => {
    robot = place([0,1,'north']);
    robot = move();
    robot = place([2,2,'east']);
    expect(robot.position).to.deep.equal({x: 2, y: 2});
    expect(robot.direction).to.equal('east');

  });

  it('should correctly turn when issued a turn command', () => {
    robot = place([0,1,'east']);
    robot = turn('left');
    expect(robot.direction).to.equal('north');
  });

  it('should correctly move when issued a move command', () => {
    robot = place([0,1,'east']);
    robot = move();
    expect(robot.position).to.deep.equal({x: 1, y: 1});
  });

  it('should report it\'s current position & direction when issued a report instruction', () => {
    stub = sinon.stub(console, 'log');
    robot = place([0,1,'east']);
    robot = report();
    robot = move();
    robot = report();

    expect(stub.called).to.be.true;
    expect(stub.callCount).to.equal(2);
    expect(stub.getCall(0).args[0].split(' ')[1]).to.equal('0,1,EAST');
    expect(stub.getCall(1).args[0].split(' ')[1]).to.equal('1,1,EAST');
    stub.restore();
  });

  it('should ignore all instructions before the first place instruction', () => {
    robot = turn('left');
    robot = move();
    robot = place([0,0,'south']);
    expect(robot.position).to.deep.equal({x: 0, y: 0});
    expect(robot.direction).to.equal('south');
  });
});