const color_options = document.getElementById("color-options");
const canvas = document.getElementById("board");
let brush_size = document.getElementById("size").value;
let color_choosen = "aqua";
color_options.addEventListener("click", e => {
    if (e.target.className == "colors") {
        Array.from(color_options.children).forEach(element => element.className = "colors");
        e.target.className = "colors using";
        color_choosen = e.target.id;
    }
})
function changeSizeValue(newSize) {
    brush_size = newSize;
    console.log(brush_size);
}

const canvasContext = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const state = {
    mousedown: false
};
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientWidth;

// =====================
// == Event Listeners ==
// =====================
canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', keepGoing);
canvas.addEventListener('mouseup', end);
canvas.addEventListener('touchstart', start);
canvas.addEventListener('touchmove', keepGoing);
canvas.addEventListener('touchend', end);

clearButton.addEventListener('click', handleClearButtonClick);

// ====================
// == Event Handlers ==
// ====================
function start(event) {
    event.preventDefault();

    const mousePos = getMosuePositionOnCanvas(event);

    canvasContext.beginPath();

    canvasContext.moveTo(mousePos.x, mousePos.y);

    canvasContext.lineWidth = brush_size;
    canvasContext.strokeStyle = color_choosen;
    canvasContext.shadowColor = null;
    canvasContext.shadowBlur = null;

    canvasContext.stroke();
    canvasContext.fill();

    state.mousedown = true;
}

function keepGoing(event) {
    event.preventDefault();

    if (state.mousedown) {
        const mousePos = getMosuePositionOnCanvas(event);

        canvasContext.lineTo(mousePos.x, mousePos.y);
        canvasContext.stroke();
    }
}

function end(event) {
    event.preventDefault();

    if (state.mousedown) {
        canvasContext.shadowColor = color_choosen;
        canvasContext.shadowBlur = brush_size / 4;

        canvasContext.stroke();
    }

    state.mousedown = false;
}

function handleClearButtonClick(event) {
    event.preventDefault();

    clearCanvas();
}

// ======================
// == Helper Functions ==
// ======================
function getMosuePositionOnCanvas(event) {
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    const { offsetLeft, offsetTop } = event.target;
    const canvasX = clientX - offsetLeft;
    const canvasY = clientY - offsetTop;

    return { x: canvasX, y: canvasY };
}

function clearCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}





// ---- just for canva pratice / base ideas ------
// canvasContext.stokeStyle = color-choosen
// canvasContext.lineWidth = brush size

// paint = false
// mopusedown e=> paint = true, draw(e);
// mopuseup => paint = false ; ctx.beginpath();
// mopusemove e=>{
//     if (!paint) return;
//     canvasContext.lineWidth
//     lineTo(e.clientX,e.clientY)
//     canvasContext.stroke();
//     ctx.beginPath()
//     ctx.moveTo(clientx,y)
// }