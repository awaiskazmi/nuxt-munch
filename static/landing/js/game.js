var gameWrapper = document.getElementById("game");
var pageHeader = document.getElementById("header");
var starGame = document.getElementById("btn-start-game");

starGame.addEventListener("click", () => {
  document.getElementById("loading").style.display = "none";
  document.getElementById("fixed-elements").style.display = "none";
  document.getElementById("skrollr-body").style.display = "none";
  document.getElementById("fixed-above-frame").style.display = "none";
  document.getElementById("fixed-above-categories").style.display = "none";
  gameWrapper.classList.add("active");
});

// let v = new Vue({
//   el: "#game-screen",
//   data: {
//     activeQuestion: 0,
//     questions: [
//       {
//         id: 1,
//         statement: "Which snack do you resonate most with?",
//         options: {
//           a: "CHIPS- I’m salty like that!",
//           b: "DESSERTS! We could all do with some sweetness",
//         },
//       },
//       {
//         id: 2,
//         statement: "Would you steal a snack from a kid when you’re hungry?",
//         options: {
//           a: "umm.. No, that’s mean.",
//           b: "GIVE ME THAT!",
//         },
//       },
//       {
//         id: 3,
//         statement: "I like big ________ and I cannot lie!",
//         options: {
//           a: "MUUUUNCHIESSSS",
//           b: "HUUUGGSSS",
//         },
//       },
//       {
//         id: 4,
//         statement: "On weekends you might find me...",
//         options: {
//           a: "Cruisin’ around the city",
//           b: "Lounging with a Magnum in hand, duh?",
//         },
//       },
//       {
//         id: 5,
//         statement: "Your thoughts on fries dipped in ice-cream...",
//         options: {
//           a: "Blasphemous",
//           b: "IDGA*, just give it to me!",
//         },
//       },
//     ],
//     changingQuestion: false,
//   },
//   computed: {
//     btnText() {
//       return this.activeQuestion == this.questions.length - 1
//         ? "Finish"
//         : "Next";
//     },
//     transitionClass() {
//       return this.changingQuestion ? "transition" : "";
//     },
//     windowWidth() {
//       return window.innerWidth;
//     },
//     userAgent() {
//       return this.windowWidth > 768 ? "web" : "mobile";
//     },
//   },
//   mounted() {
//     this.$refs.vdo.play();
//   },
//   methods: {
//     nextQuestion() {
//       if (this.activeQuestion == this.questions.length - 1) {
//         return;
//       }
//       this.changingQuestion = true;
//       setTimeout(() => {
//         this.activeQuestion++;
//         this.$refs.radioOne.checked = false;
//         this.$refs.radioTwo.checked = false;
//         this.changingQuestion = false;
//         this.$refs.vdo.play();
//       }, 750);
//     },
//   },
// });
