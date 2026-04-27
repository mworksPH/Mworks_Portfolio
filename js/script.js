// Loading screen
const lines = document.querySelectorAll(".line");
const progress = document.querySelector(".progress");
const loading = document.getElementById("loading-screen");

let load = 0;

lines.forEach((line, i) => {
    setTimeout(() => {
        line.style.opacity = 1;
    }, i * 700);
});

let interval = setInterval(() => {
    load += 10;
    progress.style.width = load + "%";

    if (load >= 100) {
        clearInterval(interval);
        setTimeout(() => {
            loading.style.display = "none";
        }, 500);
    }
}, 300);

// Particles
const canvas = document.getElementById("particles");

if (canvas) {
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let particles = [];

    function initParticles() {
        particles = [];
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: 2,
                speed: Math.random() * 1.5
            });
        }
    }

    initParticles();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.y -= p.speed;

            if (p.y < 0) {
                p.y = canvas.height;
                p.x = Math.random() * canvas.width;
            }

            ctx.fillStyle = "#38bdf8";
            ctx.fillRect(p.x, p.y, p.size, p.size);
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Cursor glow
const cursor = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

// Lightning
setInterval(() => {
    if (Math.random() > 0.8) {
        document.body.style.background = "white";
        setTimeout(() => {
            document.body.style.background = "black";
        }, 100);
    }
}, 3000);

// Profile card animation intro
window.addEventListener("load", () => {
    const card = document.querySelector(".profile-card");

    if (card) {
        card.style.opacity = 0;
        card.style.transform = "translateY(40px)";

        setTimeout(() => {
            card.style.transition = "1s ease";
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
        }, 2000); // after loading screen
    }
});

function levelUp() {
    const popup = document.getElementById("level-up");

    // sound
    const audio = new Audio("https://www.myinstants.com/media/sounds/arise-solo-leveling.mp3");
    audio.play();

    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}

// trigger after load
setTimeout(levelUp, 5000);

function systemVoice() {
    const msg = new SpeechSynthesisUtterance("Hunter awakened");
    msg.rate = 0.9;
    msg.pitch = 0.6;
    msg.volume = 1;

    speechSynthesis.speak(msg);
}

function rankUp() {
    const rank = document.querySelector(".rank");

    if (rank.textContent === "RANK E") {
        rank.textContent = "RANK S";
        rank.classList.add("upgraded");
        // effect + sound levelUp();
        systemVoice();
    }
}

let exp = 0;
let level = 1;

function gainExp(amount) {
    exp += amount;

    if (exp >= 100) {
        exp = 0;
        level++;

        levelUp(); // reuse your LEVEL UP popup
        systemVoice();
    }

    document.getElementById("level").innerText = level;
    document.getElementById("exp-fill").style.width = exp + "%";
}

function openDungeon(name) {
    alert("Entering Dungeon: " + name);
}

for (let i = 0; i < 30; i++) {
    let s = document.createElement("div");
    s.classList.add("shadow");
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDuration = (3 + Math.random() * 5) + "s";
    document.body.appendChild(s);
}

function openDungeon(name) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modal-title").innerText = name;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

window.addEventListener("load", () => {
    setTimeout(() => {
        const voice = new SpeechSynthesisUtterance(
            "System initializing complete. Welcome, to M-works, system."
        );
        voice.rate = 0.9;
        voice.pitch = 0.6;
        speechSynthesis.speak(voice);
    }, 2500);
});

    let currentIndex = 0;

function goTo(index) {
    currentIndex = index;
    document.getElementById("slider").style.transform =
        `translateX(-${index * 100}%)`;
}

/* 🧠 Swipe support (mobile) */
let startX = 0;

document.getElementById("slider").addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

document.getElementById("slider").addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) goTo(Math.min(currentIndex + 1, 3));
    if (endX - startX > 50) goTo(Math.max(currentIndex - 1, 0));
});

    
// play after loading screen
setTimeout(systemVoice, 3000);

        function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        const visiblePoint = 100;

        if (elementTop < windowHeight - visiblePoint) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);