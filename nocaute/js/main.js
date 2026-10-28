
/* ==========================================
   CARROSSEL PRINCIPAL
   CT FABIANO MINEIRO - NOCAUTE
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector("#heroCarousel");

    // Verifica se o carrossel existe na página
    if (!carousel) return;

    const slides = Array.from(
        carousel.querySelectorAll(".hero-slide")
    );

    const dots = Array.from(
        carousel.querySelectorAll(".hero-dot")
    );

    const previousButton = carousel.querySelector(".hero-prev");
    const nextButton = carousel.querySelector(".hero-next");

    // Não continua se não houver imagens
    if (slides.length === 0) return;

    // Define a imagem de fundo desfocada de cada slide
    slides.forEach((slide) => {
        const img = slide.querySelector("img");

        if (!img) return;

        const imageUrl = img.getAttribute("src");

        slide.style.setProperty(
            "--slide-background",
            `url("${imageUrl}") center / cover no-repeat`
        );
    });

    // Identifica o slide inicialmente ativo
    let currentIndex = slides.findIndex((slide) =>
        slide.classList.contains("active")
    );

    if (currentIndex < 0) {
        currentIndex = 0;
    }

    let autoplayId = null;
    const autoplayDelay = 6000;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Exibe o slide escolhido e atualiza os indicadores
    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const isActive = i === currentIndex;

            slide.classList.toggle("active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        dots.forEach((dot, i) => {
            const isActive = i === currentIndex;

            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-current", String(isActive));
        });
    }

    // Avança para a próxima imagem
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Volta para a imagem anterior
    function previousSlide() {
        showSlide(currentIndex - 1);
    }

    // Interrompe a troca automática
    function stopAutoplay() {
        if (autoplayId !== null) {
            clearInterval(autoplayId);
            autoplayId = null;
        }
    }

    // Inicia a troca automática a cada 6 segundos
    function startAutoplay() {
        stopAutoplay();

        if (
            reducedMotion ||
            slides.length < 2 ||
            document.hidden
        ) {
            return;
        }

        autoplayId = setInterval(
            nextSlide,
            autoplayDelay
        );
    }

    // Permite selecionar uma imagem pelos indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startAutoplay();
        });
    });

    // Botão de avançar
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            nextSlide();
            startAutoplay();
        });
    }

    // Botão de voltar
    if (previousButton) {
        previousButton.addEventListener("click", () => {
            previousSlide();
            startAutoplay();
        });
    }

    // Pausa o carrossel quando o mouse estiver sobre ele
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    // Pausa enquanto o usuário navega pelos controles
    carousel.addEventListener("focusin", stopAutoplay);

    carousel.addEventListener("focusout", (event) => {
        if (!carousel.contains(event.relatedTarget)) {
            startAutoplay();
        }
    });

    // Pausa quando a aba do navegador fica oculta
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    // Inicializa o carrossel
    showSlide(currentIndex);
    startAutoplay();
});


/* ==========================================
   ALTERNÂNCIA DAS ABAS DE LOGIN
   ========================================== */

function switchTab(type) {
    const tabs = document.querySelectorAll(".tab-btn");
    const submitButton = document.querySelector(
        '.login-form button[type="submit"]'
    );

    tabs.forEach((tab) => {
        const isActive = tab.dataset.type === type;

        tab.classList.toggle("active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
    });

    if (submitButton) {
        submitButton.textContent =
            type === "aluno"
                ? "Entrar como Aluno"
                : "Entrar como Instrutor";

        submitButton.dataset.type = type;
    }
}


/* ==========================================
   FORMULÁRIO DE LOGIN
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailInput = document.querySelector("#email");
        const passwordInput = document.querySelector("#senha");

        if (!emailInput || !passwordInput) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {
            alert("Preencha o e-mail e a senha.");
            return;
        }

        const submitButton = loginForm.querySelector(
            'button[type="submit"]'
        );

        const type = submitButton?.dataset.type || "aluno";

        // Demonstração: não valida credenciais no servidor.
        if (type === "instrutor") {
            window.location.href = "instrutor.html";
        } else {
            window.location.href = "aluno.html";
        }
    });
});
