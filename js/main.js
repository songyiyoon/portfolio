//proloading시 scroll 움직이는 못하게 막기
function showLoadingScreen() {
  document.body.classList.add('loading');
  window.scrollTo(0, 0);
}
function hideLoadingScreen() {
  document.body.classList.remove('loading');
}
showLoadingScreen();

// preload
let container=document.querySelector("#preload");
let progressBar=document.querySelector(".pre-bar");
let progressText=document.querySelector(".pre-text");
let imgLoaded=0;
let imgTotal=500;
let current = 0;
let progressTimer;
let topValue;


//매시간마다마다 할일
//setInterval(할일,시간)
//setInterval(function(){},1000)//매 1초마다마다 할일

//setInterval를 멈추고 싶을때
// 1) 변수에 setInterval 할당한다  let 변수 = setInterval
// 2) clearInterval(변수)


progressTimer=setInterval(updateProgress,1000/60)


function updateProgress(){
  imgLoaded++;
  //console.log(imgLoaded)
  let target=(imgLoaded/imgTotal)*100;
  
  current += (target - current)*0.01;
  //current = current + (target - current)*0.01;
  progressBar.style.width=current + "%";
  progressText.innerHTML=Math.floor(current) + "%";//Math.floor 버림
  //console.log(current)
  let sp;
  if(current>99.9){
      clearInterval(progressTimer)
      container.classList.add("progress-complete")
      progressBar.style.width="100%";
      gsap.to(container,{
          duration:0.5,
          yPercent : -100,
          ease:"none",
          onUpdate:function scrollPrevent(){
              showLoadingScreen();
              sp= requestAnimationFrame(scrollPrevent)//2번줄
              setTimeout(()=>{
                  cancelAnimationFrame(sp);
                  hideLoadingScreen();//6번줄
              }, 10);
          },
          
      })
  }
  
}

//-------------------------------------------------
gsap.registerPlugin(ScrollTrigger, Flip);


gsap.ticker.lagSmoothing(0)
//badge //모든badge에 다 
gsap.to(".star",{
    rotation:360,
    duration:5,
    ease:"none",
    repeat:-1
})



/* 글자 흐르는 애니메이션 */
let bt = document.querySelector(".bottom_txt .bt");
let textArr1 =
  "welcom to Portfolio welcom to Portfolio welcom to Portfolio welcom to Portfolio welcom to Portfolio welcom to Portfolio welcom to Portfolio".split(
    " "
  );
// console.log(textArr1);
let count1 = 0;
initTexts(bt, textArr1);
function initTexts(ele, arr) {
  arr.push(...arr);
  // console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    ele.innerHTML += `${arr[i]}\u00A0\u00A0\u00A0`;
  }
}
function anitxt() {
  count1++;
  count1 = marqueeText(count1, bt, -1);
  requestAnimationFrame(anitxt);
}
function marqueeText(count, ele, direction) {
  if (count > ele.scrollWidth / 2) {
    count = 0;
    ele.style.transform = `translate(0,0)`;
  }
  ele.style.transform = `translate(${count * direction}px,0)`;
  return count;
}
anitxt();

/* ------------------------------photo */

let triggerFlipOnScroll = (galleryEl, option) => {
  let settings = {
    flip: {
      absolute: false,
      absoluteOnLeave: false,
      scale: true,
      simple: true,
    },
    scrollTrigger: {
      start: "center center",
      end: "+400%",
      pinSpacing: false,
    },
  };
  settings = Object.assign({}, settings, option);
  // console.log(settings);

  let galleryCaption = galleryEl.querySelector(".caption");
  let galleryItems = galleryEl.querySelectorAll(".gallery__item");

  galleryEl.classList.add("gallery--switch");

  let flipstate = Flip.getState([galleryItems, galleryCaption], {
    props: "filter,opacity",
  });

  galleryEl.classList.remove("gallery--switch");


  let tl = Flip.to(flipstate, {
    ease: "none",
    absolute: settings.flip.absolute,
    absoluteOnLeave: settings.flip.absoluteOnLeave,
    scale: settings.flip.scale,
    simple: settings.flip.simple,
    stagger: settings.stagger,
    scrollTrigger: {
      trigger: ".section3",
      start: settings.scrollTrigger.start,
      end: settings.scrollTrigger.end,
      pin: galleryEl.parentNode,

      scrub: 1,
    },
  });
};

