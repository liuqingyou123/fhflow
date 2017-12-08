var actionSettingData = {
    "supportREM": true,
    "supportChanged": false,
    "reversion": false,
    "modules": [],
    "businessName": "hero",
    "server": {
        "host": "localhost",
        "port": 8089,
        "liverload": true,
        "proxys": []
    },
    "ftp": {
        "host": "",
        "port": "",
        "user": "",
        "pass": "",
        "remotePath": "",
        "ignoreFileRegExp": "",
        "ssh": false
    },
    "package": {
        "type": "zip",
        "version": "0.0.1",
        "fileRegExp": "${name}-${moduleName}-${version}-${time}"
    }
}

export default actionSettingData;