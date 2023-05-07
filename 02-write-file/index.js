const stream = require('stream');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './file.txt');
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

console.log(`Введите текст, пожалуйста. Для завершения введите exit.\n`);

process.stdin.on('data', (data) => {
    const input = data.toString().trim();
    if (input.toLowerCase() === 'exit') {
        console.log('Завершение процесса!');
        process.exit(0);
    } else {
        writeStream.write(`${input}\n`);
    }
});

process.on('SIGINT', () => {
    console.log('Завершение процесса!');
    writeStream.end();
    process.exit(0);
});
