const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, './styles');
const distDir = path.join(__dirname, './project-dist');
const outputFile = 'bundle.css';

fs.readdir(stylesDir, (err, files) => {
    if (err) throw err;

    const cssFiles = files.filter((file) => path.extname(file) === '.css');

    Promise.all(
        cssFiles.map((file) => {
            return new Promise((resolve, reject) => {
                fs.readFile(path.join(stylesDir, file), 'utf8', (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
            });
        })
    )
        .then((styles) => {
            fs.writeFile(
                path.join(distDir, outputFile),
                styles.join('\n'),
                (err) => {
                    if (err) throw err;
                    console.log('Styles merged successfully!');
                }
            );
        })
        .catch((err) => {
            throw err;
        });
});
