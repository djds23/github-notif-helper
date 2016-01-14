const main = function () {
  let jsonfile = require('jsonfile');
  let versionParam = process.argv[2];

  let devPath = '../dev/manifest.json';
  let distPath = '../dist/manifest.json';
  let packagePath = '../package.json';

  let dev = require(devPath);
  let dist = require(distPath);
  let packageObj = require(packagePath);

  function incVersion(versionParam, manifestObj) {
    let semVer = manifestObj.version.split('.').map((obj) => {
      return parseInt(obj);
    });

    semVer[paramToIndex(versionParam)]++;
    manifestObj.version = semVer.join('.');
    return manifestObj;
  }

  function paramToIndex(param) {
    switch (param.toLowerCase()) {
      case 'patch':
        return 0;
      case 'minor':
        return 1;
      default:
        return 2;
    }
  }

  [[dev, '/dev/manifest.json'], [dist, '/dist/manifest.json'], [packageObj, packagePath]].forEach((element, index, array) => {
    let obj = incVersion(versionParam, element[0]);
    jsonfile.writeFile(element[1], obj, {spaces: 2}, function(err) {
      console.error(err)
    })
  });
}

if (require.main === module) {
  main();
}

