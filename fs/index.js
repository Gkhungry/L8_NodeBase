const fs = require('fs');
const path = require('path');

const SYNC = 'sync';
const ASYNC = 'async';

const SLUZHEBNYE = ['node_modules', '.git', '.env', '.env.', 'package-lock.json'];

function writeFile(filename, data, mode = SYNC) {
    const fullPath = path.join(__dirname, '..', filename);
    if (mode === SYNC) {
        fs.writeFileSync(fullPath, data, 'utf8');
        return true;
    }
    return new Promise((resolve, reject) => {
        fs.writeFile(fullPath, data, 'utf8', (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
}

function readFile(filename, mode = SYNC) {
    const fullPath = path.join(__dirname, '..', filename);
    if (mode === SYNC) {
        return fs.readFileSync(fullPath, 'utf8');
    }
    return new Promise((resolve, reject) => {
        fs.readFile(fullPath, 'utf8', (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function updateFile(filename, newData, mode = SYNC) {
    return writeFile(filename, newData, mode);
}

function deleteFile(filename, mode = SYNC) {
    const fullPath = path.join(__dirname, '..', filename);
    if (mode === SYNC) {
        fs.unlinkSync(fullPath);
        return true;
    }
    return new Promise((resolve, reject) => {
        fs.unlink(fullPath, (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
}

function cleanNoise(content) {
    return content.toLowerCase().replace(/\d/g, '');
}

function copyFile(src, dest, mode = SYNC) {
    const srcPath = path.join(__dirname, '..', src);
    const destPath = path.join(__dirname, '..', dest);
    if (mode === SYNC) {
        fs.copyFileSync(srcPath, destPath);
        return true;
    }
    return new Promise((resolve, reject) => {
        fs.copyFile(srcPath, destPath, (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
}

function createDir(dirname, mode = SYNC) {
    const fullPath = path.join(__dirname, '..', dirname);
    if (mode === SYNC) {
        fs.mkdirSync(fullPath, { recursive: true });
        return true;
    }
    return fs.promises.mkdir(fullPath, { recursive: true });
}

function deleteDir(dirname, mode = SYNC) {
    const fullPath = path.join(__dirname, '..', dirname);
    if (mode === SYNC) {
        fs.rmdirSync(fullPath, { recursive: true });
        return true;
    }
    return fs.promises.rmdir(fullPath, { recursive: true });
}

function listProjectFiles() {
    return fs.readdirSync('.').filter(file => !SLUZHEBNYE.some(s => file.startsWith(s)));
}

function cleanProject() {
    const files = listProjectFiles();
    files.forEach(file => {
        const stat = fs.statSync(file);
        if (stat.isDirectory()) {
            fs.rmdirSync(file, { recursive: true });
        } else {
            fs.unlinkSync(file);
        }
    });
    return true;
}

module.exports = {
    writeFile, readFile, updateFile, deleteFile, cleanNoise,
    copyFile, createDir, deleteDir, listProjectFiles, cleanProject,
    SYNC, ASYNC
};
