import fetch from 'node-fetch';

export default async (url) => {
    const imageUrlData = await fetch(url);
    const buffer = await imageUrlData.arrayBuffer();
    const stringifiedBuffer = Buffer.from(buffer).toString('base64');
    const contentType = imageUrlData.headers.get('content-type');
    return `data:${contentType};base64,${stringifiedBuffer}`;
}