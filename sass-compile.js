#!/usr/bin/env node
var path = require("path");
var sass = require("node-sass");
var eyeglass = require("eyeglass");
var fs = require('fs')
var rootDir = __dirname;
var assetsDir = path.join(rootDir, "assets");
var outputFile = assetsDir + '/main.css';
var importOnce = require('node-sass-import-once');

var options = {
  file: assetsDir + '/main.scss',
  outFile: outputFile,
  importer: importOnce,
  importOnce: {
    index: false,
    css: false,
  }
};

options.eyeglass = {
  // specifying root lets the script run from any directory instead of having to be in the same directory.
  root: rootDir,

  // where assets are installed by eyeglass to expose them according to their output url.
  // If not provided, assets are not installed unless you provide a custom installer.
  buildDir: path.join(rootDir, "dist"),

  assets: {
    // prefix to give assets for their output url.
    httpPrefix: "assets",

    // Add assets except for js and sass files
    // The url passed to asset-url should be
    // relative to the assets directory specified.
    sources: [
      {directory: assetsDir, globOpts: { ignore: ["**/*.js", "**/*.scss"] }}
    ]
  },

  engines: {
    sass: sass
  }
}

// Standard node-sass rendering of a single file.
sass.render(eyeglass(options), function(error, result) {
   if (error) {
    console.log(error.status); // used to be "code" in v2x and below
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
