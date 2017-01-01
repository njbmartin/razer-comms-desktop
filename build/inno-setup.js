const path = require('path')

console.log('compiling setup')
const PASSWORD = process.env.SIGNPASS
const cert = path.resolve('.certs\\ultrabox_signing_cert.pfx')

require('innosetup-compiler')('./build/innoscript.iss', {
  gui: false,
  verbose: true,
  signtoolname: 'signtool',
  signtoolcommand: `"C:/Program Files (x86)/Windows Kits/10/bin/x64/signtool.exe" sign /f "${cert}" /t http://timestamp.globalsign.com/scripts/timstamp.dll /p "${PASSWORD}" $f`
}, function (error) {
  if (error) {
    console.error(error)
  }
  // callback
})