let scroll = () => {
  let galleries = [{
      id: "#gallery-1",
      options: {
        flip: {
          absolute: true,
          scale: false,
        },
        scrollTrigger: {
          end: "+=400%",
        },
        stagger: 0.08,
      },
    },
  ];
  galleries.forEach((gallery) => {
    galleryElement = document.querySelector(gallery.id);
    triggerFlipOnScroll(galleryElement, gallery.options);
  });
};
scroll();
/* section4  */

gsap.timeline({
  scrollTrigger:{
    trigger:"#section4",
    start:"+=20% center",
    end:"+=20% center",
    scrub:1,
    duration:2,
   // markers:true,
    stagger:0.03
  }
})
.to("#section4 .about",{x:0,y:0,duration:5})
.to(".my-pic",{x:0,duration:7})
.to(".s4-intro",{opacity:1,duration:9},1)
.to("#section4 .pic h2",{fontSize:"30px",duration:10},2.5)
let workInfoItems=document.querySelectorAll(".cam-img")
workInfoItems.forEach((item,index)=>{
    item.style.zIndex = workInfoItems.length - index;
})

gsap.set(".cam-img",{
    clipPath:function(){
        return "inset(0px 0px 0px 0px)"
        // return "inset(top right bottom left)"
    }
})
let ani = gsap.to(".cam-img:not(:last-child",{
    clipPath:function(){
        return "inset( 0px 0px 100% 0px)"
    },
    stagger:0.5,
    ease:"none"
})

ScrollTrigger.create({
    trigger:".section4",
    start:"top top",
    end:"bottom bottom",
    animation:ani,
    scrub:1
})

/* section5 */
gsap.timeline({
  scrollTrigger:{
    trigger:"#section5",
    start:"top center",
    end:"top center",
    scrub:1,
    //markers:true
  }
})
.to("#section5 h2.site",{opacity:1})
/* -------------------section7 글자눕는 애니메이션 */

Splitting();

const fx20Titles = [
  ...document.querySelectorAll(
    ".content__title[data-splitting][data-effect20]"
  ),
];

const scroll1 = () => {
  fx20Titles.forEach((title) => {
    const chars = title.querySelectorAll(".char");

    chars.forEach((char) =>
      gsap.set(char.parentNode, {
        perspective: 1000,
      })
    );

    gsap.fromTo(
      chars, {
        "will-change": "opacity, transform",
        transformOrigin: "50% 100%",
        opacity: 0,
        rotationX: 90,
      }, {
        ease: "power4",
        opacity: 1,
        stagger: {
          each: 0.03,
          from: "random",
        },
        rotationX: 0,
        scrollTrigger: {
          trigger: title,
          start: "center bottom",
          end: "bottom top+=20%",
          scrub: true,
          // markers:true
        },
      }
    );
  });
};


/* twinkle */
let tw = document.querySelector(".twinkle");
let tl = gsap.timeline;
gsap.set(tw.position, {
  x: 0,
  y: 0,
  z: 0
}, 0);
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".s5-s1-right",
      start: "bottom center",
      end: "+=150% bottom",
      //markers:true,
      scrub: 1,
      duration: 2,
    },
  })
  .to(tw, {
    x: "-165%",
    y: "175%",
  });
tl({
  scrollTrigger: {
    trigger: ".s5-s2-left",
    start: "bottom center",
    end: "+=150% bottom",
    // markers:true,
    scrub: 1,
    duration: 2,
  },
}).to(tw, {
  y: "350%",
  x: "0%",
});
tl({
  scrollTrigger: {
    trigger: ".s5-s3-right",
    start: "bottom center",
    end: "+=150% bottom",
    //markers:true,
    scrub: 1,
    duration: 2,
  },
}).to(tw, {
  y: "530%",
  x: "-165%",
});

