document.addEventListener("DOMContentLoaded", function () {
    const today = document.querySelector("today");

    if (xIsEmpty(today)) return;

    const year = today.getAttribute("year");
    const month = today.getAttribute("month");
    const day = today.getAttribute("day");

    if (xIsEmpty(year) || xIsEmpty(month) || xIsEmpty(day)) return;

    document.title += " > " + year + "" + month + "" + day;

});