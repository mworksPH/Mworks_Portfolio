// ================= LOADING =================
const progress = document.getElementById("progress");
const loading = document.getElementById("loading-screen");
const loadText = document.getElementById("loadText");

let load = 0;

let interval = setInterval(() => {
    load += Math.random() * 8; // smoother random speed

    if (load > 100) load = 100;

    progress.style.width = load + "%";
    loadText.innerText = Math.floor(load) + "%";

    if (load === 100) {
        clearInterval(interval);

        setTimeout(() => {
            loading.style.opacity = "0";
            loading.style.transition = "0.5s";

            setTimeout(() => {
                loading.style.display = "none";
            }, 500);
        }, 500);
    }
}, 120);

// ================= PARTICLES =================
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


// ================= CURSOR GLOW =================
const cursor = document.querySelector(".cursor-glow");

if (cursor) {
    document.addEventListener("mousemove", e => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
}


// ================= LIGHTNING EFFECT =================
setInterval(() => {
    if (Math.random() > 0.8) {
        document.body.style.background = "#fff";
        setTimeout(() => {
            document.body.style.background = "#05070f";
        }, 100);
    }
}, 3000);


// ================= PROFILE INTRO =================
window.addEventListener("load", () => {
    const card = document.querySelector(".profile-card");

    if (card) {
        card.style.opacity = 0;
        card.style.transform = "translateY(40px)";

        setTimeout(() => {
            card.style.transition = "1s ease";
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
        }, 2000);
    }
});


// ================= SYSTEM VOICE =================
function systemVoice(text = "Hunter awakened") {
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 0.9;
    msg.pitch = 0.6;
    msg.volume = 1;
    speechSynthesis.speak(msg);
}


// ================= LEVEL SYSTEM =================
let exp = 0;
let level = 1;

function levelUp() {
    const popup = document.getElementById("level-up");
    if (!popup) return;

    const audio = new Audio("https://www.myinstants.com/media/sounds/arise-solo-leveling.mp3");
    audio.play().catch(() => {});

    popup.classList.add("show");

    setTimeout(() => {
        popup.classList.remove("show");
    }, 2000);
}

function gainExp(amount) {
    exp += amount;

    if (exp >= 100) {
        exp = 0;
        level++;
        levelUp();
        systemVoice("Level up");
    }

    const lvl = document.getElementById("level");
    const bar = document.getElementById("exp-fill");

    if (lvl) lvl.innerText = level;
    if (bar) bar.style.width = exp + "%";
}


// ================= RANK UP =================
function rankUp() {
    const rank = document.querySelector(".rank");
    const img = document.getElementById("profileImg");
    const smoke = document.querySelector(".smoke");
    

    if (!rank || !img || !smoke) return;

    if (rank.textContent === "RANK E") {
        rank.textContent = "RANK S";
        rank.classList.add("upgraded");
        img.src = "images/hover_profile.jpg";

        // 🔥 SMOKE EFFECT
        smoke.classList.add("active");
        setTimeout(() => {
            smoke.classList.remove("active");
        }, 1500);

        levelUp();
        systemVoice("Rank upgraded");
    }
}

// ================= SHADOW EFFECT =================
for (let i = 0; i < 30; i++) {
    const s = document.createElement("div");
    s.classList.add("shadow");
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDuration = (3 + Math.random() * 5) + "s";
    document.body.appendChild(s);
}


// ================= MODAL =================
function openDungeon(name) {
    const modal = document.getElementById("modal");
    const title = document.getElementById("modal-title");

    if (modal) modal.style.display = "flex";
    if (title) title.innerText = name;
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
}


// ================= SLIDER =================
let currentIndex = 0;

function goTo(index) {
    const slider = document.getElementById("slider");
    if (!slider) return;

    currentIndex = index;
    slider.style.transform = `translateX(-${index * 100}%)`;
}


// ================= SWIPE =================
const sliderEl = document.getElementById("slider");

if (sliderEl) {
    let startX = 0;

    sliderEl.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    sliderEl.addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) goTo(Math.min(currentIndex + 1, 3));
        if (endX - startX > 50) goTo(Math.max(currentIndex - 1, 0));
    });
}


// ================= REVEAL SCROLL =================
function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);


// ================= STARTUP =================
window.addEventListener("load", () => {
    setTimeout(() => {
        systemVoice("System initialized. Welcome to M-Works.");
    }, 2500);
});

setTimeout(systemVoice, 3000);
setTimeout(levelUp, 5000);

