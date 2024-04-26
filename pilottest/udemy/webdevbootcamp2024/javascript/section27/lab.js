let lab_no = "000";
let section;
//------------------------------------------------------------
// 강의 285
//------------------------------------------------------------
lab_no = 285
section = document.querySelector(`section[lab="${lab_no}"]`);

const rainbowing285 = (color) => {
    const div = document.querySelector("#div285");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            changeColor(div, color);
            resolve();
        }, 1000);

    });
}

section.querySelector(`#btn${lab_no}`).addEventListener("click", async () => {

    rainbowing285('red');
    rainbowing285('orange');

});


section.querySelector(`#btn${lab_no}_2`).addEventListener("click", async () => {
    await rainbowing285('red');
    await rainbowing285('orange');
    await rainbowing285('yellow');
    await rainbowing285('green');
    await rainbowing285('skyblue');
    await rainbowing285('blue');
    await rainbowing285('purple');
});

//rainbowing285('red');
//rainbowing285('orange');


//------------------------------------------------------------
// 강의 281
//------------------------------------------------------------
lab_no = 281
section = document.querySelector(`section[lab="${lab_no}"]`);

const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure(`Connection Timeout :(`);
        }
        else {
            success(`Here is your fake data from ${url}`);
        }

    }, delay);
}

const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4500) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject(`Connection Timeout :(`);
            }
            else {
                resolve(`Here is your fake data from ${url}`);
            }

        }, delay);
    });
}

function divlog(div, msg) {
    const divText = div.innerHTML;
    div.innerHTML = divText + `<br>${msg}`;
}

function l281log(msg) {
    const div281 = document.querySelector("#div281");
    const div281Text = div281.innerHTML;
    div281.innerHTML = div281Text + `<br>${msg}`;
}

section.querySelector("#btn281_3").addEventListener("click", () => {
    l281log("시작");
    const req = fakeRequestPromise("holyshit.com");
    req
    .then((data) => {
        l281log("오예! 프로미스!");
        l281log(data);
        return fakeRequestPromise("holyshit.com");
    })
    .then((data) => {
        l281log("오예! 프로미스! 2");
        l281log(data);
        return fakeRequestPromise("holyshit.com");
    })
    .then((data) => {
        l281log("오예! 프로미스! 3");
        l281log(data);
        return fakeRequestPromise("holyshit.com");
    })
    .then((data) => {
        l281log("오예! 프로미스! 4");
        l281log(data);
    })
    .catch(() => l281log("실패 :("))
});

section.querySelector("#btn281_2").addEventListener("click", () => {
    l281log("시작");
    const req = fakeRequestPromise("holyshit.com");
    req
        .then(() => {
            l281log("오예! 프로미스!");
            fakeRequestPromise("holyshit.com")
                .then(() => {
                    l281log("오예! 프로미스! 2");
                })
                .catch(() => l281log("실패 :( 2"))

        })
        .catch(() => l281log("실패 :("))
});


section.querySelector("#btn281").addEventListener("click", () => {

    fakeRequestCallback("goodidea.com",
        function (response) {
            l281log("됐다!");
            l281log(response);
            fakeRequestCallback("goodidea2.com",
                function (response) {
                    l281log("또 됐다!");
                    l281log(response);
                    fakeRequestCallback("goodidea3.com",
                        function (response) {
                            l281log("또 또 됐다!");
                            l281log(response);
                        },
                        function (err) {
                            l281log("또 또 안됐다!", err);
                        }
                    );
                },
                function (err) {
                    l281log("또 안됐다!", err);
                }
            );
        },
        function (err) {
            l281log("안됐다!");
            l281log(err);
        }
    );

});




//------------------------------------------------------------
// 강의 280
//------------------------------------------------------------
lab_no = 280
section = document.querySelector(`section[lab="${lab_no}"]`);
const div280 = section.querySelector("#div280");

const changeColor = (div, color) => {
    div.style.backgroundColor = color;
}

const rainbowing = (color) => {
    // const div = document.querySelector("#div280");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            changeColor(div280, color);
            resolve();
        }, 1000);

    });


}


document.querySelector("#btn280_3").addEventListener("click", () => {
    // rainbowing('red')
    // .then(() => {
    //     return rainbowing('orange');
    // })
    // .then(() => {
    //     return rainbowing('yellow');
    // })
    // .then(() => {
    //     return rainbowing('green');
    // })
    // .then(() => {
    //     return rainbowing('skyblue');
    // })
    // .then(() => {
    //     return rainbowing('blue');
    // })
    // .then(() => {
    //     return rainbowing('purple');
    // })
    rainbowing('red')
    .then(() => rainbowing('orange'))
    .then(() => rainbowing('yellow'))
    .then(() => rainbowing('green'))
    .then(() => rainbowing('skyblue'))
    .then(() => rainbowing('blue'))
    .then(() => rainbowing('purple'))
});


section.querySelector("#btn280").addEventListener("click", () => {
    setTimeout(() => {
        changeColor(div280, 'red');
        setTimeout(() => {
            changeColor(div280, 'orange');
            setTimeout(() => {
                changeColor(div280, 'yellow');
                setTimeout(() => {
                    changeColor(div280, 'green');
                    setTimeout(() => {
                        changeColor(div280, 'skyblue');
                        setTimeout(() => {
                            changeColor(div280, 'blue');
                            setTimeout(() => {
                                changeColor(div280, 'purple');
                                setTimeout(() => {
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    });
});

const changeColor2 = (div, delay, color, doNext) => {
    setTimeout(() => {
        div.style.backgroundColor = color;
        doNext && doNext();
    }, delay);
}

section.querySelector("#btn280_2").addEventListener("click", () => {
    changeColor2(div280, 1000, 'red', () => {
        changeColor2(div280, 1000, 'orange', () => {
            changeColor2(div280, 1000, 'yellow', () => {
                changeColor2(div280, 1000, 'green', () => {
                    changeColor2(div280, 1000, 'skyblue', () => {
                        changeColor2(div280, 1000, 'blue', () => {
                            changeColor2(div280, 1000, 'purple', () => {
                            });
                        });
                    });
                });
            });
        });

    });

});


//------------------------------------------------------------
// 강의 278
//------------------------------------------------------------
lab_no = 278
section = document.querySelector(`section[lab="${lab_no}"]`);


/*
const multiply = (x, y) => x * y;
// const multiply = (x, y) => { console.log(`const multiply = (${x}, ${y}) => ${x} * ${y}`); return x * y; }

const square = (x) => multiply(x, x);
// const square = (x) => { console.log(`const square = (${x}) => multiply(${x}, ${x});`); return multiply(x, x); }

const isRightTriangle = (a, b, c) => { return square(a) + square(b) === square(c); };

isRightTriangle(2,3,4);
*/