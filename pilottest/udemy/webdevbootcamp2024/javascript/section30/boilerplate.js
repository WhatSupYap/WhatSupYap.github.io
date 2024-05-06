const fs = require('fs');
const folderName = process.argv[2] || 'Project'
//console.log(fs);

// fs.mkdir('Dogs', {recursive: true}, (err) => {
//     console.log("IN THE CALLBACK!!")
//     if(err) throw err;
// });

// fs.mkdirSync("Cats");
// console.log("I COME AFTER MKDIR IN THE FILE!!");
fs.mkdirSync(folderName);
fs.writeFileSync(`${folderName}/index.html`, "<html></html>");
fs.writeFileSync(`${folderName}/app.js`, `console.log("abc")`);
fs.writeFileSync(`${folderName}/style.css`, "123");