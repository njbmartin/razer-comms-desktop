const packager = require('electron-packager');
var pjson = require('../package.json');
const options = {
    asar: true,
    platform: 'win32',
    arch: 'ia32',
    dir: '.',
    out: './release/',
    overwrite: true,
    icon: 'favicon.ico',
    ignore: '^/(redist|plugins)$',
    prune: true,
    "app-version": pjson.version,
    "build-version": pjson.version + "."  + pjson.appVersion.build
};

packager(options, function (err, appPaths) {
    console.log(appPaths);
});