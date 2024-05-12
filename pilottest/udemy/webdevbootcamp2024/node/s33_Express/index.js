const express = require("express");
const app = express();
//console.dir(app);

// app.get('/', (req, res) => {
//     res.send('Hello World')
// });

app.get('/r/:subreddit', (req,res) => {
    //console.log(req.params);
    // 두개의 차이가 뭘까
    
    /*
        코드에서 subreddit과 subreddit2의 차이는 다음과 같습니다:

        const { subreddit } = req.params;
        이 구문은 **구조 분해 할당 (destructuring assignment)**을 사용하여 req.params 객체에서 subreddit 속성을 추출하고, 그 값을 subreddit이라는 새로운 변수에 할당합니다.
        이 경우, subreddit 변수는 req.params.subreddit의 값만을 가지게 됩니다.
        const subreddit2 = req.params; 이 구문은 req.params 객체 전체를 subreddit2라는 새로운 변수에 할당합니다.
        따라서 subreddit2 변수는 subreddit 속성 뿐만 아니라 req.params에 있는 모든 속성을 가지게 됩니다.

        결과적으로, res.send()에서 ${subreddit}은 req.params 객체의 subreddit 속성의 값을 문자열로 표시할 것이고,
        ${subreddit2}는 req.params 객체 전체를 문자열로 변환하여 표시할 것입니다. 객체를 문자열로 변환하면 [object Object]와 같은 형태로 출력될 수 있으므로,
        예상치 못한 결과를 얻을 수 있습니다. 올바른 사용을 위해서는 객체의 특정 속성을 명시적으로 참조해야 합니다. 예를 들어, subreddit2.subreddit과 같이 사용할 수 있습니다.
    */
    // 아 그럼 아래 내용은
    /*
        const temp = req.params;
        const subreddit = temp.subreddit;
        와 결과가 같겠군요
        바로 테스트 해봄
    */
    const { subreddit } = req.params;
    const temp = req.params;
    const subreddit2 = temp.subreddit;
    res.send(`<h1>Browsing the ${subreddit}, ${subreddit2}`);

});

app.get('/r/:subreddit/:postId', (req,res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Browsing the ${subreddit}, ${postId}`);

});

app.get('/search', (req,res) => {
    //const { subreddit, postId } = req.params;
    //res.send(`<h1>Browsing the ${subreddit}, ${postId}`);
    //console.log(req.query);
    const {q} = req.query;
    if (!q) {
        res.send("oops not found");
    }
    res.send(`hi! ${q}`);
});

app.get('/', (req, res) => {
    res.send(`Welcome to the home page!2`);
});

// app.use((req, res) => {
//     console.log("WE GOT A NEW REQUEST!!");
//     console.dir(req);
//     res.send("Hello!");
// });


const port = 8080;

app.listen(port, () => {
    console.log(`LISTENING OF PORT ${port}`);
});