const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('trying to search');
    try {
        const response = await fetch(`http://127.0.0.1:8000/getHome/`);
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
