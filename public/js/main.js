// const svg = document.getElementById("forms");
// const snap = Snap(svg);

// const formA = Snap.select('#clip-a');
// const formB = Snap.select('#clip-b');

// const formAPoints = formA.node.getAttribute('d');
// const formBPoints = formB.node.getAttribute('d');

// console.log(formAPoints);

// function toB() {
//     formA.animate({ d: formBPoints }, 2000, mina.backout);
// }

// toB();

const hLetters = document.querySelectorAll('.h');
const vLetters = document.querySelectorAll('.v');

let vw;
let vh;

document.addEventListener('mousemove', e => {
    raw = scale(e.pageX, 0, document.body.clientWidth, 0, 100);
    rawY = scale(e.pageY - document.body.scrollTop, 0, vh, 0, 100);

    if (raw > 100) {
        raw = 100;
    }

    if (raw < 0) {
        raw = 0;
    }

    if (rawY > 100) {
        rawY = 100;
    }

    if (rawY < 0) {
        rawY = 0;
    }

    eased = easeInOut(raw/100);
    easedY = easeInOut(rawY/100);

    hLetters.forEach(hLetter => {
        hLetter.style.fontVariationSettings = `"wght" ${(eased*100).toFixed(2)}`;
    });

    vLetters.forEach(vLetter => {
        vLetter.style.fontVariationSettings = `"wght" ${(easedY*100).toFixed(2)}`;
    });

    // main.style.fontVariationSettings = `"wght" ${(eased*100).toFixed(2)}`;
    // console.log((easedY*100).toFixed(2));
});

function scale(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function easeInOut(k) {
    return .5*(Math.sin((k - .5)*Math.PI) + 1);
}