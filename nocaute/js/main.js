// --- FUNCIONALIDADES DE LOGIN ---

// Alternar abas no Login
function switchTab(type) {
    const tabs = document.querySelectorAll('.tab-btn');
    const btnSubmit = document.querySelector('.login-form button[type="submit"]');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    
    if(type === 'aluno') {
        tabs[0].classList.add('active');
        btnSubmit.textContent = 'Entrar como aluno';
        // Adicionamos um atributo para identificar o tipo de login no submit
        btnSubmit.setAttribute('data-type', 'aluno'); 
    } else {
        tabs[1].classList.add('active');
        btnSubmit.textContent = 'Entrar como instrutor';
        btnSubmit.setAttribute('data-type', 'instrutor');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById("heroCarousel");
    if (!carousel) return;


    const slides = Array.from(
        carousel.querySelectorAll(".hero-slide")
    );


    const dots = Array.from(
        carousel.querySelectorAll(".hero-dot")
    );


    const previousButton = carousel.querySelector(".hero-prev");
    const nextButton = carousel.querySelector(".hero-next");


    if (slides.length < 2) return;


    let currentIndex = 0;
    let autoplayId = null;


    const autoplayDelay = 6000;


    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    // Usa a própria foto como fundo desfocado
    slides.forEach((slide) => {
        const img = slide.querySelector("img");


        if (img) {
            slide.style.setProperty(
                "--slide-background",
                url("${img.getAttribute("src")}")center / cover no-repeat
            );
        }
    });


    // Exibe a imagem escolhida
    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;


        slides.forEach((slide, i) => {
            const isActive = i === currentIndex;


            slide.classList.toggle("active", isActive);


            slide.setAttribute(
                "aria-hidden",
                String(!isActive)
            );
        });


        dots.forEach((dot, i) => {
            const isActive = i === currentIndex;


            dot.classList.toggle("active", isActive);


            dot.setAttribute(
                "aria-current",
                String(isActive)
            );
        });
    }


    // Para a reprodução automática
    function stopAutoplay() {
        if (autoplayId !== null) {
            window.clearInterval(autoplayId);
            autoplayId = null;
        }
    }


    // Avança automaticamente a cada 6 segundos
    function startAutoplay() {
        stopAutoplay();


        if (!reducedMotion.matches) {
            autoplayId = window.setInterval(
                () => showSlide(currentIndex + 1),
                autoplayDelay
            );
        }
    }


    // Botão de imagem anterior
    previousButton?.addEventListener("click", () => {
        showSlide(currentIndex - 1);
        startAutoplay();
    });


    // Botão de próxima imagem
    nextButton?.addEventListener("click", () => {
        showSlide(currentIndex + 1);
        startAutoplay();
    });


    // Clique nos indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startAutoplay();
        });
    });


    // Pausa quando o mouse está sobre o carrossel
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);


    // Pausa durante a navegação por teclado
    carousel.addEventListener("focusin", stopAutoplay);


    carousel.addEventListener("focusout", (event) => {
        if (!carousel.contains(event.relatedTarget)) {
            startAutoplay();
        }
    });


    // Pausa quando a página fica oculta
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });


    // Respeita mudanças na preferência de movimento
    reducedMotion.addEventListener?.("change", startAutoplay);


    // Inicializa na primeira imagem
    showSlide(0);
    startAutoplay();
});

// Simulação de Submissão de Formulário (Login)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita recarregamento da página
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        if (email && senha) {
            // Verifica qual aba está ativa verificando o atributo que criamos
            const btnSubmit = document.querySelector('.login-form button[type="submit"]');
            const loginType = btnSubmit.getAttribute('data-type') || 'aluno';

            if (loginType === 'aluno') {
                // Redireciona para o Dashboard do Aluno
                window.location.href = 'aluno.html';
            } else if (loginType === 'instrutor') {
                // Redireciona para o Dashboard do Instrutor
                window.location.href = 'instrutor.html';
            }
        }
    });
}