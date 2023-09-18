
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const ytdl = require('ytdl-core');

async function getSongInfo(videoUrl) {
    try {
        const options = {
            quality: 'highestaudio',
        };
        const info = await ytdl.getInfo(videoUrl);

        const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });
        // let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
        console.log('done with GetInfo');
        return {
            vid: videoUrl,
            title: info.videoDetails.title,
            thumb: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
            author: info.videoDetails.author.name,
            duration: info.videoDetails.lengthSeconds,
            url: audioFormat.url
        };

    } catch (error) {
        console.error('Error getting song info:', error.message);
        return null;
    }

}
async function downloader(data) {
    const options = {
        quality: 'highestaudio',
    };
    console.log('in download section');

    ytdl(data.vid, options)
        .pipe(fs.createWriteStream(`./Songs/${data.vid}.mp3`))
        .on('finish', () => {
            console.log('Audio downloaded successfully.');
        })
        .on('error', err => {
            console.error('Error downloading the audio:', err);
        })
    console.log('done with Download');
    return 'check'

}
router.get('/search', async (req, res) => {
    console.log('trying to search');
    const videoUrl = req.query.list_url;
    console.log('====================================');
    console.log(videoUrl);
    console.log('====================================');
    try {
        const response = await fetch(`http://127.0.0.1:8000/search/?list_url=${videoUrl}`);
        if (response.ok) {
            const videoinfo = await response.json();
            // console.log(videoinfo);
            console.log("here after fetch");
            res.send(videoinfo)
        } else {
            console.error('Failed to search:', response.status);
        }
    } catch (error) {
        console.error('Error search:', error);
    }

});
router.get('/downs', async (req, res) => {
    console.log('Song download started.');
    const videoUrl = req.query.video_url;
    console.log(videoUrl);
    try {
        const data = await getSongInfo(videoUrl);
        const temp = await downloader(data);
        console.log(temp)
        // const after = await setMetadata(data);
        console.log('Execution completed successfully!');
        res.send('Done')
    } catch (error) {
        console.error('Error:', error.message);
    }
});
router.get('/stream', async  (req, res) => {
    console.log('trying to stream audio');
    let videoUrl = req.query.video_url; // URL of the YouTube video
    try {
        const response = await fetch(`http://127.0.0.1:8000/getinfo/?video_url=${videoUrl}`);
        if (response.ok) {
            const videoinfo = await response.json();
            // console.log(videoinfo);
            console.log("here after fetch");
            res.send(videoinfo)
        } else {
            console.error('Failed to search:', response.status);
        }
    } catch (error) {
        console.error('Error search:', error);
    }
});
router.get('/sendSong',async(req,res)=>{
    console.log('trying to send the mp3 audio');
    let videoUrl = req.query.video_url; // URL of the YouTube video
    try {
      const mp3FilePath = path.join(__dirname, `../Songs/${videoUrl}.mp3`);
    
      // Check if the file exists
      if (fs.existsSync(mp3FilePath)) {
        const stat = fs.statSync(mp3FilePath);
        
        // Set the response headers
        res.writeHead(200, {
          'Content-Type': 'audio/mpeg',
          'Content-Length': stat.size,
        });
        
        // Stream the MP3 file as the response
        const stream = fs.createReadStream(mp3FilePath);
        stream.pipe(res);
        console.log('song sent');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("MP3 file not found");
      }
        
    } catch (error) {
        console.error('Error send the song:', error);
    }
   
  });
module.exports = router;
