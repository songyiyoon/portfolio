const lerp = (a, b, n) => (1 - n) * a + n * b;

const getCursorPos = ev => {
    return { 
        x: ev.clientX, 
        y: ev.clientY 
    };
};

const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

const calcWinsize = () => {
    return {
        width: window.innerWidth, 
        height: window.innerHeight
    };
};

let winsize = calcWinsize();
window.addEventListener('resize', () => winsize = calcWinsize());

let cursor = { x: winsize.width / 2, y: winsize.height / 2 };
window.addEventListener('mousemove', ev => cursor = getCursorPos(ev));

class ImageTrailEffect {
    DOM = {
        el: null,
        trailElems: null,
    };
    bgImage;
    defaults = {
        perspective: false,
        totalTrailElements: 5,
        valuesFromTo: {
            x: [-90, 90],
            y: [-90, 90],
            rx: [0, 0],
            ry: [0, 0],
            rz: [0, 0]
        },
        opacityChange: false,
        amt: pos => 0.02 * pos + 0.05,
    };
    
    imgTransforms = [];

    constructor(DOM_el, options) {
        this.DOM.el = DOM_el;
        this.options = Object.assign(this.defaults, options);
        this.layout();
        this.imgTransforms = [...new Array(this.options.totalTrailElements)].map(() => ({ x: 0, y: 0, rx: 0, ry: 0, rz: 0 }));

        requestAnimationFrame(() => this.render());
    }
    
    layout() {
        this.bgImage = /(?:\(['"]?)(.*?)(?:['"]?\))/.exec(this.DOM.el.style.backgroundImage)[1];

        this.DOM.el.style.backgroundImage = 'none';

        let innerHTML = '';
        for (let i = 0; i <= this.options.totalTrailElements - 1; ++i) {
            const opacityVal = i === this.options.totalTrailElements - 1 ? 1 : 1 / this.options.totalTrailElements * i + 1 / this.options.totalTrailElements;
            innerHTML += `<img class="trail__img" src="${this.bgImage}" style="opacity: ${this.options.opacityChange ? opacityVal : 1}" />`;
        }
        this.DOM.el.innerHTML = innerHTML;

        this.DOM.trailElems = this.DOM.el.querySelectorAll('.trail__img');

        if (this.options.perspective) {
            this.DOM.el.style.perspective = `${this.options.perspective}px`;
        }
    }

    render() {
        for (let i = 0; i <= this.options.totalTrailElements - 1; ++i) {
            let amt = i < this.options.totalTrailElements - 1 ? this.options.amt(i) : this.options.amtMain ? this.options.amtMain : this.options.amt(this.options.totalTrailElements - 1);

            this.imgTransforms[i].x = lerp(this.imgTransforms[i].x, map(cursor.x, 0, winsize.width, this.options.valuesFromTo.x[0], this.options.valuesFromTo.x[1]), amt);
            this.imgTransforms[i].y = lerp(this.imgTransforms[i].y, map(cursor.y, 0, winsize.height, this.options.valuesFromTo.y[0], this.options.valuesFromTo.y[1]), amt);

            this.imgTransforms[i].rz = lerp(this.imgTransforms[i].rz, map(cursor.x, 0, winsize.width, this.options.valuesFromTo.rz[0], this.options.valuesFromTo.rz[1]), amt);
            this.imgTransforms[i].rx = !this.options.perspective ? 0 : lerp(this.imgTransforms[i].rx, map(cursor.y, 0, winsize.height, this.options.valuesFromTo.rx[0], this.options.valuesFromTo.rx[1]), amt);
            this.imgTransforms[i].ry = !this.options.perspective ? 0 : lerp(this.imgTransforms[i].ry, map(cursor.x, 0, winsize.width, this.options.valuesFromTo.ry[0], this.options.valuesFromTo.ry[1]), amt);

            // Check if this.DOM.trailElems[i] is defined and not null before applying the transformation
            if (this.DOM.trailElems[i]) {
                this.DOM.trailElems[i].style.transform = `translateX(${this.imgTransforms[i].x}px) translateY(${this.imgTransforms[i].y}px) rotateX(${this.imgTransforms[i].rx}deg) rotateY(${this.imgTransforms[i].ry}deg) rotateZ(${this.imgTransforms[i].rz}deg)`;
            }
        };

        requestAnimationFrame(() => this.render());
    }
}

document.querySelectorAll('.trail').forEach(trailEl => {
    new ImageTrailEffect(trailEl, {
        perspective: 100,
        totalTrailElements: 10,
        valuesFromTo: {
            x: [-150, 150],
            y: [-30, 30],
            rx: [-3, 3],
            ry: [-7, 7],
            rz: [0, 0]
        },
        opacityChange: true,
    });
});
