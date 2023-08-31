
const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const { getVideoInfo } = require('../components/CommonFunctions');
const fs = require('fs');
router.get('/', (req, res) => {
    console.log('Fetching Song information');
    const videoUrl = req.query.video_url;
    const info = getVideoInfo(videoUrl)
    res.send(info)
});

module.exports = router;
