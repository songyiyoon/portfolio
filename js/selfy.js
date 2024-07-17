
(function(){
  const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

  // Linear interpolation
  const lerp = (a, b, n) => (1 - n) * a + n * b;
  
  const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;
  
  const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  
  // Gets the mouse position
  const getMousePos = e => {
      return { 
          x : e.clientX, 
          y : e.clientY 
      };
  };
  ////////////////////////////
  
  let rotateElement = document.querySelector(".rotate");
  let offset = rotateElement.getBoundingClientRect().top + window.scrollY;
  let offsetWidth=rotateElement.getBoundingClientRect().width;
  // console.log(offsetWidth)
  
  let scroll = {cache: 0, current: 0};
  const allImgs = [...document.querySelectorAll('.gallery__item-img')];
  const lenis = new Lenis()
  
  lenis.on('scroll', (e) => {
     
  })
  
  
  
  lenis.on('scroll', ScrollTrigger.update)
  lenis.on('scroll',(obj)=>{
      //console.log( window.scrollY)
  
   
         let skewVal;
         if(window.scrollY > offset){
          scroll.current = obj.scroll ;
          const distance = scroll.current - scroll.cache;
          scroll.cache = scroll.current;
          skewVal = map(distance, -50, 50, -25, 25);//-25 ~ 25 사이의 스큐 간격
         allImgs.forEach(el => el.style.transform = 'skewX('+clamp(skewVal, -25, 25)+'deg)');// "빠른 스크롤링"은 이전 스크롤링 위치에서 현재 스크롤링까지의 거리가 높다는 것을 의미합니다. 최소/최대 거리는 [-50,50] 간격을 고려합니다
         }else{
          allImgs.forEach(el => el.style.transform = 'skewX(0deg)');
         }
      
  
  })
  
  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
  })
  
  gsap.ticker.lagSmoothing(0)
  ///////////////////////////////
  
  let mouse = {x: 0, y: 0};
  window.addEventListener('mousemove', ev => mouse = getMousePos(ev));
  
  class Cursor {
      constructor(el) {
          this.DOM = {el: el};
          // this.DOM.el.style.opacity = 0;
          
          // this.bounds = this.DOM.el.getBoundingClientRect();
          
          this.renderedStyles = {
              tx: {previous: 0, current: 0, amt: 0.2},
              ty: {previous: 0, current: 0, amt: 0.2},
              scale: {previous: 1, current: 1, amt: 0.15},
              //opacity: {previous: 1, current: 1, amt: 0.1}
          };
  
      }
      enter() {
          this.renderedStyles['scale'].current = 2.5;
          //this.renderedStyles['opacity'].current = 0.5;
      }
      leave() {
          this.renderedStyles['scale'].current = 1;
          //this.renderedStyles['opacity'].current = 1;
      }
      render() {
          this.renderedStyles['tx'].current = mouse.x - this.bounds.width/2;
          this.renderedStyles['ty'].current = mouse.y - this.bounds.height/2;
  
          for (const key in this.renderedStyles ) {
              this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
          }
                      
          this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px) scale(${this.renderedStyles['scale'].previous})`;
          //this.DOM.el.style.opacity = this.renderedStyles['opacity'].previous;
  
          requestAnimationFrame(() => this.render());
      }
  }
  
  gsap.registerPlugin(ScrollTrigger)
  
  class Example {
    constructor(options) {
      this.root = options.root;
  
      this.init();
  
      //setTimeout(this.showImages.bind(this), 1000);
    }
  
    init() {
  
  
      let list = document.querySelectorAll(".gallery .gallery__item");
      let imgBoxs = document.querySelectorAll("[data-scroll-speed]")
  
      //console.log(imgBoxs)
  
  
      let scrollTween = gsap.to(".gallery>*", {//img영역 
          xPercent: -100 * (list.length * 1.5),
          ease: "none",
        scrollTrigger: {
          trigger: ".rotate",
          start: "center center",
          scrub: 1,
          end: "+=300%",
          // pin: true,
              
        }
      })
  
  
      imgBoxs.forEach(function (imgBox) { 
  
          
        gsap.timeline({
            scrollTrigger: {
              trigger: imgBox,
              start: "center right",
              end: 'center left',
              containerAnimation: scrollTween,
              scrub: true,
              // markers: true
            }
          })
          .to(imgBox, {
            x: (i, el) => -(el.getAttribute("data-scroll-speed")) * 200,
          }, 0)
  
  
      })
  
      // this.images = this.root.querySelectorAll('.image');
  
    }
    
  }
  
  
  window.addEventListener("load",() => {
  
      const example = new Example({
          root: document.querySelector('.scroll-animations-example')
        });
  
      const cursor = new Cursor(document.querySelector('.cursor'));
  
      [...document.querySelectorAll('a')].forEach(link => {
          link.addEventListener('mouseenter', () => cursor.enter());
          link.addEventListener('mouseleave', () => cursor.leave());
      });
  });
})()