function createFire() {
    const fire = document.getElementById("fireEffect");

    fire.innerHTML = ""; // reset

    for (let i = 0; i < 20; i++) {
        let flame = document.createElement("span");

        flame.style.left = Math.random() * 100 + "%";
        flame.style.bottom = "0px";
        flame.style.animationDelay = Math.random() + "s";

        fire.appendChild(flame);
    }
}

function openTab(tab) {
  const screen = document.getElementById("screen");

  const views = {
    profile: ` <!-- 🧪 PROFILE DETAILS -->
        <h2 class="glow">Profile</h2>
        <p class="level-box">
            I am an Electronics Engineer specializing in embedded systems, IoT development,
            and circuit design. I design and build intelligent systems using microcontrollers
            such as Arduino and ESP32, integrating hardware and software to solve real-world problems.
            <br>
            <br>
            My work focuses on developing efficient, reliable, and scalable electronic solutions,<br>
            from sensor-based monitoring systems to automation and robotics.
        </p>
    `,

    skills: `
<!-- 🧪 IT SKILLS -->

        <h2 class="profile">💻 IT Skills</h2><br>

    <div class="skills-grid">
        
         <div class="slide-card">
            <div class="slide-card-inner">
                 <div class="slide-card-front">
                     <div class="skill">Networking (TCP/IP, routing, switching)</div>
                 </div>
             </div>
        </div>



         <div class="slide-card">
            <div class="slide-card-inner">
                 <div class="slide-card-front">
                     <div class="skill">Web Development (HTML, CSS, JavaScript frameworks)</div>
                 </div>
             </div>
        </div>

       
       
        <div class="slide-card">
            <div class="slide-card-inner">
                 <div class="slide-card-front">
                     <div class="skill">Installing and configuring (Windows, Linux)</div>

                 </div>
             </div>
        </div>
   
    </div>

<!-- 🧪 ELECTRONICS SKILLS -->
    <h2 class="profile">🔌 Electronics Skills</h2>
 <div class="skills-grid">
    <div class="slide-card">
         <div class="slide-card-inner">
             <div class="slide-card-front">
                 <div class="skill">Circuit Design & Analysis</div>
            </div>
        </div>
     </div>

      <div class="slide-card">
         <div class="slide-card-inner">
             <div class="slide-card-front">
                <div class="skill">Microcontroller Programming (Arduino, ESP32)</div>
            </div>
        </div>
     </div>

     <div class="slide-card">
         <div class="slide-card-inner">
             <div class="slide-card-front">
                <div class="skill">Troubleshooting & Repair</div>
            </div>
        </div>
     </div>

     <div class="slide-card">
         <div class="slide-card-inner">
             <div class="slide-card-front">
                <div class="skill">Reading Schematics & Datasheets</div>
            </div>
        </div>
     </div>
 </div> `,

    projects: `  <!-- 🧪 PROJECTS -->
<section id="projects">
        <h2 class="glow">Projects</h2>
        <div class="project">Smart Carwash Vendo</div>
    <div class="video-container">
        <iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F3002494513294591%2F&show_text=false&width=267&t=0" width="480" height="720" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
    </div>

        <div class="project">Blinking LED</div>
    <div class="video-container">
        <iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1624359471941712%2F&show_text=false&width=267&t=0" width="480" height="720" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
    </div>

        <div class="project">Wifi Controlled Relay</div>
       <div class="video-container">  
        <iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1889646231565460%2F&show_text=false&width=267&t=0" width="480" height="720" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
                allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
       </div>
            </section>
`,

    achievements: `
       <!-- 🧪 CERTIFICATES -->
   <section id="certificates">
        <h2 class="glow">📜 Certificates</h2>
        <img class="skill" src="images/ElectronicsNCII.jpg" width="420" height="420" />
        <img class="skill" src="images/MechatronicsNCII.jpg" width="420" height="420"/>
    
</section>`,
    contacts: ` <!-- ================= CONTACT ================= -->
    <section id="contact">
       

        <div class="contact-box">
            <h2 class="glow">SOCIAL SYSTEM</h2>
            <!-- FB CONTACT -->
            <span class="glow">
                Facebook :
                <a href="https://www.facebook.com/MworkssPH" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                    </svg>

                </a>
            </span>
            <!-- TIKTOK CONTACT -->
            &nbsp;&nbsp;&nbsp;<span class="glow">
                Tiktok :
                <a href="https://tiktok.com/@mworksph" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
                        <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                    </svg>
                </a>
            </span>

            <!-- GITHUB CONTACT -->
            &nbsp;&nbsp;&nbsp;<span class="glow">
                Github :
                <a href="https://github.com/mworksPH" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                    </svg>
                </a>
            </span>
        </div>
    </section>
`
  };

  screen.innerHTML = views[tab] || "SYSTEM ERROR";
}