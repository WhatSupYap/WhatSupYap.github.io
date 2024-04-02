document.addEventListener("DOMContentLoaded", function () {
    const head = document.head;
    const css_link = document.createElement('link');
    css_link.setAttribute("rel","stylesheet");
    css_link.setAttribute("href","/assets/css/nav.css");
    head.appendChild(css_link);

    const body = document.body;

    // <nav> 요소 생성
    const navElement = document.createElement('nav');
    navElement.setAttribute("id","topbar")
    const ulElement = document.createElement("ul");
    const liElement = document.createElement("li");
    const aElement = document.createElement("a");
    aElement.href = "/";
    aElement.textContent = "HOME";
    liElement.appendChild(aElement);
    ulElement.appendChild(liElement);
    navElement.appendChild(ulElement);
    // <body> 요소의 첫 번째 자식으로 <nav> 요소 추가
    body.insertBefore(navElement, document.body.firstChild);
});