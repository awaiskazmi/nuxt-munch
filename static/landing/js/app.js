let indexStart = 0;
let indexEnd = 172;
let loadedFrames = 0;
let w = window;
let images = [];
let scrollHeight = 0;
let frame = 0;
let imageFrame = document.getElementById("img-frame");
let categoriesOffset = document.getElementById("categories").offsetTop;
let howHungryDiv = document.getElementById("how-hungry-title-wrapper");
let howHungryTitle = document.getElementById("how-hungry-title");
let lazyLoadWrapper = document.getElementById("lazy-load-stuff");
let s;

// onload
w.onload = function() {
  scrollHeight = document.body.scrollHeight - window.innerHeight;
  s.refresh();
  console.log("...refreshed...");
};

// initial
for (i = indexStart; i <= indexEnd; i++) {
  // load frames for later use
  let img = new Image();
  img.src = `/landing/frames/frame-${i}.jpg`;
  img.width = 1920;
  img.height = 1080;
  img.onload = function() {
    images.push(img);
    loadedFrames++;
    // if 64 frames loaded, enable page
    if (loadedFrames >= 64) {
      howHungryDiv.style.height = howHungryTitle.clientWidth + "px";
      document.querySelector(".loading").classList.add("done");
      // initialize skrollr
      s = skrollr.init({
        forceHeight: false,
        smoothScrolling: false,
        keyframe: function(element, name, direction) {
          console.log(name, direction);
          if (name == "dataTop" && direction == "down") {
            document.getElementById("fixed-above-frame").style.display = "none";
          }
          if (name == "dataTop" && direction == "up") {
            document.getElementById("fixed-above-frame").style.display =
              "block";
          }
        },
      });
    }
  };
}

// load videos in bg
for (i = 0; i < 7; i++) {
  let vdo = document.createElement("video");
  let winWidth = window.innerWidth;
  let userAgent = winWidth > 769 ? "web" : "mobile";

  vdo.src = `/landing/gifs/${userAgent}/${i}.mp4`;
  vdo.muted = true;
  vdo.autoplay = true;
  vdo.loop = true;
  lazyLoadWrapper.appendChild(vdo);

  vdo.play();
}

function preventDefault(e) {
  e.preventDefault();
}

var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function() {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;

var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// disable mousewheel scroll
// window.addEventListener('touchmove', handleScroll, wheelOpt); // mobile
// window.addEventListener('DOMMouseScroll', handleScroll, false); // older FF
// window.addEventListener(wheelEvent, handleScroll, wheelOpt); // modern desktop

window.onscroll = handleScroll;

function handleScroll(e) {
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  // var top = window.pageYOffset + window.innerHeight;

  // let factor = images.length / scrollHeight;
  let factor = images.length / categoriesOffset;
  // let factor = totalImages / categoriesOffset;
  let frame = Math.floor(top * factor);

  let direction = e.deltaY > 0 ? "down" : "up";
  direction == "down" ? frame++ : frame--;
  if (frame >= images.length - 1) {
    frame = images.length - 1;
  }
  if (frame < 0) {
    frame = 0;
  }
  let newUrl = `url('${window.location.origin}/frames/frame-${frame}.jpg`;
  // console.log(frame, newUrl);
  // imageFrame.style.backgroundImage = newUrl;
  // drawImageProp(ctx, images[frame]);
}

// resize
w.onresize = function() {
  // c.width = window.innerWidth;
  // c.height = window.innerHeight;
  s.refresh();

  // drawImageProp(ctx, images[frame]);
};
