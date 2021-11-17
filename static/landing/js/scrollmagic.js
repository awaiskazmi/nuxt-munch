// INIT

const categoriesOffset = document.getElementById('categories').offsetTop;
const canvas = document.getElementById('img-canvas')
const controller = new ScrollMagic.Controller();
const imgPath = './frames/frame-';
console.log(categoriesOffset);

// Preload all frames
for (i = 0; i <= 172; i++) {
  let img = new Image();
  img.src = imgPath + i + '.jpg';
}

window.onscroll = () => {
  let scrollPosition = window.scrollY;
  let factor = Math.floor(scrollPosition / categoriesOffset * 172);
  if (factor > 172) {
    factor = 172;
  }
  canvas.src = imgPath + Math.floor(factor) + '.jpg'
}





// HERO HEADINGS

const tweenTitleOne = new TimelineLite();
const tweenTitleTwo = new TimelineLite();
const tweenTitleThree = new TimelineLite();

tweenTitleOne.from('.title-one', 1, {
  autoAlpha: 0,
  yPercent: 20
}).to('.title-one', 2, {
  autoAlpha: 1, yPercent: 0
}).to('.title-one', 1, {
  autoAlpha: 0, yPercent: -10
})
tweenTitleTwo.from('.title-two', 1, {
  autoAlpha: 0,
  yPercent: 20
}).to('.title-two', 2, {
  autoAlpha: 1, yPercent: 0
}).to('.title-two', 1, {
  autoAlpha: 0, yPercent: -10
})
tweenTitleThree.from('.title-three', 1, {
  autoAlpha: 0,
  yPercent: 20
}).to('.title-three', 2, {
  autoAlpha: 1, yPercent: 0
})

const sceneHeadingOne = new ScrollMagic.Scene({
  triggerElement: "[data-trigger='title-one']",
  duration: 750,
  triggerHook: 1
})
  .setTween(tweenTitleOne)
  // .addIndicators()
  // .setPin("[data-trigger='title-one']")
  .addTo(controller)
const sceneHeadingTwo = new ScrollMagic.Scene({
  triggerElement: "[data-trigger='title-two']",
  duration: 750,
  triggerHook: 1
})
  .setTween(tweenTitleTwo)
  // .addIndicators()
  // .setPin("[data-trigger='title-two']")
  .addTo(controller)
const sceneHeadingThree = new ScrollMagic.Scene({
  triggerElement: "[data-trigger='title-three']",
  duration: 750,
  triggerHook: 1
})
  .setTween(tweenTitleThree)
  // .addIndicators()
  // .setPin("[data-trigger='title-three']")
  .addTo(controller)





// NAVBAR LOGO AND TEXT

const tweenLogoAndText = new TimelineLite();
tweenLogoAndText.to('.nav-logo', 1, {
  width: 128, top: '2rem'
}).to('.hero-text', 1, {
  autoAlpha: 0,
  y: -150
}, 0)

const sceneLogo = new ScrollMagic.Scene({
  triggerElement: "[data-trigger='logo']",
  duration: 1000,
  triggerHook: 0
})
  .setTween(tweenLogoAndText)
  // .addIndicators()
  // .setPin("[data-trigger='logo']")
  .addTo(controller)





// CATEGORY NAMES

// const categoryHeight = 132;

// const tweenCategoryNames = new TimelineLite();
// tweenCategoryNames
//   .to("#category-names", 1, {
//     // y: -categoryHeight,
//     className: "category-one"
//   })
//   .to("#category-names", 1, {
//     // y: -categoryHeight * 2,
//     className: "category-two"
//   })
//   .to("#category-names", 1, {
//     // y: -categoryHeight * 3,
//     className: "category-three"
//   })
//   .to("#category-names", 1, {
//     // y: -categoryHeight * 4,
//     className: "category-four"
//   })
//   .to("#category-names", 1, {
//     // y: -categoryHeight * 5,
//     className: "category-five"
//   })
//   .to("#category-names", 1, {
//     // y: -categoryHeight * 6,
//     className: "category-six"
//   })
//   .to("#category-names", 1, {
//     // y: -categoryHeight * 7,
//     className: "category-seven"
//   })
//   .to("#category-names", 1, {
//     // y: -categoryHeight * 8,
//     className: "category-eight"
//   })
//   .to("#categories", 0, {
//     className: "categories-bottom"
//   })

