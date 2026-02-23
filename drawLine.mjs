export function drawLine(cells) {
    var elem = cells[0];
    var elem1 = cells[1];
    var elem2 = cells[2];
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
    var width = Math.sqrt(Math.pow(rect2.x - rect.x, 2) + Math.pow(rect2.y - rect.y, 2)) +
        rect.width / 2; //+"px";
    var first_center = {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
    };
    var last_center = {
        x: rect1.x + rect1.width / 2,
        y: rect1.y + rect1.height / 2,
    };
    var angle = Math.atan(slope) * (180 / Math.PI);
    strok.style.transform = "rotate(".concat(angle, "deg)");
    strok.style.display = "block";
    var steps = 50; // Duration of the animation in milliseconds
    var _loop_1 = function (i) {
        setTimeout(function () {
            strok.style.width = Math.min((i * width) / steps, width) + "px";
            strok.style.top = rect1.y + rect1.height / 2 - 5 + "px";
            strok.style.left =
                rect1.x + rect1.width / 2 - parseInt(strok.style.width) / 2 + "px";
        }, i * 10);
    };
    for (var i = 0; i < steps + 1; i++) {
        _loop_1(i);
    }
}
