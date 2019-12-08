var fs = require('fs');

/**
 * Read input file
 */
module.exports.readFile = function(fileName, cb) {

  // Validate input
  validateFile(fileName, function(err, validatedFileName) {
    if (err) {
      cb(err);
      return false;
    }

    // Read file into memory if valid
    fs.readFile(validatedFileName, { encoding: 'utf-8' }, function(err, fileData) {
      if (err) {
        cb(new ReferenceError('File doesn\'t exist or cannot be accessed'));
        return false;
      }

      // If contents are empty, throw an error
      if (!fileData.length) {
        cb(new RangeError('File contents cannot be empty'));
        return false;
      }

      cb(null, fileData);
    });
  });


};

/**
 * Validate input file name
 */
var validateFile = (argString, cb) => {
  var splitArray = argString.split('.');
  var len = splitArray.length;

  // checking for .txt file
  if (len === 1 && splitArray[0] === argString) {
    cb(new TypeError('Require a valid .txt file'));
    return false;
  }

  // Only allow .txt files as input
  if (splitArray[len - 1] !== 'txt') {
    cb(new TypeError('Require .txt file only!'));
    return false;
  }

  cb(null, argString);

};

