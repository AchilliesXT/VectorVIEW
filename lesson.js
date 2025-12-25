// CANVAS SETUP
const canvas = document.getElementById('lessonCanvas');
const ctx = canvas.getContext('2d');
const slider = document.getElementById('angleSlider');
const readout = document.getElementById('readout');

const size = 340;
const center = size / 2;
const scale = 100;

function drawGraph() {
    ctx.clearRect(0, 0, size, size);

    // 1. Draw Grid
    ctx.strokeStyle = '#E5ECF5';
    ctx.lineWidth = 1;
    for (let r = 0.25; r <= 1; r += 0.25) {
        ctx.beginPath();
        ctx.arc(center, center, scale * r, 0, Math.PI * 2);
        ctx.stroke();
    }

    // 2. Draw Cardioid (Static Reference)
    ctx.beginPath();
    ctx.strokeStyle = '#D1D9E6'; // Grey outline
    ctx.lineWidth = 2;
    for (let t = 0; t <= Math.PI * 2; t += 0.05) {
        let r = scale * (1 + Math.cos(t - Math.PI / 2)) * 0.5;
        ctx.lineTo(center + r * Math.cos(t), center + r * Math.sin(t));
    }
    ctx.stroke();

    // 3. Draw Active User Line (Based on Slider)
    let inputAngle = slider.value; // 0 to 360
    let rad = (inputAngle * Math.PI) / 180;
    
    // Shifted -90 deg so 0 is Top
    let plotRad = rad - Math.PI / 2; 

    // Calculate sensitivity r = 1 + cos(theta)
    // Note: math formula aligns with plotRad
    let sensitivity = (1 + Math.cos(plotRad - Math.PI/2)) * 0.5; // Cardioid math
    // Fix: Simple cardioid logic for visual alignment
    let r = scale * (1 - Math.cos(plotRad)) * 0.5; 
    
    // Line to edge
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(center + Math.cos(plotRad) * scale, center + Math.sin(plotRad) * scale);
    ctx.strokeStyle = '#19D3B3';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Dot at intersection
    let dotX = center + r * Math.cos(plotRad);
    let dotY = center + r * Math.sin(plotRad);
    
    ctx.beginPath();
    ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#19D3B3';
    ctx.fill();

    // Update Text
    let percentage = Math.round(Math.abs(1 - Math.cos(rad)) * 50); // Rough visual match
    // Override manual math for logic:
    // Front (0deg) = 100%, Back (180deg) = 0%
    // Let's cheat slightly for the UI readout to make it intuitive
    let distFromFront = Math.abs(inputAngle - 180); // 180 is bottom in slider logic usually?
    // Let's just map slider 0 (Top) to 100%
    let val = 0;
    if(inputAngle <= 180) val = 100 - (inputAngle/180 * 100);
    else val = (inputAngle-180)/180 * 100;
    
    // Fix readout logic simply based on visual
    let visualSense = (1 + Math.cos(rad - Math.PI/2)) * 50;
    readout.innerHTML = `Signal Strength: ${Math.round(visualSense)}%`;
}

// Event Listener for Slider
slider.addEventListener('input', drawGraph);

// Initial Draw
drawGraph();


// --- CHALLENGE LOGIC ---
const select = document.getElementById('challengeSelect');
const feedback = document.getElementById('challengeFeedback');

select.addEventListener('change', function() {
    let choice = select.value;
    
    if (choice === 'cardioid') {
        feedback.textContent = "Correct! The Cardioid pattern rejects the noise from behind (the drums) and focuses on the singer.";
        feedback.className = "feedback-box success";
    } else if (choice === 'omni') {
        feedback.textContent = "Not quite. An Omnidirectional mic will pick up the drums just as loud as the singer.";
        feedback.className = "feedback-box fail";
    } else if (choice === 'figure8') {
        feedback.textContent = "Risky. Figure-8 picks up sound from the back too, so it would hear the drums clearly.";
        feedback.className = "feedback-box fail";
    } else {
        feedback.textContent = "";
    }
});