// Партиклы
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
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

// Обновление счетчика продуктов
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

// Динамический год в футере
function updateCopyrightYear() {
    const copyright = document.querySelector('.footer-copyright');
    if (copyright) {
        const year = new Date().getFullYear();
        copyright.innerHTML = copyright.innerHTML.replace('2026', year);
    }
}

// Прямые ссылки на последние версии
const latestVersions = {
    store: {
        title: "FusionTools Store",
        url: "https://github.com/devovv/FusionTools-Store/releases/download/FusionToolsStore1.7/FusionToolsStoreInstaller.exe"
    },
    translate: {
        title: "FusionTools Translate",
        url: "https://github.com/devovv/FusionTools-Translator/releases/download/FusionToolsTranslator1.1/FusionToolsTranslatorInstaller.exe"
    },
    browser: {
        title: "FusionTools Browser",
        url: "https://github.com/devovv/FusionTools-Browser-Android/releases/download/FusionToolsBrowserAndroid2.3/FusionToolsBrowser.apk"
    }
};

// Обработка скачивания - сразу последняя версия
function setupDownloadButtons() {
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const product = this.getAttribute('data-product');
            const config = latestVersions[product];
            
            if (config && config.url) {
                // Открываем ссылку в новой вкладке
                window.open(config.url, '_blank');
                
                // Показываем небольшое уведомление (опционально)
                showToast(`📦 Скачивание ${config.title} началось...`);
            } else {
                showToast(`❌ Ошибка: ссылка для ${product} не найдена`);
            }
        });
    });
}

// Простое уведомление (тост)
function showToast(message) {
    // Удаляем существующий тост
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Создаём новый тост
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.9);
        color: #ff6b9d;
        padding: 12px 24px;
        border-radius: 40px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        backdrop-filter: blur(10px);
        border: 1px solid #ff3366;
        animation: toastFade 2.5s ease forwards;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    document.body.appendChild(toast);
    
    // Удаляем тост через 2.5 секунды
    setTimeout(() => {
        if (toast && toast.parentNode) {
            toast.remove();
        }
    }, 2500);
}

// Добавляем CSS анимацию для тоста
function addToastStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes toastFade {
            0% {
                opacity: 0;
                transform: translateX(-50%) translateY(20px);
            }
            15% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            85% {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
            100% {
                opacity: 0;
                transform: translateX(-50%) translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Обновление ссылок GitHub на релизы
function updateGithubLinks() {
    const githubBtns = document.querySelectorAll('.btn-github');
    const products = ['store', 'translate', 'browser'];
    const productNames = {
        store: 'FusionTools-Store',
        translate: 'FusionTools-Translator',
        browser: 'FusionTools-Browser-Android'
    };
    
    githubBtns.forEach((btn, index) => {
        const productKey = products[index];
        if (productKey) {
            const repoName = productNames[productKey];
            btn.href = `https://github.com/devovv/${repoName}/releases`;
        }
    });
}

// Консольное приветствие
function consoleGreeting() {
    console.log('%c🦩 FusionTools — Инструменты для вашего ПК', 'color: #ff6b9d; font-size: 16px; font-weight: bold;');
    console.log('%cВсе инструменты бесплатны и с открытым исходным кодом', 'color: #888; font-size: 12px;');
    console.log('%c📦 FusionTools Store: последняя версия v1.7', 'color: #ff6b9d; font-size: 12px;');
    console.log('%c🌍 FusionTools Translate: последняя версия v1.1', 'color: #ff6b9d; font-size: 12px;');
    console.log('%c🌐 FusionTools Browser: последняя версия v2.0', 'color: #ff6b9d; font-size: 12px;');
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    smoothScroll();
    scrollAnimation();
    updateProductCount();
    updateCopyrightYear();
    setupDownloadButtons();
    updateGithubLinks();
    addToastStyles();
    consoleGreeting();
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
});