tl({
  scrollTrigger: {
    trigger: ".section5 .s5-s4-left",
    start: "bottom center",
    end: "+=150% bottom",
    //  markers:true,
    scrub: 1,
    duration: 2,
  },
}).to(tw, {
  y: "50%",
  x: "20%",
  opacity: 0
});



/*=============== text fill ===============*/
tl({
    scrollTrigger: {
      trigger: ".s5-s1-left",
      start: "top center",
      end: "-50% center",
      //markers:true,
      scrub: 1,
      stagger: 1,
      duration: 2,
    },
  })
  .to(".s5-s1-left .title", {
    color: "#0aa70a",
  })
  .to(".s5-s1-left .use", {
    color: "#fff",
  })
  .to(".s5-s1-left a", {
    backgroundColor: "#0aa70a",
    fontSize: "28px",
  });
tl({
    scrollTrigger: {
      trigger: ".s5-s2-right",
      start: "top center",
      end: "-50% center",
      // markers:true,
      scrub: 1,
      stagger: 1,
      duration: 2,
    },
  })
  .to(".s5-s2-right .title", {
    color: "#5546ff",
  })
  .to(".s5-s2-right .use", {
    color: "#fff",
  })
  .to(".s5-s2-right a", {
    backgroundColor: "#5546ff",
    fontSize: "28px",
  });
tl({
    scrollTrigger: {
      trigger: ".s5-s3-left",
      start: "top center",
      end: "-50% center",
      // markers:true,
      scrub: 1,
      stagger: 1,
      duration: 2,
    },
  })
  .to(".s5-s3-left .title", {
    color: "#0b36f7",
  })
  .to(".s5-s3-left .use", {
    color: "#fff",
  })
  .to(".s5-s3-left a", {
    backgroundColor: "#0b36f7",
    fontSize: "28px",
  });
tl({
    scrollTrigger: {
      trigger: ".s5-s4-right",
      start: "top center",
      end: "-50% center",
      //markers:true,
      scrub: 1,
      stagger: 1,
      duration: 2,
    },
  })
  .to(".s5-s4-right .title", {
    color: "#62bcb1",
  })
  .to(".s5-s4-right .use", {
    color: "#fff",
  })
  .to(".s5-s4-right a", {
    backgroundColor: "#62bcb1",
    fontSize: "28px",
  });
tl({
    scrollTrigger: {
      trigger: ".section6 .s1_left",
      start: "top center",
      end: "-50% center",
      // markers:true,
      scrub: 1,
      stagger: 1,
    },
  })
  .to(".section6 .s1_left .title", {
    color: "#ffeaa3",
  })
  .to(".section6 .s1_left .use", {
    color: "#fff",
  })
  .to(".section6 .s1_left .show", {
    backgroundColor: "#ffeaa3",
    fontSize: "28px",
  });
tl({
    scrollTrigger: {
      trigger: ".section6 .s2_right",
      start: "top center",
      end: "-50% center",
      // markers:true,
      scrub: 1,
      stagger: 1,
    },
  })
  .to(".section6 .s2_right .title", {
    color: "#b58cf9",
  })
  .to(".section6 .s2_right .use", {
    color: "#fff",
  })
  .to(".section6 .s2_right .show", {
    backgroundColor: "#b58cf9",
    fontSize: "28px",
  });
tl({
    scrollTrigger: {
      trigger: ".section6 .s3_right",
      start: "top center",
      end: "-50% center",
      // markers:true,
      scrub: 1,
      stagger: 1,
    },
  })
  .to(".section6 .s3_right .title", {
    color: "#1d73a7",
  })
  .to(".section6 .s3_right .use", {
    color: "#fff",
  })
  .to(".section6 .s3_right .show", {
    backgroundColor: "#1d73a7",
    fontSize: "28px",
  });
/* section8  */

gsap.timeline({
  scrollTrigger:{
    trigger:".section8 .site1",
    start:"-=50% center",
    end:"top center",
    // markers:true,
    scrub:0.5,
    }
})


.to(".s8_right .pc-ver",{x:0, opacity:1})
.to(".s8_right .pad-ver",{x:0,opacity:1})
.to(".s8_right .mobile-ver",{x:0,opacity:1})

