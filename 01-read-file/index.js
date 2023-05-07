const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, 'utf8');

readStream.on('data', (dataChunk) => {
    console.log(dataChunk);
});

readStream.on('end', () => {});

readStream.on('error', (err) => {
    console.log(err);
});
