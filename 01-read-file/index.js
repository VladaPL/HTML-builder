const fs = require('fs');
const path = require('path');
const { stdout } = process;


const wayOfFile = path.join(__dirname, 'text.txt');

const readableFile = fs.createReadStream(wayOfFile,'utf-8');
readableFile.on('data', chunk => stdout.write(chunk));


