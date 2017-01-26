#!/usr/bin/env node
var path = require("path");
var sass = require("node-sass");
var eyeglass = require("eyeglass");
var rootDir = __dirname;
var assetsDir = path.join(rootDir, "assets");

var options = {};


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
sass.render(eyeglass(options), function(err, result) {
  // handle results
});
