const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDragging = false;
let startX = 0;
let startY = 0;
let currentBox = null;
let dragStartTime = 0;

let circles = [];
let selectedCount = 0;
const TOTAL_CIRCLES = 12;

// Generate moving circles
function generateCircles() {
    circles = [];
    selectedCount = 0;                    // reset count only on full reset
    for (let i = 0; i < TOTAL_CIRCLES; i++) {
        circles.push({
            x: Math.random() * 650 + 25,
            y: Math.random() * 350 + 25,
            r: 15,
            selected: false,                  // new circles start unselected
            vx: (Math.random() * 2.8 - 1.4),
            vy: (Math.random() * 2.8 - 1.4)
        });
    }
}

function updateCirclePositions() {
    circles.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;

        if (c.x - c.r < 0 || c.x + c.r > canvas.width) c.vx *= -1;
        if (c.y - c.r < 0 || c.y + c.r > canvas.height) c.vy *= -1;
    });
}

// Changed logic: Only add to selection, never deselect
function checkSelection() {
    let newlySelected = 0;
    const selectionTime = ((Date.now() - dragStartTime) / 1000).toFixed(2);

    circles.forEach(circle => {
        // If already selected, keep it selected
        if (circle.selected) return;

        const inside = (
            circle.x > currentBox.x &&
            circle.x < currentBox.x + currentBox.w &&
            circle.y > currentBox.y &&
            circle.y < currentBox.y + currentBox.h
        );

        if (inside) {
            circle.selected = true;
            newlySelected++;
        }
    });

    selectedCount += newlySelected;   // only increase count

    const accuracy = TOTAL_CIRCLES > 0 ? Math.round((selectedCount / TOTAL_CIRCLES) * 100) : 0;

    document.getElementById("score").innerHTML = 
        `Selected: ${selectedCount} / ${TOTAL_CIRCLES} | Time: ${selectionTime}s | Accuracy: ${accuracy}%`;
}

function drawBox(box) {
    ctx.strokeStyle = "#0096D6";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(box.x, box.y, box.w, box.h);
    ctx.setLineDash([]);
}

function drawCircles() {
    circles.forEach(circle => {
        ctx.beginPath();
        ctx.fillStyle = circle.selected ? "#4CAF50" : "#f44336";   // green stays green
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircles();

    if (currentBox) {
        drawBox(currentBox);
    }
}

// Animation loop
function animate() {
    updateCirclePositions();
    draw();
    requestAnimationFrame(animate);
}

// Mouse Events - Rubber Banding
canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.offsetX;
    startY = e.offsetY;
    currentBox = null;
    dragStartTime = Date.now();
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    currentBox = {
        x: Math.min(startX, e.offsetX),
        y: Math.min(startY, e.offsetY),
        w: Math.abs(e.offsetX - startX),
        h: Math.abs(e.offsetY - startY)
    };
    draw();
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
    if (currentBox) {
        checkSelection();
    }
    currentBox = null;
    draw();
});

// Reset button - fully resets everything
document.getElementById("resetBtn").addEventListener("click", () => {
    generateCircles();
    document.getElementById("score").innerHTML = "Selected: 0 / 12 | Time: 0.00s | Accuracy: 0%";
    draw();
});

// Start the demo
generateCircles();
animate();
draw();

console.log("%cSimple HCI Rubber Banding Demo with Fitts’s Law ready!", "color:#0066cc");