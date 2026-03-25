// Партиклы
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 5 + 2;
        const left = Math.random() * 100;
        const duration = Math.random() * 6 + 3;
        const delay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

// Активная навигация при скролле
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Плавный скролл
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Анимация при скролле
function scrollAnimation() {
    const cards = document.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Обновление счетчика продуктов с правильным склонением
function updateProductCount() {
    const count = document.querySelectorAll('.product-card').length;
    const badge = document.querySelector('.hero-badges .badge:first-child');
    if (badge) {
        let word = "продуктов";
        if (count === 1) word = "продукт";
        if (count >= 2 && count <= 4) word = "продукта";
        badge.innerHTML = `⭐ ${count} ${word}`;
    }
}

// Консольное приветствие
function consoleGreeting() {
    console.log('%c🦩 FusionTools — Инструменты для вашего ПК', 'color: #ff6b9d; font-size: 16px; font-weight: bold;');
    console.log('%cВсе инструменты бесплатны и с открытым исходным кодом', 'color: #888; font-size: 12px;');
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    smoothScroll();
    scrollAnimation();
    updateProductCount();
    consoleGreeting();
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
});