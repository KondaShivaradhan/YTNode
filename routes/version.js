
const express = require('express');
const { Octokit } = require('@octokit/rest')
const octokit = new Octokit();

const router = express.Router();
var SavedVersions = []
async function getVersions() {
    console.log('came to get versions');
    return octokit.repos.listReleases({
        owner: 'KondaShivaradhan',
        repo: 'YtMusic'
    }).then(({ data }) => {
        var finalSend = []
        data.forEach(r => {
            var temp = {
                tag_name: r.tag_name,
                name: r.name,
                body: r.body,
                download_count: r.assets[0].download_count,
                link: r.assets[0].browser_download_url
            }

            finalSend.push(temp)
        })
        // console.log(finalSend);
        return finalSend
    }).catch(error => {
        console.error('Error fetching releases:', error);

    });

}
router.get('/', (req, res) => {
    if (SavedVersions.length == 0) {
        console.log('Saved isnt there ');
        getVersions().then(result => {
            SavedVersions = result.slice().reverse()
            res.send(SavedVersions)
        })
    }
    else {
        console.log('sending saved versions');
        res.send(SavedVersions)
    }
});
router.get('/update', (req, res) => {
    console.log('Updating Fetching Versions');
    getVersions().then(result => {
        SavedVersions = result.slice().reverse()
        res.send(SavedVersions)
    })
});
module.exports = router;
