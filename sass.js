#!/usr/bin/env node

var path = require("path");
var sass = require('node-sass');
var fs = require('fs');

var rootDir = __dirname;
var assetsDir = path.join(rootDir, "assets");
var outputFile = assetsDir + '/output.css';


sass.render({
  file: assetsDir + '/main.scss',
  includePaths: [ 'lib/', 'mod/' ],
  // outputStyle: 'compressed',
  outFile: outputFile,
}, function(error, result) { // node-style callback from v3.0.0 onwards
  if (error) {
    console.log(error.status); // used to be "code" in v2x and below
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  }
  else {
    console.log(result.css.toString());
    fs.writeFile(outputFile, result.css, function(err){
      if(!err){
        console.log('done');
      }
      else {
        console.log(err)
      }
    });
  }
});
