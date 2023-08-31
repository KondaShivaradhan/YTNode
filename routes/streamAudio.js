const express = require('express');
const router = express.Router();
const fs = require('fs');
const { spawn } = require('child_process');
const ffmpeg = require('fluent-ffmpeg');

router.get('/', async  (req, res) => {
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

module.exports = router;
