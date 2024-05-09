const express = require("express");
const app = express();
//console.dir(app);

// app.get('/', (req, res) => {
//     res.send('Hello World')
// });

app.use((req, res) => {
    console.log("WE GOT A NEW REQUEST!!");
    console.dir(req);
    res.send("Hello!");
});


const port = 8080;

app.listen(port, () => {
    console.log(`LISTENING OF PORT ${port}`);
});