// Partículas de Fundo
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamanho aleatório
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição aleatória
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Duração e atraso aleatórios
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }
}

// Iniciar Experiência
document.getElementById('start-btn').addEventListener('click', function() {
    const welcomeScreen = document.getElementById('welcome-screen');
    const mainContent = document.getElementById('main-content');

    // Tocar a música local
    const audio = document.getElementById('bg-music');
    if (audio) {
        audio.volume = 0.5;
        audio.play().catch(e => console.log("Erro ao tocar áudio."));
    }

    // Animação de saída
    welcomeScreen.style.opacity = '0';
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        createParticles();
    }, 1000);
});

// Animações ao rolar a página (Scroll Reveal)
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Disparar ao carregar

// Lógica do Carrossel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next-btn');
const prevButton = document.querySelector('.prev-btn');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

// Posicionar os slides lado a lado
const setSlidePosition = (slide, index) => {
    slide.style.left = index * 100 + '%';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');

    // Gerenciar Autoplay e Vídeo
    if (window.carouselInterval) {
        clearInterval(window.carouselInterval);
    }

    const prevVideo = currentSlide.querySelector('video');
    if (prevVideo) {
        prevVideo.pause();
    }

    const nextVideo = targetSlide.querySelector('video');
    if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play();
        nextVideo.onended = () => {
            nextButton.click();
        };
    } else {
        window.carouselInterval = setInterval(() => {
            nextButton.click();
        }, 5000);
    }
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-indicator');
    targetDot.classList.add('current-indicator');
};

// Clicar na direita
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;
    
    // Se for o último, volta pro primeiro
    if (!nextSlide) {
        nextSlide = slides[0];
    }
    
    const currentDot = dotsNav.querySelector('.current-indicator');
    let nextDot = currentDot.nextElementSibling;
    if (!nextDot) nextDot = dots[0];

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
});

// Clicar na esquerda
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling;
    
    // Se for o primeiro, vai pro último
    if (!prevSlide) {
        prevSlide = slides[slides.length - 1];
    }
    
    const currentDot = dotsNav.querySelector('.current-indicator');
    let prevDot = currentDot.previousElementSibling;
    if (!prevDot) prevDot = dots[dots.length - 1];

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
});

// Clicar nas bolinhas
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-indicator');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
});

// Autoplay do Carrossel Inicial
window.carouselInterval = setInterval(() => {
    nextButton.click();
}, 5000); // Muda a cada 5 segundos

// Revelar Mensagem Secreta
document.getElementById('unlock-heart').addEventListener('click', function() {
    this.style.display = 'none';
    const message = document.getElementById('secret-message');
    message.classList.add('visible');
    
    // Soltar corações menores
    for(let i=0; i<15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.transform = `translate(-50%, -50%)`;
            heart.style.transition = 'all 1s ease-out';
            heart.style.zIndex = 100;
            
            document.querySelector('.letter-container').appendChild(heart);
            
            setTimeout(() => {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 150 + 50;
                heart.style.transform = `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`;
                heart.style.opacity = '0';
            }, 50);
            
            setTimeout(() => heart.remove(), 1050);
        }, i * 50);
    }
});
