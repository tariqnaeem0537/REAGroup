var {runInstructions} = require('./lib/Robot');
var {readFile} = require('./lib/InputFile');
var {parseArgs} = require('./lib/Reader');



/**
 * Read and parse file name
 */
var readAndParseFile = (fileName, cb) => {
  readFile(fileName, function(err, fileData) {
    if (err) {
      cb(err);
      return false;
    }

    parseArgs(fileData, function(err, instructionList) {
      if (err) {
        cb(err);
        return false;
      }

      cb(null, instructionList);
    })
  });
};

/**
 * Run simulation using input file
 */
module.exports.run = (fileName, cb) => {
  readAndParseFile(fileName, function(err, instructionList) {
    if (err) {
      cb(err);
      return false;
    }

    robot = runInstructions(instructionList);
    cb(null, robot);
  });
};
