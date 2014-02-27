(function() {
  var path = require("path");
  var glob = require("glob");

  var j$Require = require(path.join(__dirname, "../../src/core/requireCore.js"));

  global.getJasmineRequireObj = function () {
    return j$Require;
  };

  function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  }

  function getFiles(patterns) {
    patterns.forEach(function(pattern) {
      var filepaths = glob.sync(pattern);
      filepaths.forEach(function(file) {
        require(file);
      });
    });
  }

  extend(j$Require, require(path.join(__dirname,"../../src/console/requireConsole.js")));
  getFiles([path.join(__dirname, "../../src/core/**/*.js"),
            path.join(__dirname, "../../src/version.js"),
            path.join(__dirname, "../../src/console/**/*.js")]);

  global.j$ = j$Require.core(j$Require);

  j$Require.console(j$Require, j$);
})();
