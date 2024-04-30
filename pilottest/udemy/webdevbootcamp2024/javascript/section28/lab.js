let lab_no = "000";
let section;
let testdiv;
//------------------------------------------------------------
// 강의 285
//------------------------------------------------------------
lab_no = 297
section = document.querySelector(`section[lab="${lab_no}"]`);
testdiv = section.querySelector(`.testdiv`);


section.querySelector(".btn1").addEventListener("click", () => {
    const no = 297;

    const req = new XMLHttpRequest();

    req.onload = function () {
        console.log("성공");
        // console.log(this.responseText);
        const data = JSON.parse(this.responseText);
        llog(no,data.name);
        //console.log(data.name);
    }

    req.onerror = function () {
        console.log("오류!!");
        //console.log(this);
        llog(no,this);
        //console.log(data.n
    }

    req.open("GET", "https://swapi.py4e.com/api/people/1/");
    req.send();

});

section.querySelector(".btn2").addEventListener("click", async () => {
    const no = 297;
    // fetch("https://swapi.py4e.com/api/people/1/")
    // .then(res => {
    //     return res.json();
    // })
    // .then(data => {
    //     for (const key of Object.keys(data)) llog(297,`${key}: ${data[key]}`);
    // })
    // .catch(e => {
    //     llog(no,`error, ${e}`);
    // });
    try
    {
        const res = await fetch("https://swapi.py4e.com/api/people/3/");
        const data = await res.json();
        for (const key of Object.keys(data)) llog(297,`${key}: ${data[key]}`);
    }
    catch (e)
    {
        for (const key of Object.keys(e)) llog(297,`${key}: ${data[key]}`);
    }
});

section.querySelector(".btn3").addEventListener("click", async () => {
    const no = 297;

    try
    {
        const res = await axios.get("https://swapi.py4e.com/api/people/4a/");

        //debugger;
        const data = await res.data;
        for (const key of Object.keys(data)) llog(297,`${key}: ${data[key]}`);
    }
    catch (e)
    {
        // for (const key of Object.keys(e)) llog(297,`${key}: ${data[key]}`);
    }
});

section.querySelector(".btn4").addEventListener("click", async () => {
    const no = 297;

    try
    {
        const config = {headers: {Accept: "application/json"}}
        const res = await axios.get("https://icanhazdadjoke.com/", config);

        //debugger;
        const data = res.data;
        for (const key of Object.keys(data))
        {
            if (key === "joke")
            llog(297,`${key}: ${data[key]}`);
        }
    }
    catch (e)
    {
        // for (const key of Object.keys(e)) llog(297,`${key}: ${data[key]}`);
    }
});

// section.querySelector(".btn4").addEventListener("click", async () => {
//     const no = 297;

//     try
//     {
//         const config = {headers: {Accept: "application/json"}}
//         const res = await axios.get("https://icanhazdadjoke.com/", config);

//         //debugger;
//         const data = await res.data;
//         for (const key of Object.keys(data))
//         {
//             if (key === "joke")
//             llog(297,`${key}: ${data[key]}`);
//         }
//     }
//     catch (e)
//     {
//         // for (const key of Object.keys(e)) llog(297,`${key}: ${data[key]}`);
//     }
// });



function llog(no, msg) {
    const testdiv = document.querySelector(`section[lab="${no}"]`).querySelector(`.testdiv`);
    const divText = testdiv.innerHTML;
    testdiv.innerHTML = divText + `<li>${msg}</li>`;
}

const form = document.querySelector("#searchForm");
form.addEventListener("submit", async (e) => {

    const no = 301;
    e.preventDefault();
    const sTerm = form.elements.title.value;
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${sTerm}`);
    const data = res.data[0].show.image.medium;
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = data;
    li.appendChild(img);

    const testdiv = document.querySelector(`section[lab="${no}"]`).querySelector(`.testdiv`);

    testdiv.appendChild(li);


    debugger;
    // 

    
});