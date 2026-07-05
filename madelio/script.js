/*==================================================
MADELIO
Birthday Website
Version 2.0 (revised)
==================================================*/

"use strict";

/*==================================================
CONFIG
==================================================*/

const CONFIG = {

    // Website unlocks at this exact moment (WIB / GMT+7)
    unlockDate: "2026-07-07T00:00:00+07:00",

    // false = real lock screen + countdown until unlockDate
    // true  = skip the lock (useful only while you're testing)
    demoMode: false,

    typingSpeed: 35,
    fadeDuration: 800

};

/*==================================================
DOM
==================================================*/

const loader = document.getElementById("loader");
const loadingFill = document.getElementById("loadingFill");
const lockScreen = document.getElementById("lockScreen");
const countdown = document.getElementById("countdown");
const website = document.getElementById("website");

const openGift = document.getElementById("openGift");
const musicButton = document.getElementById("musicButton");
const backgroundMusic = document.getElementById("backgroundMusic");
const paperSound = document.getElementById("paperSound");
const clickSound = document.getElementById("clickSound");

/*==================================================
APP STATE
==================================================*/

const APP = {
    loaded:false,
    unlocked:false,
    music:false
};

/*==================================================
LOADER
==================================================*/

function startLoader(){

    let progress=0;

    const timer=setInterval(()=>{

        progress++;
        loadingFill.style.width=progress+"%";

        if(progress>=100){
            clearInterval(timer);
            hideLoader();
        }

    },18);

}

function hideLoader(){

    loader.style.opacity="0";
    loader.style.pointerEvents="none";

    setTimeout(()=>{
        loader.style.display="none";
        APP.loaded=true;
        initLockScreen();
    },800);

}

/*==================================================
LOCK SCREEN
==================================================*/

function initLockScreen(){

    if(CONFIG.demoMode){
        unlockWebsite();
        return;
    }

    updateCountdown();
    setInterval(updateCountdown,1000);

}

function updateCountdown(){

    const target=new Date(CONFIG.unlockDate).getTime();
    const now=new Date().getTime();
    const distance=target-now;

    if(distance<=0){
        unlockWebsite();
        return;
    }

    const day=Math.floor(distance/86400000);
    const hour=Math.floor((distance%86400000)/3600000);
    const minute=Math.floor((distance%3600000)/60000);
    const second=Math.floor((distance%60000)/1000);

    countdown.innerHTML=`
    <div class="time-box"><span>${day}</span><small>Days</small></div>
    <div class="time-box"><span>${String(hour).padStart(2,"0")}</span><small>Hours</small></div>
    <div class="time-box"><span>${String(minute).padStart(2,"0")}</span><small>Minutes</small></div>
    <div class="time-box"><span>${String(second).padStart(2,"0")}</span><small>Seconds</small></div>
    `;

}

/*==================================================
UNLOCK
==================================================*/

function unlockWebsite(){

    if(APP.unlocked) return;
    APP.unlocked=true;

    lockScreen.classList.add("fade-out");

    setTimeout(()=>{
        lockScreen.style.display="none";
        website.style.display="block";
        website.classList.add("fade-in");
        revealItems.forEach(section=>revealObserver.observe(section));
    },800);

}

/*==================================================
OPEN GIFT
==================================================*/

if(openGift){
    openGift.addEventListener("click",()=>{
        playClick();
        document.getElementById("storyIntro").scrollIntoView({ behavior:"smooth" });
    });
}

/*==================================================
CONTINUE BUTTON (story intro)
==================================================*/

const continueButton = document.getElementById("continueButton");

if(continueButton){
    continueButton.addEventListener("click",()=>{
        playClick();
        document.getElementById("envelopeSection").scrollIntoView({ behavior:"smooth" });
    });
}

/*==================================================
SOUND HELPERS
==================================================*/

function playClick(){
    if(!clickSound) return;
    clickSound.currentTime=0;
    clickSound.play().catch(()=>{});
}

function playPaper(){
    if(!paperSound) return;
    paperSound.currentTime=0;
    paperSound.play().catch(()=>{});
}

/*==================================================
MUSIC TOGGLE
==================================================*/

if(musicButton){
    musicButton.addEventListener("click",toggleMusic);
}

function toggleMusic(){

    if(APP.music){
        backgroundMusic.pause();
        APP.music=false;
        musicButton.innerHTML="🎵 Music";
    }
    else{
        backgroundMusic.play().catch(()=>{});
        APP.music=true;
        musicButton.innerHTML="⏸ Pause";
    }

}

