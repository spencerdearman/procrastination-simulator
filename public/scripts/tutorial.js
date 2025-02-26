console.log("fauif");

var height = document.body.clientHeight;
var width = document.body.clientWidth;

var image = document.getElementById("tutorial-image");
var buttonLeft = document.getElementById("tutorial-left");
var buttonRight = document.getElementById("tutorial-right");

function resize() {
  image.style.width = `${width * 0.75 - 40 - buttonLeft.clientWidth * 2}px`;
  image.style.height = "auto";

  if (image.clientHeight > height * 0.75) {
    image.style.height = `${height * 0.75}px`;
    image.style.width = "auto";
  }
}

resize();

window.addEventListener("resize", (event) => {
  height = document.body.clientHeight;
  width = document.body.clientWidth;

  resize();
});

var images = [
  "./images/slide1.png",
  "./images/slide2.png",
  "./images/slide3.png",
  "./images/slide4.png",
];
var idx = 0;

image.setAttribute("src", images[0]);
buttonLeft.disabled = true;

function updateButtonLeft(event) {
  if (idx > 0) {
    idx--;
  }
  updateButtons();
}
function updateButtonRight(event) {
  if (idx < images.length) {
    idx++;
  }
  updateButtons();
}

function updateButtons() {
  if (idx <= 0) buttonLeft.disabled = true;
  else buttonLeft.disabled = false;
  if (idx >= images.length - 1) buttonRight.disabled = true;
  else buttonRight.disabled = false;

  image.setAttribute("src", images[idx]);
  console.log(idx);
}
buttonLeft.addEventListener("click", updateButtonLeft);
buttonRight.addEventListener("click", updateButtonRight);
//buttonLeft.addEventListener("click", updateButtons);
//buttonRight.addEventListener("click", updateButtons);
