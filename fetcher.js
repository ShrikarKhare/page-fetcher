const inputs = process.argv.slice(2);
const url = inputs[0];
const path = inputs[1];
const request = require('request');
const fs = require('fs');

const pageFetcher = (url, path, callback) => {
  request(url,(error, response, body) => {
    if (error) {
      return callback('error');
    }
    if (response.statusCode !== 200) {
      callback('Invalid response from server :' + response.statusCode);
    }
        
    fs.writeFile(path, body, (err) => {
      if (err) {
        callback(err);
      }
      let data = {fileSize: fs.statSync(path).size, path:path};
      return callback(data);
    });
  });
};
const fetchInfo = (data) => {
  if (data !== null) {
    console.log('Downloaded and saved ' + data.fileSize + ' bytes to ' + data.path);
  }
};

pageFetcher(url, path, fetchInfo);