/*==================================================
ENVELOPE ENGINE
==================================================*/

const envelope=document.getElementById("envelope");
const openLetterButton=document.getElementById("openLetterButton");
const letterSection=document.getElementById("letterSection");

let letterOpened=false;

function openLetter(){

    if(letterOpened) return;
    letterOpened = true;

    playPaper();
    envelope.classList.add("open");

    setTimeout(()=>{

        letterSection.scrollIntoView({ behavior:"smooth", block:"start" });

        setTimeout(()=>{
            startTyping();
        },800);

    },1400);

}

if(openLetterButton){
    openLetterButton.addEventListener("click",openLetter);
}

if(envelope){
    envelope.addEventListener("click",openLetter);
}

/*==================================================
SCROLL REVEAL
==================================================*/

const revealItems=document.querySelectorAll(".section");

const revealObserver=new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });

},{ threshold:.2 });

/*==================================================
RESTART / REPLAY
==================================================*/

const restart=document.getElementById("restartStory");

if(restart){
    restart.addEventListener("click",()=>{
        window.scrollTo({ top:0, behavior:"smooth" });
    });
}

/*==================================================
BOOT
==================================================*/

window.addEventListener("load",()=>{
    startLoader();
    initStarfield();
});

/*==================================================
TYPEWRITER ENGINE
==================================================*/

const typingArea = document.getElementById("typingArea");

const birthdayLetter = [

`Happy Birthday, my daling. 🤍🎂`,

`Selamat ulang tahun yaa, Bubu.`,

`Hari ini adalah hari lahir orang yang paling aku syukuri hadir di hidupku. Makasih yaa udah jadi seseorang yang selalu bikin hari-hariku terasa lebih ringan. Makasih karena selalu bertahan, selalu ngusahain kita, dan selalu milih buat tetap ada, bahkan di saat hubungan kita lagi nggak baik-baik aja.`,

`Aku tahu kita nggak selalu mulus. Kadang sama-sama capek, sama-sama keras kepala, sama-sama bikin kesel. Tapi di balik semua itu, aku selalu ngerasa kalau kamu adalah tempat yang paling nyaman buat pulang. Dan itu yang bikin aku nggak pernah nyesel punya kamu.`,

`Di umur yang baru ini, aku cuma pengen Bubu selalu sehat, bahagia, dipermudah semua urusannya, dilancarkan rezekinya, dan semua mimpi yang lagi diperjuangin satu per satu bisa tercapai.`,

`Jangan pernah ngeraguin diri sendiri yaa, karena aku selalu percaya kalau Bubu jauh lebih hebat dari yang Bubu kira.`,

`Kalau nanti ada hari yang berat, jangan dipendem sendiri. Cerita ke aku yaa. Aku mungkin nggak selalu punya solusi, tapi aku bakal selalu ada buat nemenin Bubu ngelewatin semuanya.`,

`Seneng, sedih, capek, gagal, berhasil, aku pengennya kita lewatin bareng-bareng.`,

`Terima kasih udah jadi alasan aku buat terus semangat setiap hari.`,

`Terima kasih udah bikin aku ngerasain rasanya punya rumah dalam bentuk seseorang.`,

`Semoga di usia yang baru ini, kita sama-sama tumbuh jadi versi terbaik dari diri kita, dan semoga aku masih terus dikasih kesempatan buat nemenin Bubu di setiap ulang tahunnya nanti.`,

`I love you so much, my daling. Happy birthday, Bubu. Please stay with me for a very, very long time. 🤍🫶🏻`

];

let paragraphIndex = 0;
let characterIndex = 0;
let currentParagraph;
let typingStarted = false;

function startTyping(){

    if(typingStarted) return;
    typingStarted=true;

    typingArea.innerHTML="";
    paragraphIndex=0;
    nextParagraph();

}

function nextParagraph(){

    if(paragraphIndex>=birthdayLetter.length){
        finishLetter();
        return;
    }

    currentParagraph=document.createElement("p");
    currentParagraph.className="typing-paragraph";
    typingArea.appendChild(currentParagraph);

    characterIndex=0;
    typeCharacter();

}

