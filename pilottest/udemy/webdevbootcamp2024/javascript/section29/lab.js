let lab_no = "000";
let section;
let testdiv;
String.prototype.left = function (length) { if (this.length <= length) return this; else return this.substring(0, length); }
String.prototype.right = function (length) { if (this.length <= length) return this; else return this.substring(this.length - length, this.length); }

//------------------------------------------------------------
// 강의 304
//------------------------------------------------------------
lab_no = 304
section = document.querySelector(`section[lab="${lab_no}"]`);
testdiv = section.querySelector(`.testdiv`);

class Color {
	constructor(name, r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.name = name;
	}
	innerRGB() {
		const { r, g, b } = this;
		return `${r}, ${g}, ${b}`;
	}
	rgb() {
		return `rgb(${this.innerRGB()})`;
	}
	rgba(a = 1.0) {
		return `rgba(${this.innerRGB()}, ${a})`;
	}
	hex() {
		const { r, g, b } = this;
		return (
			'#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
		);
	}
}


const colorMage = new Color('Mage', ...[63, 199, 235]);
const colorMonk = new Color('Monk', ...[0, 255, 152]);

function test1(a) {
    this.a = a;
}

function test2(a) {
    const t = {a}
    this.a = a;
    return t;
}


// Mage: { name : "Mage", color: new classColor(63, 199, 235) }
// Monk: { name : "Monk", color: new classColor(0, 255, 152) }

//------------------------------------------------------------
// 강의 303
//------------------------------------------------------------
lab_no = 303
section = document.querySelector(`section[lab="${lab_no}"]`);
testdiv = section.querySelector(`.testdiv`);



section.querySelector(".btn1").addEventListener("click", () => {
    const textbox = section.querySelector(`input[type="text"]`);

    let val = textbox.value;
    if(3 < textbox.value.length) val = textbox.value.left(3);
    
    llog(303,val);

});

section.querySelector(".btn2").addEventListener("click", () => {
    const textbox = section.querySelector(`input[type="text"]`);

    let val = textbox.value;
    if(3 < textbox.value.length) val = textbox.value.right(3);
    
    llog(303,val);

});


function llog(no, msg) {
    const testdiv = document.querySelector(`section[lab="${no}"]`).querySelector(`.testdiv`);
    const divText = testdiv.innerHTML;
    testdiv.innerHTML = divText + `<li>${msg}</li>`;
}


