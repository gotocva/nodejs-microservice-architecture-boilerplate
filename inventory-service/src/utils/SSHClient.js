import ssh2 from 'ssh2';

class SSHClient {

    isConnected = false;

    constructor(host, username, keyFilePath) {
        this.connectionConfig = {
            host: host,
            username: username,
            privateKey: require('fs').readFileSync(keyFilePath)
        }
        this.connection = new ssh2.Client();

        this.connection.on('end', () => {
            this.isConnected = false;
        });
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect(this.connectionConfig);
            this.connection.on('ready', () => {
                console.log('SSH connected successfully');
                this.isConnected = true;
                resolve(this);
            });
            this.connection.on('error', (error) => {
                console.log('SSH authentication failed', error);
                reject(error);
            });
        });
    }

    disconnect() {
        this.connection.end();
        return this;
    }


    makeDirectory(directoryPath) {
        return new Promise((resolve, reject) => {
            if (this.isConnected == true) {
                this.connection.sftp(function(err, sftp) {
                    if (err) {
                        reject(err);
                    }
                    sftp.mkdir(directoryPath, function(err) {
                      if (err) {
                        console.log("Failed to create directory!", err);
                        reject("Failed to create directory!"+err)
                      } else {
                        console.log("Directory created on SFTP server");
                        resolve('Directory created on SFTP server');
                      }
                    });
                });
            } else {
                reject('SSH not connected');
            }
        });
    }

    executeCMD(cmd) {
        return new Promise((resolve, reject) => {
            this.connection.exec(cmd , function(err, stream) {
            if (err) reject(err);
            stream.on('close', function(code, signal) {
              console.log('SSH Stream :: close :: code: ' + code + ', signal: ' + signal);
            }).on('data', function(output) {
              console.log('STDOUT: ' + output);
              const data = Buffer.from(output).toString();
              resolve(data);
            }).stderr.on('data', function(output) {
              console.log('STDERR: ' + output);
              const data = Buffer.from(output).toString();
              reject(data);
            });
          });
        });
    }
}


module.exports = SSHClient;