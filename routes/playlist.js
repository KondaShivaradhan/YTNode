
const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const { getVideoInfo } = require('../components/CommonFunctions');
const fs = require('fs');
router.get('/', (req, res) => {
    console.log('PlayList');
    let videoUrl = req.query.list_url;
    console.log(videoUrl);
    

    exec(`youtube-dl --flat-playlist --dump-json  ${videoUrl}`, (error, stdout, stderr) => {
        if (error) {
            console.error('Error occurred during download:', error);
            res.status(500).send('Error occurred during download.');
            return;
        }
        console.log('Fetch completed.');
        console.log('stdout:', stdout);
        var jsonStrings = stdout.trim().split('\n');

        var jsonArray = [];

        jsonStrings.forEach(function (jsonStr) {
            var jsonObject = JSON.parse(jsonStr);
            jsonArray.push(jsonObject);
        });
        console.log('fetching done');
        res.send(jsonArray)
    });
 
});

module.exports = router;
