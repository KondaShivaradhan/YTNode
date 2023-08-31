const fs = require('fs');
const { execSync } = require('child_process');

function saveJsonToFile(jsonData, filePath) {
    fs.writeFileSync(filePath, jsonData);
}

function getVideoInfo(videoUrl) {
    const infoJson = execSync(`youtube-dl --dump-json ${videoUrl}`).toString();
    const videoInfo = JSON.parse(infoJson);
    // console.log(videoInfo)
    const thumbnail = videoInfo.thumbnail;
    let title = videoInfo.title.split('|')[0].trim();
    const responseData = {
        thumbnail: thumbnail,
        title: title,
        id:videoInfo.id,
    };
    return responseData;
}

module.exports = { saveJsonToFile, getVideoInfo };