function typeCharacter(){

    const text=birthdayLetter[paragraphIndex];

    if(characterIndex<text.length){

        currentParagraph.innerHTML += text.charAt(characterIndex);
        characterIndex++;

        currentParagraph.scrollIntoView({ behavior:"smooth", block:"end" });

        setTimeout(typeCharacter, CONFIG.typingSpeed);

    }
    else{
        currentParagraph.classList.add("done");
        paragraphIndex++;
        setTimeout(nextParagraph, 900);
    }

}

function finishLetter(){

    startCelebration();

    document.getElementById("gallerySection").scrollIntoView({ behavior:"smooth" });

}

/*==================================================
GALLERY ENGINE
==================================================*/

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightboxOverlay");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("closeLightbox");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxPrev = document.getElementById("lightboxPrev");

let galleryIndex = 0;
const galleryData = [];

galleryImages.forEach((image,index)=>{

    galleryData.push({ src:image.getAttribute("src"), caption:image.alt });

    image.addEventListener("click",()=>{
        openGallery(index);
    });

});

function openGallery(index){
    galleryIndex=index;
    updateGallery();
    lightbox.classList.add("show");
    document.body.style.overflow="hidden";
}

function updateGallery(){
    lightboxImage.src = galleryData[galleryIndex].src;
    lightboxCaption.innerHTML = galleryData[galleryIndex].caption;
}

function nextPhoto(){
    galleryIndex++;
    if(galleryIndex>=galleryData.length) galleryIndex=0;
    updateGallery();
}

function previousPhoto(){
    galleryIndex--;
    if(galleryIndex<0) galleryIndex=galleryData.length-1;
    updateGallery();
}

function closeGallery(){
    lightbox.classList.remove("show");
    document.body.style.overflow="";
}

if(lightboxNext) lightboxNext.addEventListener("click",nextPhoto);
if(lightboxPrev) lightboxPrev.addEventListener("click",previousPhoto);
if(lightboxClose) lightboxClose.addEventListener("click",closeGallery);

if(lightbox){
    lightbox.addEventListener("click",(e)=>{
        if(e.target===lightbox) closeGallery();
    });
}

document.addEventListener("keydown",(e)=>{

    if(!lightbox || !lightbox.classList.contains("show")) return;

    switch(e.key){
        case "ArrowRight": nextPhoto(); break;
        case "ArrowLeft": previousPhoto(); break;
        case "Escape": closeGallery(); break;
    }

});

/*==================================================
CELEBRATION ENGINE (confetti)
==================================================*/

const confettiCanvas = document.getElementById("confettiCanvas");
const confettiCtx = confettiCanvas.getContext("2d");
let confetti = [];
let confettiRunning = false;

function resizeConfetti(){
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

resizeConfetti();
window.addEventListener("resize",resizeConfetti);

function createConfetti(){

    confetti=[];

    for(let i=0;i<220;i++){

        confetti.push({
            x:Math.random()*confettiCanvas.width,
            y:-Math.random()*confettiCanvas.height,
            r:4+Math.random()*8,
            vx:-2+Math.random()*4,
            vy:2+Math.random()*5,
            rotate:Math.random()*360,
            vr:-3+Math.random()*6,
            color:["#ff6fa8","#ffd166","#ffffff","#87cefa","#ff9ed1"][Math.floor(Math.random()*5)]
        });

    }

}

function drawConfetti(){

    confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);

    confetti.forEach(c=>{

        confettiCtx.save();
        confettiCtx.translate(c.x,c.y);
        confettiCtx.rotate(c.rotate*Math.PI/180);
        confettiCtx.fillStyle=c.color;
        confettiCtx.fillRect(-c.r/2,-c.r/2,c.r,c.r);
        confettiCtx.restore();

        c.x+=c.vx;
        c.y+=c.vy;
        c.rotate+=c.vr;

        if(c.y>confettiCanvas.height+20) c.y=-20;

    });

    if(confettiRunning){
        requestAnimationFrame(drawConfetti);
    }

}

let confettiTimeout;

function startCelebration(){

    createConfetti();

    if(!confettiRunning){
        confettiRunning=true;
        drawConfetti();
    }

    createHearts();
    createFlowers();

    // Let confetti settle after ~9 seconds so it doesn't run forever
    clearTimeout(confettiTimeout);
    confettiTimeout=setTimeout(()=>{
        confettiRunning=false;
        confettiCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    },9000);

}

/*==================================================
FLOATING HEARTS / FLOWERS
==================================================*/

