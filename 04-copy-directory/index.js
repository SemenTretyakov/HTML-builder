const fs = require('fs/promises');
const path = require('path');

const sourceDir = path.join(__dirname, './files');
const destinationDir = path.join(__dirname, './files-copy');

(async function () {
    try {
        await fs.access(sourceDir);
    } catch (err) {
        console.warn(`Source dir ${sourceDir} doesn't exist!`);
        console.log('Exiting...');
        process.exit(0);
    }

    try {
        await fs.stat(destinationDir);
        await fs.rm(destinationDir, { recursive: true });
    } catch (err) {}

    try {
        await fs.mkdir(destinationDir);
        const fileNames = await fs.readdir(sourceDir);
        for (let i = 0; i < fileNames.length; i++) {
            const fileName = fileNames[i];
            const sourceFilePath = path.join(sourceDir, fileName);
            const destinationFilePath = path.join(destinationDir, fileName);

            await fs.copyFile(sourceFilePath, destinationFilePath);
            console.log(`File ${fileName} was copied`);
        }
        console.log(`Directory ${sourceDir} was copied to ${destinationDir}`);
    } catch (err) {
        console.error(
            `Error copying directory ${sourceDir} to ${destinationDir}`,
            err
        );
        process.exit(1);
    }
})();
