const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set('view engine', 'ejs');
// __dirname 혹은 소스가 있는 디렉토리
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    //res.send(`HI! ${__dirname}`)
    //const num = Math.floor(Math.random() * 10) + 1;
    res.render('home');
});

app.get('/rand', (req, res) => {
    //res.send(`HI! ${__dirname}`)
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand: num });
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.render('subreddit', {subreddit});
});

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`);
});