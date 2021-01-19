const svg = document.getElementById("forms");
const snap = Snap(svg);

const formA = Snap.select('#clip-a');
const formB = Snap.select('#clip-b');

const formAPoints = formA.node.getAttribute('d');
const formBPoints = formB.node.getAttribute('d');

console.log(formAPoints);

function toB() {
    formA.animate({ d: formBPoints }, 2000, mina.backout);
}

toB();