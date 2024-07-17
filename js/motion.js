gsap.registerPlugin(MotionPathPlugin);

let path = document.querySelector(".Line");
let pathLenght = path.getTotalLength();
// console.log(pathLenght);

path.style.strokeDasharray = pathLenght;
path.style.strokeDashoffset = pathLenght;

let pulses = gsap
  .timeline({
    defaults: {
      duration: 0.05,
      autoAlpha: 1,
      scale: 1.5,
      transformOrigin: "center",
      ease: "elastic.out(1,0.3)",
    },
  })
  .to(".ball01,.text01", {}, 0.05)
  .to(".ball02,.text02", {}, 0.12)
  .to(".ball03,.text03", {}, 0.2)
  .to(".ball04,.text04", {}, 0.25)
  .to(".ball05,.text05", {}, 0.4)
  .to(".ball06,.text06", {}, 0.55)
  .to(".ball07,.text07", {}, 0.59);

let main = gsap
  .timeline({
    defaults: {
      duration: 1,
    },
    scrollTrigger: {
      trigger: ".add1",
      start: "top top",
      end: "+=1000",
      scrub: 1.9,
      // markers: true,
      pin: true,
    },
    onUpdate: animationUpdate,
  })
  .to(".ball08", {
    duration: 0.01,
    autoAlpha: 1, //opacity, visibility
  })
  .to(
    path,
    {
      strokeDashoffset: 0,
    },
    "ball"
  )
  .to(
    ".ball08",
    {
      motionPath: {
        path: ".Line", //path연결
        align: ".Line",
        alignOrigin: [0.5, 0.5],
      },
    },
    "ball"
  )

  .to(".ball2", { opacity:1, scale:200,backgroundColor:"#000" }, 2)
  .add(pulses, 0); //위에 있는 다른 timeline을 연결하는 방법 (총 2개인데 위에꺼랑 연결하는것) 0 타임라인의 시작지점

function animationUpdate() {
  // console.log(this.progress());
}