function createHearts(){

    const wrap=document.getElementById("floatingHearts");
    if(!wrap) return;

    for(let i=0;i<30;i++){

        const heart=document.createElement("div");
        heart.className="heart";
        heart.innerHTML="🤍";
        heart.style.left=Math.random()*100+"vw";
        heart.style.animationDelay=Math.random()*6+"s";
        heart.style.fontSize=(18+Math.random()*26)+"px";

        wrap.appendChild(heart);

        setTimeout(()=>heart.remove(), 14000);

    }

}

function createFlowers(){

    const wrap=document.getElementById("floatingFlowers");
    if(!wrap) return;

    for(let i=0;i<32;i++){

        const flower=document.createElement("div");
        flower.className="flower";
        flower.innerHTML="🌸";
        flower.style.left=Math.random()*100+"vw";
        flower.style.animationDelay=Math.random()*8+"s";
        flower.style.fontSize=(18+Math.random()*20)+"px";

        wrap.appendChild(flower);

        setTimeout(()=>flower.remove(), 18000);

    }

}

/*==================================================
STARFIELD + METEORS (ambient night sky)
==================================================*/

let starsCanvas, starsCtx, meteorCanvas, meteorCtx;
let stars = [];
let meteors = [];

function initStarfield(){

    starsCanvas = document.getElementById("starsCanvas");
    meteorCanvas = document.getElementById("meteorCanvas");

    if(!starsCanvas || !meteorCanvas) return;

    starsCtx = starsCanvas.getContext("2d");
    meteorCtx = meteorCanvas.getContext("2d");

    resizeStarfield();
    window.addEventListener("resize", resizeStarfield);

    requestAnimationFrame(animateStarfield);
    scheduleMeteor();

}

function resizeStarfield(){

    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    meteorCanvas.width = window.innerWidth;
    meteorCanvas.height = window.innerHeight;

    buildStars();

}

function buildStars(){

    const count = Math.floor((starsCanvas.width*starsCanvas.height)/9000);

    stars = [];

    for(let i=0;i<count;i++){

        stars.push({
            x:Math.random()*starsCanvas.width,
            y:Math.random()*starsCanvas.height,
            r:Math.random()*1.6+.4,
            baseAlpha:Math.random()*.6+.3,
            twinkleSpeed:Math.random()*.02+.005,
            phase:Math.random()*Math.PI*2
        });

    }

}

function animateStarfield(time){

    starsCtx.clearRect(0,0,starsCanvas.width,starsCanvas.height);

    stars.forEach(star=>{

        const alpha = star.baseAlpha + Math.sin(time*star.twinkleSpeed + star.phase)*.3;

        starsCtx.beginPath();
        starsCtx.arc(star.x,star.y,star.r,0,Math.PI*2);
        starsCtx.fillStyle = `rgba(255,255,255,${Math.max(0,Math.min(1,alpha))})`;
        starsCtx.fill();

    });

    drawMeteors();

    requestAnimationFrame(animateStarfield);

}

function scheduleMeteor(){

    const delay = 3000 + Math.random()*5000;

    setTimeout(()=>{
        spawnMeteor();
        scheduleMeteor();
    }, delay);

}

function spawnMeteor(){

    const startX = Math.random()*meteorCanvas.width*0.7 + meteorCanvas.width*0.15;

    meteors.push({
        x:startX,
        y:-20,
        length:Math.random()*80+120,
        speed:Math.random()*8+10,
        angle:Math.PI/4,
        life:1
    });

}

function drawMeteors(){

    meteorCtx.clearRect(0,0,meteorCanvas.width,meteorCanvas.height);

    meteors.forEach(m=>{

        const dx = Math.cos(m.angle)*m.length;
        const dy = Math.sin(m.angle)*m.length;

        const gradient = meteorCtx.createLinearGradient(m.x,m.y,m.x-dx,m.y-dy);
        gradient.addColorStop(0, `rgba(255,255,255,${m.life})`);
        gradient.addColorStop(1, `rgba(255,255,255,0)`);

        meteorCtx.strokeStyle = gradient;
        meteorCtx.lineWidth = 2;
        meteorCtx.beginPath();
        meteorCtx.moveTo(m.x,m.y);
        meteorCtx.lineTo(m.x-dx,m.y-dy);
        meteorCtx.stroke();

        m.x += Math.cos(m.angle)*m.speed;
        m.y += Math.sin(m.angle)*m.speed;
        m.life -= 0.012;

    });

    meteors = meteors.filter(m => m.life>0 && m.y < meteorCanvas.height+100);

}
