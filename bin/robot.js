
var {run} = require('../index.js');

/**
 * Get input file argument, the input file is placed in the root directory 
 */
var fileName = process.argv[2];

/**
 * Run the simulation
 */
run(fileName, function(err, robot) {
  // If error, let the user know
  if (err) {
    console.log('ERROR: ' + err.message);
    return false;
  }

  //validate commands
  if (!robot.isPlaced) {
    console.log('Robot was never placed on the table');
  }
  console.log('Success');
});
