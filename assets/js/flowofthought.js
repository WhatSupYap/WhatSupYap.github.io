import { init } from "./string.js"; init();


const fotlist = document.querySelectorAll("div.flowofthought");

for (const fot of fotlist) {
    const lines = fot.innerHTML.split("\n");

    let wnasung = ""
    for (const line of lines) {
        let cleanedline = line.trim();
        if (cleanedline.length === 0) continue;
        

        let thisLine = "";
        thisLine += `<blockquote class="a">${line}</blockquote>`;
        wnasung += thisLine;
    }
    fot.innerHTML = wnasung;
}