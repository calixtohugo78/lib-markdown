import chalk from 'chalk';
import catchFile from './index.js';
import validateURLs from './http-validation.js';

const path = process.argv;

async function processText(filePath) {

    const result = await catchFile(filePath[2]);

    if(filePath[3] === "validate") {
        console.log(chalk.green("Validate Links:"), await validateURLs(result));
    } else {
        console.log(chalk.yellow("Links list: "), result);
    }

}

processText(path);