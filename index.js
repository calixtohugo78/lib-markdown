import chalk from 'chalk';
import fs from 'fs';


function treatError(error) {

    throw new Error(chalk.red(error))

}

function extractLinks(text) {

    const regEx = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayResult = [];
    let temp;

    while ((temp = regEx.exec(text)) !== null) {

        arrayResult.push({
            [temp[1]]: temp[2]
        })

    }

    return arrayResult.length === 0 ? "No links found!" : arrayResult;

}


// async / await

async function catchFile(filePath) {

    const encoding = 'utf-8';

    try {

        const response = await fs.promises.readFile(filePath, encoding);
        return extractLinks(response);

    } catch (error) {

        treatError(error)

    }

}

//then and catch

/* function catchFile(filePath) {

    const encoding = 'utf-8';

    fs.promises.readFile(filePath, encoding)
        .then((response) => {
            console.log(chalk.green(response))
        })
        .catch((error) => treatError(error))

} */

export default catchFile;