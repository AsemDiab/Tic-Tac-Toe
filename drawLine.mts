export function drawLine(cells: HTMLDivElement[]) {
  let elem: HTMLDivElement = cells[0];
  let elem1: HTMLDivElement = cells[1];
  let elem2: HTMLDivElement = cells[2];

  let slope =
    (elem2.offsetTop - elem.offsetTop) / (elem2.offsetLeft - elem.offsetLeft);

  let strok = document.querySelector("#storke-line") as HTMLDivElement;

  const rect = {
    x: elem.offsetLeft,
    y: elem.offsetTop,
    width: elem.offsetWidth,
    height: elem.offsetHeight,
  };
  const rect2 = {
    x: elem2.offsetLeft,
    y: elem2.offsetTop,
    width: elem2.offsetWidth,
    height: elem2.offsetHeight,
  };
  const rect1 = {
    x: elem1.offsetLeft,
    y: elem1.offsetTop,
    width: elem1.offsetWidth,
    height: elem1.offsetHeight,
  };

  const width =
    Math.sqrt(Math.pow(rect2.x - rect.x, 2) + Math.pow(rect2.y - rect.y, 2)) +
    rect.width / 2; //+"px";

  const first_center = {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };

  const last_center = {
    x: rect1.x + rect1.width / 2,
    y: rect1.y + rect1.height / 2,
  };

  const angle = Math.atan(slope) * (180 / Math.PI);
  strok.style.transform = `rotate(${angle}deg)`;
  strok.style.display = "block";

  const steps = 50; // Duration of the animation in milliseconds

  for (let i = 0; i < steps + 1; i++) {
    setTimeout(() => {
      strok.style.width = Math.min((i * width) / steps, width) + "px";
      strok.style.top = rect1.y + rect1.height / 2 - 5 + "px";
      strok.style.left =
        rect1.x + rect1.width / 2 - parseInt(strok.style.width) / 2 + "px";
    }, i * 10);
  }
}
