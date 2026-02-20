const os = require('os');

function getOSInfo() {
    return {
        platform: os.platform(),
        freememGB: Math.round(os.freemem() / 1024 / 1024 / 1024 * 100) / 100,
        homedir: os.homedir(),
        hostname: os.hostname(),
        networkInterfaces: os.networkInterfaces()
    };
}

function checkMemory() {
    const freememGB = Math.round(os.freemem() / 1024 / 1024 / 1024 * 100) / 100;
    return freememGB > 4;
}

function restrictedInfo() {
    if (process.env.MODE === 'admin') {
        return getOSInfo();
    }
    return 'Access denied. MODE=user';
}

module.exports = { getOSInfo, checkMemory, restrictedInfo };
