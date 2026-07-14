document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. GLOWING CANVAS PARTICLE BACKGROUND 
    // ==========================================
    const canvas = document.getElementById("bg-canvas");
    const ctx = canvas.getContext("2d");
    
    let particles = [];
    const maxParticles = 60; // Increased for better visibility

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.7; // Slightly faster
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 2.5 + 1; // Larger particles
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            // Glowing nodes
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#3b82f6';
            ctx.fillStyle = "rgba(147, 197, 253, 0.8)";
            ctx.fill();
        }
    }

    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }

    function animateBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect nodes
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 160) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    // Brighter connecting lines
                    ctx.shadowBlur = 0; 
                    ctx.strokeStyle = `rgba(96, 165, 250, ${0.3 * (1 - distance/160)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateBackground);
    }
    animateBackground();

    // ==========================================
    // 2. INTERACTIVE AUTOMATED TYPING SCRIPT
    // ==========================================
    const terminalOutput = document.getElementById("automation-terminal");
    const codeString = `const developer = {
  name: 'Priya Kumar',
  role: 'Web Developer Intern',
  skills: ['HTML', 'CSS', 'JavaScript', 'React'],
  passion: 'Building scalable applications'
};

developer.init = () => {
  console.log('System online. Ready to build.');
};

developer.init();`;

    let charIndex = 0;
    terminalOutput.innerHTML = '<span id="typed-code"></span><span class="cursor"></span>';
    const codeContainer = document.getElementById("typed-code");

    function typeCodeAutomation() {
        if (charIndex < codeString.length) {
            codeContainer.textContent += codeString.charAt(charIndex);
            charIndex++;
            let typingSpeed = Math.random() * 25 + 15;
            setTimeout(typeCodeAutomation, typingSpeed);
        }
    }
    setTimeout(typeCodeAutomation, 800);

    // ==========================================
    // 3. SCROLL REVEAL INTERSECTION OBSERVER
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .scroll-reveal').forEach(el => {
        observer.observe(el);
    });
});