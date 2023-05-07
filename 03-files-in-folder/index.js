const fs = require('fs');
const path = require('path');
const stream = require('stream');

const sourceDir = path.join(__dirname, './secret-folder');

fs.exists(sourceDir, (exists) => {
    if (!exists) {
        console.warn(`Source dir ${sourceDir} doesn't exists!`);
        console.log('Exiting...');
        process.exit(0);
    }

    fs.readdir(sourceDir, (err, fileNames) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }

        fileNames.forEach((fileName) => {
            const filePath = path.join(sourceDir, fileName);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.log(err);
                    return;
                }

                if (stats.isFile()) {
                    const fileNameWithoutExtension = path.basename(
                        fileName,
                        path.extname(fileName)
                    );
                    const fileSize = stats.size;
                    const fileSizeInKB = fileSize / 1024;
                    const extension = path.extname(fileName).slice(1);

                    console.log(
                        `${fileNameWithoutExtension}-${extension}-${fileSizeInKB}kb`
                    );
                }
            });
        });
    });
});
