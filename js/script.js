const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

// Set canvas size to fill the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle properties
const particles = [];
const particleCount = 100;
const colors = ["#6a11cb", "#2575fc", "#ff9a9e", "#fbc2eb"];
const mouse = { x: null, y: null };

// Track mouse movement
window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle constructor
function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.dx = (Math.random() - 0.5) * 2;
    this.dy = (Math.random() - 0.5) * 2;
    this.baseRadius = this.radius;
}

// Create particles
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Move particles
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

        // Interactive effect
        const distance = Math.hypot(mouse.x - particle.x, mouse.y - particle.y);
        if (distance < 100) {
            particle.radius = Math.min(particle.baseRadius + 5, 10);
        } else {
            particle.radius = particle.baseRadius;
        }
    });

    requestAnimationFrame(animate);
}

animate();

// Update canvas size on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Reset mouse position on mouseout
window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
});
