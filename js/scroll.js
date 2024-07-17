/* slide */
let list = document.querySelectorAll(".skill-add ul li");
let imgBoxs=document.querySelectorAll(".imgbox")
let txtBoxs=document.querySelectorAll('.textBox')


//가로스크롤
let scrollTween=gsap.to(list,{
    xPercent:-110*(list.length - 1),
    ease:"none",
    scrollTrigger:{
        trigger:".skill-add",
        //start:"center center",
        start:"80% center",
        scrub:1,
        end:"+=400%",
       // pin:true,
       // markers:true,
    }
})



//배열안에 요소를 하나씩 가져와서 어떤 일을 시킨다
imgBoxs.forEach(function(imgBox){//item은 배열안에 각각요소를 순서대로 받는다


    gsap.timeline({
        scrollTrigger:{
            trigger:imgBox,
            start:"center right",
            end:'center center',
            containerAnimation:scrollTween,
            scrub:true,
            //markers:true,
        }
    })
    
    .to(imgBox,{'clip-path':'inset(0%)',ease:"none",duration:1},0)

    //왼쪽으로 사라질때 이미지를 작게 
    gsap.timeline({
        scrollTrigger:{
            trigger:imgBox,
            start:"center center",
            end:'center left',
            containerAnimation:scrollTween,
            scrub:true,
           // markers:true
        }
    })
    .to(imgBox,{'clip-path':'inset(30%)',ease:"none",duration:1},0)

})   

txtBoxs.forEach(function(txtBox){
    gsap.timeline({
        scrollTrigger:{
            trigger:txtBox,
            start:"center 70%",
            end:'center 40%',
            containerAnimation:scrollTween,
            scrub:true,
           // markers:true
        }
    })
    .to(txtBox,{opacity:1,x:-100},0)

    gsap.timeline({
        scrollTrigger:{
            trigger:txtBox,
            start:"center 30%",
            end:'center 20%',
            containerAnimation:scrollTween,
            scrub:true,
            //markers:true
        }
    })
    .to(txtBox,{opacity:0},0)
})