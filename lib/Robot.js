
var robot = {isPlaced : false, direction: null, position: { x: null, y: null }  };

/**
 * Directions Index
 */
var directions = {
  north: {
    value: 'north',
    left: 'west',
    right: 'east'
  },
  east: {
    value: 'east',
    left: 'north',
    right: 'south'
  },
  south: {
    value: 'south',
    left: 'east',
    right: 'west'
  },
  west: {
    value: 'west',
    left: 'south',
    right: 'north'
  }
};

/**
 * The max size of the table
 */
var tableSize = {x: 4, y: 4};

/**
 * Placement of robot
 */
module.exports.place = (paramList) => {
    var x = paramList[0];
    var y = paramList[1];
    var direction = directions[paramList[2]].value;

    // Ignore if placement is off the table
    if (x > tableSize.x || y > tableSize.y) {
      return robot;
    }

    // Modify robot with directions
    robot.isPlaced = true;
    robot.position.x = x;
    robot.position.y = y;
    robot.direction = direction;
    return robot;
};

/**
 * As per instructions Robot will move 90 degrees from its current placements when moved
 */
module.exports.move = () => {
  // Ignore command if robot is not yet placed
  if (!robot.isPlaced) {
    return robot;
  }

  var x = robot.position.x;
  var y = robot.position.y;

  switch (robot.direction) {
    case 'north':
      if (++y < tableSize.y) {
        robot.position = {x: x, y: y}
      }
      break;
    case 'east':
      if (++x < tableSize.x) {
        robot.position = {x: x, y: y}
      }
      break;
    case 'south':
      if (--y >= 0) {
        robot.position = {x: x, y: y};
      }
      break;
    case 'west':
      if (--x >= 0) {
        robot.position = {x: x, y: y}
      }
      break;
    default:
      break;
  }

  return robot;
};

/**
 * Turn a robot in a direction
 */
module.exports.turn = (direction) => {
  // Ignore command if robot is not yet placed
  if (!robot.isPlaced) {
    return robot;
  }

  var resultDirection = directions[robot.direction][direction];

  if (resultDirection) {
    robot.direction = resultDirection;
  }

  return robot;
};

/**
 * Report current position of the robot
 */
module.exports.report = () => {
  // Ignore command if robot is not yet placed
  if (!robot.isPlaced) {
    return robot;
  }

  console.log('REPORT: ' + [robot.position.x, robot.position.y,robot.direction.toUpperCase()].join(','));

  return robot;
};

/**
 * Run parsed instructions
 */
module.exports.runInstructions = (instructionList) => {
  // Run each instruction in series
  for (var i = 0; i<instructionList.length; i++) {
    let instruction = instructionList[i];
    switch(instruction.command) {
      case 'move' :
        robot = module.exports.move();
        break;
      case 'place':
        robot = module.exports.place(instruction.args);
        break;
      case 'turn':
        robot = module.exports.turn(instruction.args);
        break;
      case 'report':
        robot = module.exports.report();
        break;
    }
  }

  return robot;
};





