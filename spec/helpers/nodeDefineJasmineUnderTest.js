(function() {
  var path = require("path"),
    fs = require("fs");

  var glob = require("glob");

  var j$Require = require(path.join(__dirname, "../../src/core/requireCore.js"));

  global.getJasmineRequireObj = function () {
    return j$Require;
  };

  function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  }

  function getSourceFiles() {
    var configPath = process.env.JASMINE_CONFIG_PATH;
    var configFile = fs.readFileSync(configPath, 'utf-8');
    var config = JSON.parse(configFile);
    config.src_files.forEach(function(file) {
      var filePath = path.join(__dirname, "../../", config.src_dir, file);
      glob.sync(filePath).forEach(function(resolvedFile) {
        require(resolvedFile);
      });
    });
  }

  extend(j$Require, require(path.join(__dirname,"../../src/console/requireConsole.js")));
  getSourceFiles();
  global.j$ = j$Require.core(j$Require);

  j$Require.console(j$Require, j$);
})();
