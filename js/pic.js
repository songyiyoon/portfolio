const getGrid = selector => {//1)
	let elements = gsap.utils.toArray(selector),
		bounds,
		getSubset = (axis, dimension, alternating, merge) => {
		  	let a = [], 
			  	subsets = {},
			  	onlyEven = alternating === "even",
			  	p;
			bounds.forEach((b, i) => {
				let position = Math.round(b[axis] + b[dimension] / 2),
					subset = subsets[position];
				subset || (subsets[position] = subset = []);
				subset.push(elements[i]);
			});
			for (p in subsets) {
				a.push(subsets[p]);
			}
			if (onlyEven || alternating === "odd") {
				a = a.filter((el, i) => !(i % 2) === onlyEven);
			}
		  	if (merge) {
				let a2 = [];
				a.forEach(subset => a2.push(...subset));
				return a2;
		  	}
		  	return a;
		};
	elements.refresh = () => bounds = elements.map(el => el.getBoundingClientRect());
	elements.columns = (alternating, merge) => getSubset("left", "width", alternating, merge);
	elements.rows = (alternating, merge) => getSubset("top", "height", alternating, merge);
	elements.refresh();

	return elements;
}



const grids = document.querySelectorAll('.section10 .grid');


const applyAnimation = (grid, animationType) => {
	const gridWrap = grid.querySelector('.section10 .grid-wrap');
	const gridItems = grid.querySelectorAll('.section10 .grid__item');
	const gridItemsInner = [...gridItems].map(item => item.querySelector('.section10 .grid__item-inner'));
	const gridText = document.querySelector(".section10 h3.content__title")
	// console.log(gridText)
	const gridText2 = document.querySelector(".section10 .int2")
	
	const timeline = gsap.timeline({
	  	defaults: { ease: 'none' },
	  	scrollTrigger: {
			trigger: gridWrap,
			start: 'top bottom+=5%',
			end: 'bottom top-=5%',
			scrub: true,
			onUpdate:(self)=>{
				let progress=self.progress
				console.log(progress)
				if(progress>= 0.3) {
					gridText.classList.add('active');
				}else{
					gridText.classList.remove('active');
				}
				
				if(progress>= 0.6) {
					gridText2.classList.add('active');
				}else{
					gridText2.classList.remove('active');
				}
			}
	  	}
	});
	
	switch(animationType) {
		
		
		case 'type1':
			
			// Set some CSS related style values
			grid.style.setProperty('--grid-width', '45%');
			grid.style.setProperty('--perspective', '3000px');
			grid.style.setProperty('--grid-item-ratio', '0.8');
			grid.style.setProperty('--grid-columns', '3');
			grid.style.setProperty('--grid-gap', '1vw');

			timeline
			.set(gridWrap, {
				transformOrigin: '0% 50%',
				rotationY: 30,
				xPercent: -75
			})
			.set(gridItems, {
				transformOrigin: '50% 0%'
			})
			.to(gridItems, {
				duration: 0.5,
				ease: 'power2',
				z: 500,
				stagger: 0.04
			}, 0)
			.to(gridItems, {
				duration: 0.5,
				ease: 'power2.in',
				z: 0,
				stagger: 0.04
			}, 0.5)
			.fromTo(gridItems, {
				rotationX: -70,
				filter: 'brightness(120%)'
			}, {
				duration: 1,
				rotationX: 70,
				filter: 'brightness(0%)',
				stagger: 0.04
			}, 0)
			
			break;

		
	  	
		default:
			console.error('Unknown animation type.');
			break;
	}
}

// Apply animations to each grid
const scroll3 = () => {
	grids.forEach((grid, i) => {
		// Determine animation type
		let animationType;
		switch (i % 6) {
			case 0:
				animationType = 'type1';
				break;
			case 1:
				animationType = 'type2';
				break;
			case 2:
				animationType = 'type3';
				break;
			case 3:
				animationType = 'type4';
				break;
			case 4:
				animationType = 'type5';
				break;
			case 5:
				animationType = 'type6';
				break;
		}
		applyAnimation(grid, animationType);
	});
}

// Preload images, initialize smooth scrolling, apply scroll-triggered animations, and remove loading class from body
window.addEventListener("load",() => {
	scroll3();
	document.body.classList.remove('loading');
});



