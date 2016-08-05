const packager = require('electron-packager');

const options = {
    asar: true,
    platform: 'darwin',
    arch: 'x64',
    dir: '.',
    out: './release/',
    overwrite: true,
    icon: 'favicon',
    ignore: '^/(redist|plugins|release|build)$',
    name: 'Razer Comms'
};

packager(options, function () {

});