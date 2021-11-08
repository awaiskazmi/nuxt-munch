var indexStart = 0;
var indexEnd = 172;
var loadedFrames = 0;
var w = window;
var images = [];
var scrollHeight = 0;
var frame = 0;
var imageFrame = document.getElementById("img-frame");
var categoriesOffset = document.getElementById("categories").offsetTop;
var howHungryDiv = document.getElementById("how-hungry-title-wrapper");
var howHungryTitle = document.getElementById("how-hungry-title");
var lazyLoadWrapper = document.getElementById("lazy-load-stuff");
var s;
var sLoaded = false;

// initial
for (i = indexStart; i <= indexEnd; i++) {
  // load frames for later use
  let img = new Image();
  img.src = `/landing/frames/frame-${i}.jpg`;
  img.onload = function () {
    images.push(img);
    loadedFrames++;
    // if 10 frames loaded, enable page
    if (loadedFrames > 10 && !sLoaded) {
      console.log('...SKROLLR LOADED ONCE...', howHungryTitle.clientWidth + ' HEIGHT OF WIDTH');
      howHungryDiv.style.height = howHungryTitle.clientWidth + "px";
      initSkrollr();
      sLoaded = true;
    }
  };
}

function initSkrollr() {
  document.querySelector(".loading").classList.add("done");
  document.body.classList.add("landing-loaded");
  // initialize skrollr
  s = skrollr.init({
    forceHeight: false,
    smoothScrolling: false,
    keyframe: function (element, name, direction) {
      if (name == "dataTop" && direction == "down") {
        document.getElementById("fixed-above-frame").style.display = "none";
        document.getElementById("img-frame").style.display = "none";
        document.getElementById("headline-text").style.display = "none";
        document.getElementById("scroll-indicator").style.display = "none";
      }
      if (name == "dataTop" && direction == "up") {
        document.getElementById("fixed-above-frame").style.display =
          "block";
        document.getElementById("img-frame").style.display = "block";
        document.getElementById("headline-text").style.display = "block";
        document.getElementById("scroll-indicator").style.display = "block";
      }
    },
  });
}

// onload
w.onload = function () {
  scrollHeight = document.body.scrollHeight - window.innerHeight;
  s.refresh();
  console.log("...window load complete...");
};

// load videos in bg
// for (i = 0; i < 7; i++) {
//   let vdo = document.createElement("video");
//   let winWidth = window.innerWidth;
//   let userAgent = winWidth > 769 ? "web" : "mobile";

//   vdo.src = `/landing/gifs/${userAgent}/${i}.mp4`;
//   vdo.muted = true;
//   vdo.autoplay = true;
//   vdo.loop = true;
//   lazyLoadWrapper.appendChild(vdo);

//   vdo.play();
// }