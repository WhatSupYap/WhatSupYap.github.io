let cp_no;
let section;
//------------------------------------------------------------
// 코딩연습 mq1
//------------------------------------------------------------

const fakeConnection = async () => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            throw {flag: "e", msg: `Connection Timeout :(`, delay: delay};
        }
        else {
            return {flag: "s", msg: `Connection Succed :)`, delay: delay};
        }
    }, delay)

    
}


function divlog(div, msg) {
    debugger;
    const divText = div.innerHTML;
    div.innerHTML = divText + `<br>${msg}`;
}

document.querySelector("#btnMq1").addEventListener("click", async () => {
    
    const div = document.querySelector("divMq1");

    const connectionResult = await fakeConnection();

    divlog(div, connectionResult.msg);



});