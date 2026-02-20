function drawLine(cells) {
    var elem = cells[0];
    var elem1 = cells[1];
    var elem2 = cells[2];
    console.log(elem);
    console.log(elem1);
    console.log(elem2);
    var slope = (elem2.offsetTop - elem.offsetTop) / (elem2.offsetLeft - elem.offsetLeft);
    var strok = document.querySelector("#storke-line");
    var rect = {
        x: elem.offsetLeft,
        y: elem.offsetTop,
        width: elem.offsetWidth,
        height: elem.offsetHeight,
    };
    var rect2 = {
        x: elem2.offsetLeft,
        y: elem2.offsetTop,
        width: elem2.offsetWidth,
        height: elem2.offsetHeight,
    };
    var rect1 = {
        x: elem1.offsetLeft,
        y: elem1.offsetTop,
        width: elem1.offsetWidth,
        height: elem1.offsetHeight,
    };
    strok.style.width =
        Math.sqrt(Math.pow(rect2.x - rect.x, 2) + Math.pow(rect2.y - rect.y, 2)) +
            rect.width / 2 +
            "px";
    strok.style.top = rect1.y + rect1.height / 2 - 5 + "px";
    strok.style.left =
        rect1.x + rect1.width / 2 - parseInt(strok.style.width) / 2 + "px";
    console.log("slope: ".concat(slope, " width: ").concat(strok.style.width, " top: ").concat(strok.style.top, " left: ").concat(strok.style.left));
    var angle = Math.atan(slope) * (180 / Math.PI);
    strok.style.transform = "rotate(".concat(angle, "deg)");
    strok.style.display = "block";
    console.log(cells);
    console.log("line drawn");
}