// const sceneCategoryIceCream = new ScrollMagic.Scene({
//   triggerElement: "#category-names",
//   duration: 9000,
//   triggerHook: 0.4,
// })
//   .setTween(tweenCategoryNames)
// .addIndicators()
//   .setPin("#category-names", { pushFollowers: false })
//   .addTo(controller)





// CATEGORIES

let startOffset = window.innerWidth < 769 ? 350 : 600;
let scrollDensity = window.innerWidth < 769 ? 500 : 1000;

new ScrollMagic.Scene({ triggerElement: "#categories", duration: scrollDensity, offset: startOffset })
  .setPin("#category-names", { pushFollowers: true })
  .setClassToggle("#category-names", "category-one")
  // .addIndicators({
  //   name: 'CATEGORIES START 1'
  // })
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: "#categories", duration: scrollDensity, offset: startOffset + (scrollDensity * 1) + (132 * 1) })
  .setPin("#category-names", { pushFollowers: true })
  .setClassToggle("#category-names", "category-two")
  // .addIndicators({
  //   name: 'CATEGORIES START 2'
  // })
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: "#categories", duration: scrollDensity, offset: startOffset + (scrollDensity * 2) + (132 * 2) })
  .setPin("#category-names", { pushFollowers: true })
  .setClassToggle("#category-names", "category-three")
  // .addIndicators({
  //   name: 'CATEGORIES START 3'
  // })
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: "#categories", duration: scrollDensity, offset: startOffset + (scrollDensity * 3) + (132 * 3) })
  .setPin("#category-names", { pushFollowers: true })
  .setClassToggle("#category-names", "category-four")
  // .addIndicators({
  //   name: 'CATEGORIES START 4'
  // })
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: "#categories", duration: scrollDensity, offset: startOffset + (scrollDensity * 4) + (132 * 4) })
  .setPin("#category-names", { pushFollowers: true })
  .setClassToggle("#category-names", "category-five")
  // .addIndicators({
  //   name: 'CATEGORIES START 5'
  // })
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: "#categories", duration: scrollDensity, offset: startOffset + (scrollDensity * 5) + (132 * 5) })
  .setPin("#category-names", { pushFollowers: true })
  .setClassToggle("#category-names", "category-six")
  // .addIndicators({
  //   name: 'CATEGORIES START 6'
  // })
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: "#categories", duration: scrollDensity, offset: startOffset + (scrollDensity * 6) + (132 * 6) })
  .setPin("#category-names", { pushFollowers: true })
  .setClassToggle("#category-names", "category-seven")
  // .addIndicators({
  //   name: 'CATEGORIES START 7'
  // })
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: "#categories", duration: scrollDensity, offset: startOffset + (scrollDensity * 7) + (132 * 7) })
  .setPin("#category-names", { pushFollowers: false })
  .setClassToggle("#category-names", "category-eight")
  // .addIndicators({
  //   name: 'CATEGORIES START 8'
  // })
  .addTo(controller);





// HOW HUNGRY

hungryOffset = window.innerWidth < 769 ? '-330%' : '-270%'

const tweenHowHungry = new TimelineLite();
tweenHowHungry.to('#how-hungry-text', 3, {
  left: hungryOffset
})

const sceneHowHungry = new ScrollMagic.Scene({
  triggerElement: "#how-hungry",
  duration: 3000,
  triggerHook: 0
})
  .setTween(tweenHowHungry)
  // .addIndicators()
  .setPin("#how-hungry")
  .addTo(controller)