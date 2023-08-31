const express = require('express');
const path = require('path');
const app = express();
const playRouter = require('./routes/playlist'); 
const HomeRouter = require('./routes/GetHome');
const VersionRouter = require('./routes/version');
const SongRouter = require('./routes/song');
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use((req, res, next) => {

  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.get('/', (req,res)=>{
  res.send('im alive')
});
app.use('/playL',playRouter)
app.use('/getHome',HomeRouter)
app.use('/version',VersionRouter)
app.use('/song',SongRouter)
app.listen(3002, () => {
  console.log('Server is running on port 3002');
});