import fetch from 'node-fetch';

export default async function validateURLs(arrayLinks) {

    const links = generateArrURLs(arrayLinks);
    const statusLinks = await checkStatus(links);

    // spread = operador de espalhamento
    const results = arrayLinks.map((item, index) => (
        {
            ...item,
            status: statusLinks[index]
        }
    ))

    return results;
}

async function checkStatus(arrayURLs) {

    try {

        // Promisses / Async Await
        const arrayStatus = await Promise
            .all(arrayURLs.map(async (url) => {
    
                const res = await fetch(url)
                return res.status;
    
            }));
        return arrayStatus;

    } catch( error ) {
        handleErrors(error)
    }


}

function generateArrURLs(arrayLinks) {

    return arrayLinks
        .map(item => Object.values(item).join());

}

function handleErrors(error) {

    throw new Error(error.message);

}