gsap.timeline({
  scrollTrigger:{
    trigger:".section8 .site3",
    start:"-=50% center",
    end:"top center",
    // markers:true,
    scrub:0.5,
    }
})
.to(".s8-s3-left",{x:0,})
.to(".s8-s3-right",{x:0,})

/* text-path */
const svgText = document.querySelector("#textonpath");

gsap.set(svgText, {
  attr: {
    startOffset: "120%"
  }
});

gsap.to(svgText, {
  attr: {
    startOffset: "0%"
  },
  scrollTrigger: {
    trigger: ".text-path",
    start: "-=100% top",
    scrub: 1
  }
});

/* ------------------setion9 */
const fx8Titles = [
  ...document.querySelectorAll(".content__title[data-splitting][data-effect8]"),
];
const scroll2 = () => {
  const lettersAndSymbols = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "!", "@", "#", "$",
    "%", "^", "&", "*", "-", "_", "+", "=", ";", ":", "<", ">", ",",
  ];
  fx8Titles.forEach((title) => {
    const chars = title.querySelectorAll(".char");

    chars.forEach((char, position) => {
      let initialHTML = char.innerHTML;

      gsap.fromTo(
        char, {
          opacity: 0,
        }, {
          duration: 0.03,
          innerHTML: () =>
            lettersAndSymbols[
              Math.floor(Math.random() * lettersAndSymbols.length)
            ],
          repeat: 1,
          repeatRefresh: true,
          opacity: 1,
          repeatDelay: 0.03,
          delay: (position + 1) * 0.18,
          onComplete: () =>
            gsap.set(char, {
              innerHTML: initialHTML,
              delay: 0.03
            }),
          scrollTrigger: {
            trigger: title,
            start: "top bottom",
            end: "bottom center",
            toggleActions: "play resume resume reset",
            onEnter: () => gsap.set(char, {
              opacity: 0
            }),
          },
        }
      );
    });
  });
};
window.addEventListener("load", () => {
  scroll1(), scroll2();
});

//coding picture

gsap.timeline({
  scrollTrigger:{
    trigger:"#section9",
    start:"center top",
    end:"center",
    scrub: 1,
    //markers:true
    }
})
.to(".skill_wrap img",{
  x:0
})

/* skill circle */

let MAX = 100;
let circleProgressInstances = [];
document.querySelectorAll(".progress").forEach((progressEle, index) => {
  let initialvalue = document.querySelectorAll(".value-input")[index].value;
  let classText = document.querySelectorAll(".skill_wrap h3")[index].innerHTML;

  let cp = new CircleProgress(progressEle, {
    max: MAX,
    value: 0,
    animationDuration: 1500,
    //textFormat: (val)=>val + "%";
    textFormat: (val) => val,
  });

  // console.log(cp)
  circleProgressInstances.push(cp);

  ScrollTrigger.create({
    trigger: ".skill_wrap",
    start: "bottom 70%",
    scrub: 1,
    // markers:true,
    onEnter: () => {
      cp.value = initialvalue;
    },
    onLeaveBack: () => {
      cp.value = 0;
    },
  });
});

tl2=gsap.timeline({
  scrollTrigger: {
    trigger: ".plan-wrap",
    start: "bottom center",
    end: "+=130%",
    scrub: 1,
    //markers:true
  },
});

///////////////////////////
//비행기의 방향
window.addEventListener("wheel", myFunction);

let plane = document.querySelector(".paper-plane");
function myFunction(event) {
  let y = event.deltaY;
  // console.log(y);

  if (y > 0) {
    plane.style.transform = `rotate(0deg)`;
  } else {
    plane.style.transform = `rotate(180deg)`;
  }
}
tl2.to(".paper-plane", { offsetDistance: "100%" }, "plane");


gsap.timeline({
  scrollTrigger:{
    trigger:"#section11",
    start:"bottom center",
    end:"+=500px center",
    scrub:1,
     duration:5,
   // markers:true
  }
})
.to(".one",{x:0})
.to(".two",{x:0})
.to(".mail",{x:0})