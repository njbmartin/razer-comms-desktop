const packager = require('electron-packager')
const options = {
  asar: true,
  platform: 'darwin',
  arch: 'x64',
  dir: '.',
  out: './release/',
  overwrite: true,
  icon: 'icon',
  ignore: '^/(redist|plugins|release|build)$',
  name: 'Razer Comms',
  prune: true
}

packager(options, (err, paths) => {
  if (err) {
    throw err
  }
})
