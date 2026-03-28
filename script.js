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

// Конфигурация версий для каждого продукта
const productVersions = {
    store: {
        title: "FusionTools Store",
        platforms: [
            { 
                icon: "🪟", 
                name: "Windows", 
                desc: "Выберите версию",
                versions: [
                    { name: "v1.6 (стабильная)", url: "https://github.com/devovv/FusionTools-Store/releases/download/FusionToolsStore1.6/FusionToolsStoreInstaller.exe" },
                    { name: "v1.5", url: "https://github.com/devovv/FusionTools-Store/releases/download/FusionToolsStore1.5/FusionToolsStoreInstaller.exe" },
                    { name: "v1.4", url: "https://github.com/devovv/FusionTools-Store/releases/download/FusionToolsStore1.4/CloudPlayInstaller.exe" },
                    { name: "v1.3", url: "https://github.com/devovv/FusionTools-Store/releases/download/FusionToolsStore1.3/CloudPlayInstaller.exe" },
                    { name: "v1.2", url: "https://github.com/devovv/FusionTools-Store/releases/download/FusionToolsStore1.2/CloudPlayInstaller.exe" },
                    { name: "v1.1", url: "https://github.com/devovv/FusionTools-Store/releases/download/CloudPlay1.1/CloudPlayInstaller.exe" },
                    { name: "v1.0", url: "https://github.com/devovv/FusionTools-Store/releases/download/FusionToolsStore1.0/CloudPlayInstaller.exe" }
                ]
            }
        ]
    },
    translate: {
        title: "FusionTools Translate",
        platforms: [
            { 
                icon: "🪟", 
                name: "Windows", 
                desc: "Выберите версию",
                versions: [
                    { name: "v1.1", url: "https://github.com/devovv/FusionTools-Translator/releases/download/FusionToolsTranslator1.1/FusionToolsTranslatorInstaller.exe" },
                    { name: "v1.0", url: "https://github.com/devovv/FusionTools-Translator/releases/download/FusionToolsTranslator1.0/FusionTools.Translator.Installer.exe" }
                ]
            }
        ]
    },
    browser: {
        title: "FusionTools Browser",
        platforms: [
            { 
                icon: "📱", 
                name: "Android", 
                desc: "Выберите версию",
                versions: [
                    { name: "v1.1 (стабильная)", url: "https://github.com/devovv/FusionTools-Browser-Android/releases/download/FusionToolsBrowserAndroid1.1/FusionToolsBrowser.apk" },
                    { name: "v1.0", url: "https://github.com/devovv/FusionTools-Browser-Android/releases/download/v1.0/FusionToolsBrowser.apk" }
                ]
            },
            { 
                icon: "🪟", 
                name: "Windows", 
                desc: "Скоро",
                versions: [
                    { name: "В разработке", url: "#", disabled: true }
                ]
            }
        ]
    }
};

// Модальное окно для скачивания с выбором версий
function setupDownloadModal() {
    const modal = document.getElementById('downloadModal');
    const modalTitle = document.getElementById('modalTitle');
    const platformButtons = document.getElementById('platformButtons');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    if (!modal) return;
    
    // Находим все кнопки "Скачать"
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.onclick = function() {
            const product = this.getAttribute('data-product');
            const config = productVersions[product];
            
            if (config) {
                modalTitle.innerHTML = `🦩 ${config.title}`;
                
                // Генерируем кнопки платформ
                platformButtons.innerHTML = '';
                config.platforms.forEach(platform => {
                    const platformDiv = document.createElement('div');
                    platformDiv.className = 'platform-group';
                    
                    const platformBtn = document.createElement('button');
                    platformBtn.className = 'platform-btn';
                    platformBtn.innerHTML = `
                        <span class="platform-icon">${platform.icon}</span>
                        <span class="platform-name">${platform.name}</span>
                        <span class="platform-desc">${platform.desc}</span>
                        <span class="platform-arrow">▼</span>
                    `;
                    
                    const versionsDiv = document.createElement('div');
                    versionsDiv.className = 'versions-list';
                    versionsDiv.style.display = 'none';
                    
                    platform.versions.forEach(version => {
                        const versionBtn = document.createElement('button');
                        versionBtn.className = 'version-btn';
                        if (version.disabled) {
                            versionBtn.classList.add('version-btn-disabled');
                            versionBtn.disabled = true;
                        }
                        versionBtn.innerHTML = version.name;
                        if (!version.disabled) {
                            versionBtn.onclick = function(e) {
                                e.stopPropagation();
                                window.open(version.url, '_blank');
                                modal.style.display = 'none';
                                document.body.style.overflow = 'auto';
                            };
                        }
                        versionsDiv.appendChild(versionBtn);
                    });
                    
                    platformBtn.onclick = function(e) {
                        e.stopPropagation();
                        const isOpen = versionsDiv.style.display === 'block';
                        // Закрываем все открытые
                        document.querySelectorAll('.versions-list').forEach(list => {
                            list.style.display = 'none';
                        });
                        // Открываем/закрываем текущий
                        versionsDiv.style.display = isOpen ? 'none' : 'block';
                        platformBtn.querySelector('.platform-arrow').innerHTML = isOpen ? '▼' : '▲';
                    };
                    
                    platformDiv.appendChild(platformBtn);
                    platformDiv.appendChild(versionsDiv);
                    platformButtons.appendChild(platformDiv);
                });
                
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        };
    });
    
    // Закрытие модального окна
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
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
    console.log('%c📦 FusionTools Store: 7 версий', 'color: #ff6b9d; font-size: 12px;');
    console.log('%c🌍 FusionTools Translate: 2 версии', 'color: #ff6b9d; font-size: 12px;');
    console.log('%c🌐 FusionTools Browser: Android v1.1 готов, Windows в разработке', 'color: #ff6b9d; font-size: 12px;');
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    smoothScroll();
    scrollAnimation();
    updateProductCount();
    updateCopyrightYear();
    setupDownloadModal();
    updateGithubLinks();
    consoleGreeting();
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
});