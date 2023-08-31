
const express = require('express');
const path = require('path')
const router = express.Router();
const { exec } = require('child_process');
const { getVideoInfo } = require('../components/CommonFunctions');
var MongoClient = require('mongodb').MongoClient;
async function fetchDocumentByVid(vid) {
    const url = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

    const dbName = 'YtMusic';
    const collectionName = 'allSongs';

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("YtMusic");
        dbo.collection("allSongs").findOne({ vid }, function (err, result) {
            if (err) throw err;
            console.log(result.name);
            db.close();
        });
    });
}
const fs = require('fs');
const { db } = require('../components/firebase');

router.get('/', async (req, res) => {
    console.log('Song download started.');
    const videoUrl = req.query.video_url;
    console.log(videoUrl);
    let sampleurl = `https://music.youtube.com/watch?v=${videoUrl}`
    const fs = require('fs');
    const ytdl = require('ytdl-core');

    const options = {
        root: path.join(__dirname),
      };
     const fileName = '/YTmusic/Songs/5XthUghC2Po.mp3'; // Replace with the path to your MP3 file
      res.setHeader('Content-Type', 'audio/mp3');
    //   res.setHeader('Content-Disposition', 'attachment; filename="audiofile.mp3"');
      const absoluteFilePath = path.resolve(__dirname, fileName);
      console.log(absoluteFilePath)
      // Send the audio file as the response
      res.sendFile(absoluteFilePath, (err) => {
        if (err) {
          console.error('Error sending audio file:', err);
        } else {
          console.log('Audio file sent successfully.');
        }
      });
    
   
});

module.exports = router;
