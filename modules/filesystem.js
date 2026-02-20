const fsModule = require('../fs');

module.exports = {
    write: fsModule.writeFile,
    read: fsModule.readFile,
    clean: fsModule.cleanFileContent,
    copy: fsModule.copyFile,
    mkdir: fsModule.createDir,
    rmdir: fsModule.deleteDir
};
