const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send("HI!")
});

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`);
});