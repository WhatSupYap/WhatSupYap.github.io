const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const redditData = require('./data.json');

app.set('view engine', 'ejs');
/* 
    __dirname 혹은 소스가 있는 디렉토리
    path.join을 쓰는 이유는 node, nodemon을 상위 경로에서 실행할 수 있기 때문
    예) node /s34_dynamicHTML/index.js    
*/
app.set('views', path.join(__dirname, '/views'));

app.get('/cats', (req, res) => {
    const cats = 
    [
        'blue', '애용이', '다옹이', '나비', '오리'
    ]
    res.render('cats', { cats});
    //res.render('cats', { allCats: cats});
})


app.get('/', (req, res) => {
    //res.send(`HI! ${__dirname}`)
    //const num = Math.floor(Math.random() * 10) + 1;
    res.render('home');
});

app.get('/rand', (req, res) => {
    //res.send(`HI! ${__dirname}`)
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand: num, title: 'random', name: 'random' });
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data});
    }
    else
    {
        res.render('notfound', { subreddit});
    }
    
    //res.render('subreddit', {subreddit});
});
// 그것
app.use(express.static(path.join(__dirname, 'static')));


app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`);
});