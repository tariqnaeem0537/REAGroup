


module.exports.parseArgs = (args, cb) => {
  // Throw error if no instructions are passed
  if (!args.length) {
    cb(new RangeError('Must pass instructions to the robot'));
    return false;
  }

  var parsedArgsArray = args
    .split('\n')
    .map(function(instruction) {
      return instruction.toLowerCase();
    })
    .reduce(function(instructionList, rawInstruction) {

      var parsedInstruction = parseInstruction(rawInstruction);

      if (parsedInstruction) {
        instructionList.push(parsedInstruction);
      }
      return instructionList;
    }.bind(this), []);

  // Throw error if no valid instructions were passed
  if (!parsedArgsArray.length) {
    cb(new TypeError('No valid instructions passed'));
    return false;
  }

  cb(null, parsedArgsArray);
};

var directions = ['north', 'south', 'east', 'west'];


var parseInstruction = (rawInstructionString) => {
  var instructionObject;
  var multiWordInstructionList = rawInstructionString.split(' ');

  if (multiWordInstructionList.length > 1 && multiWordInstructionList[0] === 'place') {
    instructionObject = place(multiWordInstructionList);
  } else {
    instructionObject = parseSingleWordInstruction(rawInstructionString);
  }

  if (instructionObject) {
    return instructionObject;
  }
};

var place = (placeParts) => {
  var placeArgsList = placeParts[1].split(',');

  var x = parseInt(placeArgsList[0], 10);
  var y = parseInt(placeArgsList[1], 10);
  var direction = placeArgsList[2];

  if (!isNaN(x) && !isNaN(y) && (directions.indexOf(direction) > -1)) {
    return {
      command: 'place',
      args: [x, y, direction]
    };
  } else {
    return null;
  }
};

/**
 * Parse non-place, single word instructions and returns the parsed version*/
var parseSingleWordInstruction = (instructionString) => {
  switch (instructionString) {
    case 'move':
      return {
        command: 'move'
      };
    case 'left':
      return {
        command: 'turn',
        args: 'left'
      };
    case 'right':
      return {
        command: 'turn',
        args: 'right'
      };
    case 'report':
      return {
        command: 'report'
      };
    default:
      return null;
  }
};
