#!/usr/bin/env node
var path = require("path");
var sass = require("node-sass");
var eyeglass = require("eyeglass");
var fs = require('fs')
var rootDir = __dirname;
var assetsDir = path.join(rootDir, "assets");
var outputFile = assetsDir + '/main.css';

var options = {
  file: assetsDir + '/main.scss',
  outFile: outputFile
};

options.eyeglass = {
  // specifying root lets the script run from any directory instead of having to be in the same directory.
  root: rootDir,
  engines: {
    sass: sass
  }
}

// Standard node-sass rendering of a single file.
sass.render(eyeglass(options), function(error, result) {
   if (error) {
    console.log(error.status);
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  }
  else {
    fs.writeFile(outputFile, result.css, function(err){
      if(!err){
        console.log('done');
      }
      else {
        console.log(err)
      }
    });
  }
})
