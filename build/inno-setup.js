console.log("compiling setup");

require("innosetup-compiler")("./build/innoscript.iss", {
    gui: false,
    verbose: false,
    //signtoolname: 'signtool',
    //signtoolcommand: '"path/to/signtool.exe" sign /f "C:\\absolute\\path\\to\\mycertificate.pfx" /t http://timestamp.globalsign.com/scripts/timstamp.dll /p "MY_PASSWORD" $f'
}, function(error) {
    // callback 
});