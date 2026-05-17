/**
 * ==========================================================================
 * PROYECTO "ANTIGRAVITY LOVE" — EL MOTOR DE SUPER-COMPONENTES
 * main.js - Loader, Hydrator de 9 Módulos, Hub de Memorias y Decisores
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initAntigravityEngine();
    initLoaderScreen();
    initBackToTopButton();
    initHeaderNavigation();
});

function initBackToTopButton() {
    const btn = document.getElementById('btn-back-to-top');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar interferencias
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * 🌌 1. MOTOR GLOBAL DE ANTIGRAVEDAD (MEMORY-SAFE)
 */
function initAntigravityEngine() {
    const container = document.getElementById('antigravity-container');
    if (!container) return;

    const particleSpawnRate = 350;
    const maxParticles = 40;
    const fallbackSymbols = ['✨', '💖', '🌟', '🌸', '❤️', '💫'];

    function spawnParticle() {
        if (container.children.length >= maxParticles) return;

        const particle = document.createElement('div');
        particle.className = 'antigravity-particle';
        
        const size = Math.random() * 20 + 15;
        const posX = Math.random() * 100;
        const duration = Math.random() * 8 + 8;
        
        const isBrillantes = Math.random() > 0.5;
        particle.classList.add(isBrillantes ? 'brillo-intenso' : 'brillo-leve');

        particle.style.left = `${posX}vw`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        
        particle.textContent = fallbackSymbols[Math.floor(Math.random() * fallbackSymbols.length)];
        particle.style.display = 'flex';
        particle.style.justifyContent = 'center';
        particle.style.alignItems = 'center';
        particle.style.fontSize = `${size * 0.8}px`;
        particle.style.color = 'var(--color-highlight)';
        particle.style.textShadow = '0 0 10px var(--color-highlight)';

        particle.addEventListener('animationend', () => {
            particle.remove();
        });

        container.appendChild(particle);
    }

    setInterval(spawnParticle, particleSpawnRate);
}

/**
 * ⏳ 2. GESTOR DE LA PANTALLA DE CARGA (LOADER SCREEN)
 */
function initLoaderScreen() {
    const loader = document.getElementById('loader-screen');
    const bar = document.getElementById('loader-bar-fill');
    const status = document.getElementById('loader-status-text');
    if (!loader || !bar || !status) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 6;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            bar.style.width = '100%';
            status.textContent = 'Bóveda Consolidada Activa. [100%]';
            
            setTimeout(() => {
                loader.style.opacity = '0';
                document.body.classList.add('loaded-state');
                setTimeout(() => {
                    loader.style.display = 'none';
                    initDynamicHydrator();
                }, 1000);
            }, 500);
        } else {
            bar.style.width = `${progress}%`;
            status.textContent = `Inicializando Super-Módulos... [${progress}%]`;
        }
    }, 70);
}

/**
 * 🔄 3. MOTOR DE HIDRATACIÓN DINÁMICA DEL DOM Y GARBAGE COLLECTOR (9 MÓDULOS)
 */
function initDynamicHydrator() {
    const placeholders = document.querySelectorAll('.snap-section');
    if (placeholders.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '120px 0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sec = entry.target;
            const secId = sec.id;
            const number = parseInt(secId.replace('sec-', ''));

            if (entry.isIntersecting) {
                if (sec.dataset.loaded === 'false') {
                    hydrateSuperSection(sec, number);
                }
            } else {
                // Garbage Collection: Purga física del DOM para optimizar RAM
                if (sec.dataset.loaded === 'true' && number !== 1) {
                    sec.innerHTML = '';
                    sec.dataset.loaded = 'false';
                }
            }
        });
    }, observerOptions);

    placeholders.forEach(sec => {
        observer.observe(sec);
    });

    window.addEventListener('scroll', updateProgressHeader);
    // Disparar una vez al iniciar para posicionar el primer módulo
    updateProgressHeader();
}

/**
 * 🏷️ 4. ACTUALIZACIÓN DEL PROGRESO DE LA CABECERA (1/09)
 */
function updateProgressHeader() {
    const numberDisplay = document.getElementById('progress-number');
    const moduleDisplay = document.getElementById('progress-module');
    const progressPanel = document.getElementById('scroll-progress-panel');
    if (!numberDisplay || !moduleDisplay) return;

    const sections = document.querySelectorAll('.snap-section');
    let activeIndex = 0;
    let minDiff = Infinity;

    sections.forEach((sec, idx) => {
        const rect = sec.getBoundingClientRect();
        // Calculamos la distancia del centro de cada sección al centro de la pantalla
        const sectionCenter = rect.top + rect.height / 2;
        const screenCenter = window.innerHeight / 2;
        const diff = Math.abs(sectionCenter - screenCenter);

        if (diff < minDiff) {
            minDiff = diff;
            activeIndex = idx;
        }
    });

    const sectionNumber = activeIndex + 1;
    if (progressPanel) {
        progressPanel.setAttribute('data-section', sectionNumber);
    }
    if (sectionNumber >= 1 && sectionNumber <= 10) {
        const formattedNum = sectionNumber < 10 ? `0${sectionNumber}` : `${sectionNumber}`;
        numberDisplay.textContent = `${formattedNum} / 10`;
        
        const moduleNames = [
            'Portada: Bienvenida',
            'Core Hero: Mando Central',
            'Hub de Memorias: Galerías',
            'El Buzón Cuántico: Cartas',
            'El Mazo del Alma: Razones',
            'Consola de Diagnóstico',
            'Billetera de Vales',
            'Centro de Decisiones',
            'Mapa del Porvenir',
            'Bóveda de Seguridad'
        ];
        moduleDisplay.textContent = moduleNames[sectionNumber - 1];
    }

    // --- 💖 SCROLL SPY: Actualización del Estado Activo de Menús ---
    const navLinks = document.querySelectorAll('#main-header .nav-link');
    if (navLinks.length > 0) {
        const targetSecNum = activeIndex + 1;
        
        navLinks.forEach(link => {
            const linkSec = parseInt(link.getAttribute('data-sec'));
            if (linkSec === targetSecNum) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

/**
 * 📐 5. RENDERIZADOR DE SUPER-COMPONENTES
 */
function hydrateSuperSection(sec, number) {
    if (typeof CONFIG_DATA === 'undefined') return;

    sec.dataset.loaded = 'true';

    switch (number) {
        case 1: // PORTADA INICIAL CON SLIDER ANIMADO
            sec.innerHTML = `
                <div class="carousel-slider-wrapper">
                    <div class="img-box">
                        <div class="img-list">
                            <div class="img-slider">
                                <div class="img-item active" style="--i:1;">
                                    <div class="item">
                                        <div class="slider-neon-icon accent-pink"><i class="fa-solid fa-heart"></i></div>
                                    </div>
                                </div>
                                <div class="img-item" style="--i:2;">
                                    <div class="item">
                                        <div class="slider-neon-icon accent-blue"><i class="fa-solid fa-calendar-days"></i></div>
                                    </div>
                                </div>
                                <div class="img-item" style="--i:3;">
                                    <div class="item">
                                        <div class="slider-neon-icon accent-yellow"><i class="fa-solid fa-compass"></i></div>
                                    </div>
                                </div>
                                <div class="img-item" style="--i:4;">
                                    <div class="item">
                                        <div class="slider-neon-icon accent-red"><i class="fa-solid fa-envelope-open-text"></i></div>
                                    </div>
                                </div>
                                <div class="img-item" style="--i:5;">
                                    <div class="item">
                                        <div class="slider-neon-icon accent-purple"><i class="fa-solid fa-plane-departure"></i></div>
                                    </div>
                                </div>
                                <div class="img-item" style="--i:6;">
                                    <div class="item">
                                        <div class="slider-neon-icon accent-green"><i class="fa-solid fa-key"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="info-box">
                        <!-- Info Item 1 -->
                        <div class="info-item active">
                            <span class="slider-badge">Antigravity Love</span>
                            <h2>Nuestro Destino</h2>
                            <p>Para la persona que desafía las leyes de mi física y llena de luz mi universo entero. Eres el latido inicial de este viaje.</p>
                            <button class="btn-enter-portal-slider"><i class="fa-solid fa-key" style="margin-right: 6px;"></i> Ingresar al Portal</button>
                        </div>
                        
                        <!-- Info Item 2 -->
                        <div class="info-item">
                            <span class="slider-badge">Primer Encuentro</span>
                            <h2>Nuestros Inicios</h2>
                            <p>El instante exacto en que la gravedad perdió el control y nuestras órbitas se cruzaron para siempre en el espacio afectivo.</p>
                            <button class="btn-enter-portal-slider"><i class="fa-solid fa-key" style="margin-right: 6px;"></i> Ingresar al Portal</button>
                        </div>

                        <!-- Info Item 3 -->
                        <div class="info-item">
                            <span class="slider-badge">Dirección Afectiva</span>
                            <h2>Nuestra Brújula</h2>
                            <p>No importa qué tan caótico sea el universo, siempre encontramos el camino de regreso al abrazo del otro. Eres mi norte constante.</p>
                            <button class="btn-enter-portal-slider"><i class="fa-solid fa-key" style="margin-right: 6px;"></i> Ingresar al Portal</button>
                        </div>

                        <!-- Info Item 4 -->
                        <div class="info-item">
                            <span class="slider-badge">Buzón del Alma</span>
                            <h2>Cartas del Alma</h2>
                            <p>Cada palabra escrita es un pedazo de mi alma flotando hacia ti, recordándote lo infinito y duradero de nuestra lealtad.</p>
                            <button class="btn-enter-portal-slider"><i class="fa-solid fa-key" style="margin-right: 6px;"></i> Ingresar al Portal</button>
                        </div>

                        <!-- Info Item 5 -->
                        <div class="info-item">
                            <span class="slider-badge">Próximos Pasos</span>
                            <h2>Nuestras Rutas</h2>
                            <p>Construyendo puentes estelares y planeando mapas hacia nuevos horizontes. El porvenir nos espera con mimos y risas.</p>
                            <button class="btn-enter-portal-slider"><i class="fa-solid fa-key" style="margin-right: 6px;"></i> Ingresar al Portal</button>
                        </div>

                        <!-- Info Item 6 -->
                        <div class="info-item">
                            <span class="slider-badge">Pacto Secreto</span>
                            <h2>Promesa Final</h2>
                            <p>Una llave de encriptación que resguarda nuestro amor eterno. Un pacto que desafía la gravedad del tiempo y la distancia.</p>
                            <button class="btn-enter-portal-slider"><i class="fa-solid fa-key" style="margin-right: 6px;"></i> Ingresar al Portal</button>
                        </div>
                    </div>

                    <div class="slider-navigation">
                        <span class="prev-slider-btn"><i class="fa-solid fa-chevron-left"></i></span>
                        <span class="next-slider-btn"><i class="fa-solid fa-chevron-right"></i></span>
                    </div>
                </div>
            `;
            initPortadaSliderController(sec);
            break;

        case 2: // CORE HERO
            sec.innerHTML = `
                <div class="glass-panel reveal-element revealed" style="padding: 3.5rem 2.5rem; text-align: center; max-width: 500px; width: 100%; position: relative; overflow: hidden;">
                    <svg class="rose-gold-mechanism" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="rose-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#b76e79" />
                                <stop offset="50%" stop-color="#e0b0ff" />
                                <stop offset="100%" stop-color="#f7c3c7" />
                            </linearGradient>
                        </defs>
                        <circle class="gear gear-1" cx="30" cy="30" r="25" stroke-dasharray="10 5" />
                        <circle class="gear gear-2" cx="170" cy="170" r="35" stroke-dasharray="12 6" />
                    </svg>
                    <h1 style="font-family: var(--font-serif); font-size: 2.4rem; margin-bottom: 0.5rem; text-shadow: 0 0 15px rgba(255,105,180,0.2);">${CONFIG_DATA.coreHero.title}</h1>
                    <p style="font-size: 0.9rem; color: rgba(255,255,255,0.5); margin-bottom: 2rem;">${CONFIG_DATA.coreHero.subtitle}</p>
                    <div style="display: flex; justify-content: center; margin-bottom: 2rem;">
                        <div class="relicario-disk">
                            <div class="relicario-heart"><i class="fa-solid fa-heart-pulse"></i></div>
                        </div>
                    </div>
                    <!-- Cronómetro Activo -->
                    <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-top: 1rem;">
                        <div style="background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 8px;"><div id="hero-years" style="font-size: 1.1rem; font-weight: bold; color: var(--color-highlight);">00</div><div style="font-size: 0.55rem; color: rgba(255,255,255,0.4);">Años</div></div>
                        <div style="background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 8px;"><div id="hero-months" style="font-size: 1.1rem; font-weight: bold; color: var(--color-highlight);">00</div><div style="font-size: 0.55rem; color: rgba(255,255,255,0.4);">Meses</div></div>
                        <div style="background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 8px;"><div id="hero-days" style="font-size: 1.1rem; font-weight: bold; color: var(--color-highlight);">00</div><div style="font-size: 0.55rem; color: rgba(255,255,255,0.4);">Días</div></div>
                        <div style="background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 8px;"><div id="hero-hours" style="font-size: 1.1rem; font-weight: bold; color: var(--color-highlight);">00</div><div style="font-size: 0.55rem; color: rgba(255,255,255,0.4);">Horas</div></div>
                        <div style="background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 8px;"><div id="hero-minutes" style="font-size: 1.1rem; font-weight: bold; color: var(--color-highlight);">00</div><div style="font-size: 0.55rem; color: rgba(255,255,255,0.4);">Min</div></div>
                        <div style="background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 8px;"><div id="hero-seconds" style="font-size: 1.1rem; font-weight: bold; color: var(--color-highlight);">00</div><div style="font-size: 0.55rem; color: rgba(255,255,255,0.4);">Seg</div></div>
                    </div>
                </div>
            `;
            initHeroChronometer(sec);
            break;

        case 3: // MEMORY HUB
            sec.innerHTML = `
                <div class="glass-panel reveal-element revealed memory-dashboard-layout">
                    <!-- Menú Lateral -->
                    <div class="memory-sidebar">
                        <h2 style="font-family: var(--font-serif); font-size: 1.2rem; margin-bottom: 1rem; color: var(--color-highlight);">Categorías</h2>
                        ${CONFIG_DATA.memoryHub.categories.map((c, idx) => `
                            <button class="memory-category-btn ${idx === 0 ? 'active' : ''}" data-cat="${c.id}">
                                <i class="fa-solid fa-folder-open mr-2"></i>${c.name}
                            </button>
                        `).join('')}
                        <div style="margin-top: auto; font-size: 0.65rem; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">
                            Diario de Fotos v2
                        </div>
                    </div>
                    <!-- Área de Visualización -->
                    <div class="memory-gallery-view">
                        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem; text-align: center;">${CONFIG_DATA.memoryHub.title}</h3>
                        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.5); text-align: center; margin-bottom: 2rem;">${CONFIG_DATA.memoryHub.subtitle}</p>
                        
                        <div class="floating-shelf-wrapper">
                            <div class="polaroid-grid" id="hub-polaroid-grid">
                                <!-- Inyección Dinámica al Clic -->
                            </div>
                            <div class="floating-shelf"></div>
                            <div class="shelf-shadow"></div>
                        </div>
                    </div>
                </div>
            `;
            initMemoryHubController(sec);
            break;

        case 4: // QUANTUM MAILBOX (EL BUZÓN CUÁNTICO 3D HOLOGRÁFICO)
            sec.innerHTML = `
                <div class="quantum-mailbox-container reveal-element revealed" id="sec-mailbox-panel">
                    <!-- 1. Cabecera (Header) -->
                    <div class="quantum-header">
                        <h2 class="quantum-main-title">
                            <span class="glowing-heart">♡</span> El Buzón Cuántico <span class="glowing-heart">♡</span>
                        </h2>
                        <p class="quantum-subtitle">
                            Cada emoción que eliges, viaja hacia ti en forma de carta holográfica.
                        </p>
                    </div>

                    <!-- 2. Selector de Estado de Ánimo (Dropdown/Píldora) -->
                    <div class="quantum-select-wrapper">
                        <button class="quantum-pill-select" id="btn-pill-dropdown-toggle">
                            <span>♡ -- Ábrelo cuando te sientas... --</span>
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                        
                        <!-- Lista Dropdown Personalizada -->
                        <div class="quantum-dropdown-list" id="quantum-dropdown-menu">
                            ${CONFIG_DATA.quantumMailbox.emotions.map(e => `
                                <div class="quantum-dropdown-item" data-id="${e.id}">
                                    <i class="${e.icon}"></i>
                                    <span>${e.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 3. Panel Principal (3 Columnas) -->
                    <div class="quantum-grid-layout">
                        
                        <!-- Columna Izquierda: Lista de Emociones -->
                        <div class="quantum-emotions-column">
                            ${CONFIG_DATA.quantumMailbox.emotions.map(e => `
                                <button class="quantum-emotion-card-btn" data-id="${e.id}">
                                    <div class="quantum-emotion-icon-box">
                                        <i class="${e.icon}"></i>
                                    </div>
                                    <div class="quantum-emotion-text-box">
                                        <span class="quantum-emotion-title">${e.name}</span>
                                        <span class="quantum-emotion-desc">${e.desc}</span>
                                    </div>
                                </button>
                            `).join('')}
                        </div>

                        <!-- Columna Central: El Sobre Holográfico -->
                        <div class="quantum-envelope-column">
                            <!-- Decoración de chispas y corazones flotantes -->
                            <div class="quantum-sparkles-bg">
                                <span class="float-heart float-1">💖</span>
                                <span class="float-heart float-2">✨</span>
                                <span class="float-heart float-3">🌸</span>
                                <span class="float-heart float-4">💕</span>
                                <span class="float-heart float-5">💫</span>
                            </div>
                            
                            <div class="quantum-envelope-wrapper">
                                <!-- Base del sobre en 3D -->
                                <div class="quantum-envelope" id="quantum-3d-envelope">
                                    <!-- Cara trasera del sobre -->
                                    <div class="envelope-back"></div>
                                    
                                    <!-- Carta (Papel interno) -->
                                    <div class="envelope-letter">
                                        <div class="envelope-letter-paper">
                                            <div class="letter-text-content" id="quantum-letter-text"></div>
                                        </div>
                                    </div>
                                    
                                    <!-- Solapas delanteras (Frontales) -->
                                    <div class="envelope-front-flaps"></div>
                                    
                                    <!-- Solapa superior (Flap) -->
                                    <div class="envelope-flap-top" id="quantum-envelope-flap">
                                        <div class="envelope-flap-cursive">Para ti, con todo mi amor.</div>
                                    </div>
                                    
                                    <!-- Sello de cera (Wax Seal Heart) -->
                                    <div class="envelope-wax-seal" id="quantum-wax-seal-btn">
                                        <div class="wax-seal-inner">
                                            <i class="fa-solid fa-heart"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Columna Derecha: Tarjeta de Mensaje -->
                        <div class="quantum-message-column">
                            <div class="quantum-message-card">
                                <h4 class="quantum-message-title">Hola mi amor ♡</h4>
                                <p class="quantum-message-body">
                                    Este buzón existe para ti. Porque cada momento contigo, bueno o difícil, merece una carta escrita desde mi corazón.
                                </p>
                                <div class="quantum-message-footer">
                                    <span>Siempre contigo.</span>
                                    <i class="fa-solid fa-heart"></i>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- 4. Sección Inferior (Footer/Quote) -->
                    <div class="quantum-footer">
                        <div class="quantum-footer-quote">
                            <span>♡ El amor no se ve, pero se siente... y aquí siempre te encuentra.</span>
                        </div>
                        <div class="quantum-footer-divider">
                            <span class="divider-line"></span>
                            <span class="divider-heart">♡</span>
                            <span class="divider-line"></span>
                        </div>
                    </div>
                </div>
            `;
            initQuantumMailboxController(sec);
            break;

        case 5: // REASONS CORE
            sec.innerHTML = `
                <div class="glass-panel reveal-element revealed reasons-main-container">
                    <div class="reasons-bg-glow"></div>
                    <div class="reasons-particles-container"></div>
                    
                    <h2 class="reasons-title">${CONFIG_DATA.reasonsCore.title}</h2>
                    <p class="reasons-subtitle">${CONFIG_DATA.reasonsCore.subtitle}</p>
                    
                    <div class="reasons-deck" id="reasons-deck-wrapper">
                        <!-- Mazo apilado inyectado dinámicamente -->
                    </div>
                    
                    <div class="reasons-footer-controls">
                        <button class="btn-premium-reason" id="btn-next-reason">
                            <span>Siguiente Razón</span>
                            <i class="fa-solid fa-arrow-right-long"></i>
                        </button>
                        
                        <div class="reasons-progress-widget" id="reasons-progress-container">
                            <div class="progress-widget-numbers">
                                <span class="current-reason-num" id="widget-current-num">01</span>
                                <span class="reason-separator">/</span>
                                <span class="total-reason-num" id="widget-total-num">30</span>
                            </div>
                            <div class="progress-widget-bar-bg">
                                <div class="progress-widget-bar-fill" id="widget-bar-fill"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            initReasonsDeckController(sec);
            break;

        case 6: // SYSTEM CONSOLE
            sec.innerHTML = `
                <div class="glass-panel terminal-card reveal-element revealed">
                    <div class="terminal-header">
                        <span class="terminal-title-text">> ${CONFIG_DATA.systemConsole.title} - OPERACIÓN ESTABLE</span>
                        <div class="terminal-buttons">
                            <div class="term-btn term-btn-red"></div>
                            <div class="term-btn term-btn-yellow"></div>
                            <div class="term-btn term-btn-green"></div>
                        </div>
                    </div>
                    <div class="terminal-body" id="sec-terminal-console-body">
                        [INICIANDO SECUENCIAS...]
                    </div>
                    <!-- Status de Lealtad -->
                    <div style="background: rgba(255,255,255,0.01); padding: 0.8rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.03); display: flex; justify-content: space-between; font-size: 0.72rem; color: rgba(255,255,255,0.4); font-family: monospace;">
                        <span>CONEXIÓN: TLS 1.3 SECURE</span>
                        <span>STATUS: AMOR 100% OPERATIVO</span>
                    </div>
                </div>
            `;
            initSystemConsoleController(sec);
            break;

        case 7: // COUPONS WALLET
            sec.innerHTML = `
                <div class="glass-panel reveal-element revealed" style="padding: 3rem 2rem; width: 100%; max-width: 850px; text-align: center;">
                    <h2 style="font-family: var(--font-serif); font-size: 2rem; margin-bottom: 0.5rem;">${CONFIG_DATA.couponsWallet.title}</h2>
                    <p style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 2.5rem;">${CONFIG_DATA.couponsWallet.subtitle}</p>
                    
                    <div class="coupons-grid">
                        ${CONFIG_DATA.couponsWallet.coupons.map(c => `
                            <div class="coupon-card">
                                <div class="coupon-icon"><i class="fa-solid ${c.icon}"></i></div>
                                <h3 class="coupon-card-title">${c.title}</h3>
                                <p class="coupon-description">${c.description}</p>
                                <div class="coupon-code">${c.code}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;

        case 8: // DECISION CENTER (RULETA INTERACTIVA MULTI-MODO)
            sec.innerHTML = `
                <div class="decision-container reveal-element revealed" id="sec-decision-panel">
                    <!-- CABECERA PREMIUM -->
                    <div class="decision-header">
                        <h2 class="decision-main-title">Centro de Decisiones ♡</h2>
                        <p class="decision-subtitle">
                            ✨ Alterna entre nuestros minijuegos para resolver la tarde ideal ✨
                        </p>
                    </div>
                    
                    <!-- SELECTOR DE MINIJUEGOS (TABS) -->
                    <div class="decision-tabs-wrapper">
                        <button class="decision-tab-btn active" id="tab-citas">
                            <i class="fa-solid fa-heart"></i> Planes de Citas
                        </button>
                        <button class="decision-tab-btn" id="tab-pelis">
                            <i class="fa-solid fa-clapperboard"></i> Tardes de Cine
                        </button>
                    </div>
                    
                    <!-- PANEL PRINCIPAL (TRIPLE COLUMNA) -->
                    <div class="decision-grid-layout">
                        
                        <!-- Columna Izquierda: Nuestro Plan Perfecto -->
                        <div class="decision-plan-card">
                            <div class="decision-card-label-row">
                                <h4 class="decision-card-label">NUESTRO PLAN PERFECTO</h4>
                                <i class="fa-solid fa-heart"></i>
                            </div>
                            <p class="decision-plan-desc">Deja que el destino decida qué haremos hoy y pasemos un momento inolvidable.</p>
                            <img class="decision-plan-hearts-img" src="smiling_3d_hearts.png" alt="Corazones 3D Sonrientes">
                            <div class="decision-plan-quote-box">
                                <p class="decision-plan-quote-text">"No se trata del plan, se trata de nosotros. ♡"</p>
                            </div>
                        </div>
                        
                        <!-- Columna Central: La Ruleta -->
                        <div class="decision-wheel-card">
                            <div class="decision-pointer"></div>
                            <div class="decision-wheel-outer">
                                <!-- Disco Spinner -->
                                <div class="decision-wheel-spinner" id="decision-spinner-disk">
                                    <!-- Líneas de los sectores sutiles -->
                                    <div class="decision-wheel-line" style="transform: rotate(30deg);"></div>
                                    <div class="decision-wheel-line" style="transform: rotate(90deg);"></div>
                                    <div class="decision-wheel-line" style="transform: rotate(150deg);"></div>
                                    
                                    <!-- Contenedor dinámico de los 6 segmentos -->
                                    <div id="wheel-segments-container"></div>
                                </div>
                                
                                <!-- Botón central -->
                                <div class="decision-wheel-center-btn" id="btn-spin-wheel-center">
                                    <span>Pulsa<br>girar</span>
                                    <i class="fa-solid fa-heart"></i>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Columna Derecha: ¿Cómo funciona? -->
                        <div class="decision-steps-card">
                            <h4 class="decision-steps-title">¿CÓMO FUNCIONA?</h4>
                            
                            <div class="decision-step-item">
                                <div class="decision-step-circle"><i class="fa-solid fa-heart"></i></div>
                                <div class="decision-step-text-col">
                                    <h5>1. Elige categoría</h5>
                                    <p>Planes de citas o tardes de cine.</p>
                                </div>
                            </div>
                            
                            <div class="decision-step-item">
                                <div class="decision-step-circle"><i class="fa-solid fa-rotate"></i></div>
                                <div class="decision-step-text-col">
                                    <h5>2. Gira la ruleta</h5>
                                    <p>Deja que el destino decida por nosotros.</p>
                                </div>
                            </div>
                            
                            <div class="decision-step-item">
                                <div class="decision-step-circle"><i class="fa-solid fa-star"></i></div>
                                <div class="decision-step-text-col">
                                    <h5>3. ¡A disfrutar!</h5>
                                    <p>Vivamos momentos increíbles juntos. ♡</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <!-- SECCIÓN INFERIOR: REGLAS DEL JUEGO -->
                    <div class="decision-rules-card">
                        <h4 class="decision-rules-title">NUESTRAS REGLAS DEL JUEGO <i class="fa-solid fa-heart"></i></h4>
                        <div class="decision-rules-grid">
                            <div class="decision-rule-item">
                                <div class="decision-rule-icon"><i class="fa-regular fa-heart"></i></div>
                                <div class="decision-rule-info">
                                    <h6>Sin quejas</h6>
                                    <p>Lo que salga, lo disfrutamos.</p>
                                </div>
                            </div>
                            <div class="decision-rule-item">
                                <div class="decision-rule-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                                <div class="decision-rule-info">
                                    <h6>Actitud positiva</h6>
                                    <p>La mejor compañía siempre somos nosotros.</p>
                                </div>
                            </div>
                            <div class="decision-rule-item">
                                <div class="decision-rule-icon"><i class="fa-solid fa-gift"></i></div>
                                <div class="decision-rule-info">
                                    <h6>Sorpresas</h6>
                                    <p>A veces lo inesperado es lo mejor.</p>
                                </div>
                            </div>
                            <div class="decision-rule-item">
                                <div class="decision-rule-icon"><i class="fa-solid fa-infinity"></i></div>
                                <div class="decision-rule-info">
                                    <h6>Tiempo de calidad</h6>
                                    <p>Desconectamos del mundo para conectarnos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- BOTÓN DE ACCIÓN PRINCIPAL (FOOTER) -->
                    <div class="decision-footer-row">
                        <div class="decision-footer-heart">♡</div>
                        <div class="decision-footer-arrow">←</div>
                        <button class="btn-decision-spin-footer" id="btn-spin-wheel-footer">
                            <i class="fa-solid fa-arrows-rotate"></i>
                            <span>GIRAR RULETA</span>
                        </button>
                        <div class="decision-footer-arrow">→</div>
                        <div class="decision-footer-heart">♡</div>
                    </div>
                    
                </div>
            `;
            initDecisionCenterController(sec);
            break;

        case 9: // FUTURE MAP (Diseño idéntico a Memory Hub)
            sec.innerHTML = `
                <div class="glass-panel reveal-element revealed future-dashboard-layout">
                    <!-- Menú Lateral -->
                    <div class="future-sidebar">
                        <h2 style="font-family: var(--font-serif); font-size: 1.2rem; margin-bottom: 1rem; color: var(--color-highlight);">Destinos</h2>
                        ${CONFIG_DATA.futureMap.categories.map((c, idx) => `
                            <button class="future-category-btn ${idx === 0 ? 'active' : ''}" data-cat="${c.id}">
                                <i class="fa-solid ${c.icon} mr-2"></i>${c.name}
                            </button>
                        `).join('')}
                        <div style="margin-top: auto; font-size: 0.65rem; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.1em; text-align: center;">
                            Mapa de Sueños
                        </div>
                    </div>
                    <!-- Área de Visualización -->
                    <div class="future-gallery-view">
                        <h3 style="font-family: var(--font-serif); font-size: 1.5rem; margin-bottom: 0.5rem; text-align: center;" id="future-main-title">${CONFIG_DATA.futureMap.title}</h3>
                        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.5); text-align: center; margin-bottom: 0.5rem;" id="future-main-subtitle">${CONFIG_DATA.futureMap.subtitle}</p>
                        <div style="text-align: center; margin-bottom: 1.5rem; font-family: monospace; font-size: 0.72rem; color: var(--color-highlight);" id="future-coords-display">
                            [Coordenadas]
                        </div>
                        
                        <div class="floating-shelf-wrapper">
                            <div class="polaroid-grid" id="future-polaroid-grid">
                                <!-- Inyección Dinámica al Clic -->
                            </div>
                            <div class="floating-shelf"></div>
                            <div class="shelf-shadow"></div>
                        </div>
                    </div>
                </div>
            `;
            initFutureMapController(sec);
            break;

        case 10: // FINAL VAULT (DASHBOARD ULTRA-PREMIUM DIGITAL)
            sec.innerHTML = `
                <div class="vault-dashboard-container reveal-element revealed" id="sec-vault-panel">
                    <!-- CONTENEDOR PRINCIPAL TRIPLE COLUMNA -->
                    <div class="vault-grid-layout">
                        
                        <!-- 1. COLUMNA IZQUIERDA (SIDEBAR) -->
                        <div class="vault-col-left">
                            <div class="vault-sidebar-header">
                                <div class="vault-lock-heart-icon-wrapper">
                                    <div class="vault-lock-heart-icon">
                                        <i class="fa-solid fa-heart-lock"></i>
                                    </div>
                                    <div class="vault-sparkles-ambient">
                                        <span>✨</span><span>💖</span><span>✨</span>
                                    </div>
                                </div>
                                <h3 class="vault-cursive-title">Para ti, mi amor ♡</h3>
                                <p class="vault-sidebar-desc">Guardo lo más importante: nuestro amor, nuestros recuerdos y todo lo que nos hace únicos.</p>
                            </div>
                            
                            <!-- Menú de Navegación Vertical -->
                            <nav class="vault-sidebar-nav">
                                <a href="#sec-1" class="vault-nav-item"><i class="fa-solid fa-house-chimney"></i> <span>Bóveda</span></a>
                                <a href="#sec-3" class="vault-nav-item"><i class="fa-solid fa-images"></i> <span>Recuerdos</span></a>
                                <a href="#sec-4" class="vault-nav-item"><i class="fa-solid fa-envelope-open-text"></i> <span>Notas</span></a>
                                <a href="#sec-2" class="vault-nav-item"><i class="fa-solid fa-calendar-days"></i> <span>Nosotros</span></a>
                                <a href="#sec-10" class="vault-nav-item active"><i class="fa-solid fa-shield-halved"></i> <span>Protección</span></a>
                                <a href="#sec-10" class="vault-nav-item"><i class="fa-solid fa-gear"></i> <span>Configuración</span></a>
                            </nav>
                            
                            <!-- Tarjeta Inferior de la Columna Izquierda -->
                            <div class="vault-sidebar-bottom-card">
                                <p class="vault-cursive-card-text">"Eres mi lugar favorito para guardar todo lo que de verdad importa."</p>
                                <div class="vault-floating-mini-heart"><i class="fa-solid fa-heart"></i></div>
                            </div>
                        </div>
                        
                        <!-- 2. COLUMNA CENTRAL (PRINCIPAL VAULT) -->
                        <div class="vault-col-center">
                            <!-- Auth View: Se desvanece al desbloquear -->
                            <div id="vault-auth-view" style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%;">
                                <div class="vault-center-header">
                                    <div class="vault-shield-heart-icon">
                                        <i class="fa-solid fa-shield-heart"></i>
                                    </div>
                                    <h2 class="vault-center-title">Bóveda de Seguridad</h2>
                                    <p class="vault-center-subtitle">Ingrese la llave de encriptación para revelar el pacto final (DDMMAAAA)</p>
                                </div>
                                
                                <!-- Input de Contraseña y Ojo -->
                                <div class="vault-input-container">
                                    <div class="vault-input-subwrapper">
                                        <input type="password" id="vault-passcode-field" class="vault-passcode-box" placeholder="DDMMAAAA" maxlength="8">
                                        <button class="vault-eye-toggle-btn" id="vault-eye-toggle" type="button" aria-label="Mostrar contraseña">
                                            <i class="fa-solid fa-eye-slash" id="vault-eye-icon"></i>
                                        </button>
                                    </div>
                                    <span class="vault-input-subtext">♡ Nuestra fecha especial ♡</span>
                                </div>
                                
                                <!-- Botón de Acción -->
                                <button class="btn-vault-unlock-neon" id="btn-unlock-vault-dynamic">
                                    <i class="fa-solid fa-lock" style="margin-right: 10px;"></i>
                                    <span>DESBLOQUEAR BÓVEDA</span>
                                    <i class="fa-solid fa-chevron-right" style="margin-left: auto;"></i>
                                </button>
                                
                                <!-- Tarjeta de Tema Alternativo -->
                                <div class="vault-theme-row-card">
                                    <div class="vault-theme-icon-box">
                                        <i class="fa-solid fa-palette"></i>
                                    </div>
                                    <div class="vault-theme-text-col">
                                        <h4>TEMA ALTERNATIVO</h4>
                                        <p>Activa un tema visual alternativo hecho con amor para ti.</p>
                                    </div>
                                    <!-- Haptic Switch -->
                                    <div class="vault-haptic-switch-box active" id="vault-theme-switch">
                                        <div class="vault-haptic-switch-nob"></div>
                                    </div>
                                </div>
                                
                                <!-- Actividad Reciente -->
                                <div class="vault-recent-activity-section">
                                    <div class="vault-recent-header">
                                        <h3>Actividad reciente</h3>
                                        <a href="#sec-10" class="vault-view-all-link">Ver todo</a>
                                    </div>
                                    <div class="vault-activity-list">
                                        <div class="vault-activity-item">
                                            <div class="vault-activity-icon-wrapper"><i class="fa-solid fa-envelope"></i></div>
                                            <div class="vault-activity-text">
                                                <h5>Carta nueva guardada</h5>
                                                <p>Para cuando necesites recordar</p>
                                            </div>
                                            <div class="vault-activity-meta">
                                                <span>Hoy, 10:45 a.m.</span>
                                                <span class="vault-pink-dot"></span>
                                            </div>
                                        </div>
                                        <div class="vault-activity-item">
                                            <div class="vault-activity-icon-wrapper"><i class="fa-solid fa-heart"></i></div>
                                            <div class="vault-activity-text">
                                                <h5>Momento especial agregado</h5>
                                                <p>Nuestra foto favorita</p>
                                            </div>
                                            <div class="vault-activity-meta">
                                                <span>Ayer, 08:22 p.m.</span>
                                                <span class="vault-pink-dot"></span>
                                            </div>
                                        </div>
                                        <div class="vault-activity-item">
                                            <div class="vault-activity-icon-wrapper"><i class="fa-solid fa-unlock-keyhole"></i></div>
                                            <div class="vault-activity-text">
                                                <h5>Recuerdo desbloqueado</h5>
                                                <p>Volvimos a ver nuestro primer viaje</p>
                                            </div>
                                            <div class="vault-activity-meta">
                                                <span>Ayer, 07:15 p.m.</span>
                                                <span class="vault-pink-dot"></span>
                                            </div>
                                        </div>
                                        <div class="vault-activity-item">
                                            <div class="vault-activity-icon-wrapper"><i class="fa-solid fa-pen-nib"></i></div>
                                            <div class="vault-activity-text">
                                                <h5>Nota de amor creada</h5>
                                                <p>Por si un día tienes dudas</p>
                                            </div>
                                            <div class="vault-activity-meta">
                                                <span>Ayer, 01:02 p.m.</span>
                                                <span class="vault-pink-dot"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Promise View: Hydrated cinemáticamente tras clave correcta -->
                            <div id="vault-promise-view" style="display: none; padding: 2rem; text-align: center; width: 100%;">
                                <!-- Inyectado dinámicamente -->
                            </div>
                        </div>
                        
                        <!-- 3. COLUMNA DERECHA (PANELES INFO) -->
                        <div class="vault-col-right">
                            <!-- Tarjeta 1: Lo que guardo por ti -->
                            <div class="vault-info-card">
                                <h4 class="vault-info-card-title">Lo que guardo por ti ♡</h4>
                                <div class="vault-info-list">
                                    <div class="vault-info-item">
                                        <div class="vault-info-icon"><i class="fa-solid fa-heart"></i></div>
                                        <div class="vault-info-text">
                                            <h5>Nuestro amor</h5>
                                            <p>Lo más valioso</p>
                                        </div>
                                    </div>
                                    <div class="vault-info-item">
                                        <div class="vault-info-icon"><i class="fa-solid fa-images"></i></div>
                                        <div class="vault-info-text">
                                            <h5>Nuestros recuerdos</h5>
                                            <p>Momentos inolvidables</p>
                                        </div>
                                    </div>
                                    <div class="vault-info-item">
                                        <div class="vault-info-icon"><i class="fa-solid fa-face-smile-wink"></i></div>
                                        <div class="vault-info-text">
                                            <h5>Tus sonrisas</h5>
                                            <p>Mi lugar seguro</p>
                                        </div>
                                    </div>
                                    <div class="vault-info-item">
                                        <div class="vault-info-icon"><i class="fa-solid fa-cloud-sun"></i></div>
                                        <div class="vault-info-text">
                                            <h5>Nuestros sueños</h5>
                                            <p>Todo lo que construiremos</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Tarjeta 2: Recordatorio con Corazón 3D -->
                            <div class="vault-reminder-card">
                                <h4 class="vault-reminder-title">Recordatorio</h4>
                                <div class="vault-3d-heart-wrapper">
                                    <div class="vault-3d-heart"><i class="fa-solid fa-heart"></i></div>
                                    <div class="vault-3d-heart-glow"></div>
                                </div>
                                <p class="vault-reminder-text">No importa la distancia ni el tiempo, siempre estarás en mi corazón. ♡</p>
                            </div>
                            
                            <!-- Tarjeta 3: Último respaldo -->
                            <div class="vault-backup-card">
                                <div class="vault-backup-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div>
                                <div class="vault-backup-text">
                                    <h4>Último respaldo</h4>
                                    <p>Hoy, 11:30 a.m. <i class="fa-solid fa-circle-check" style="color: var(--color-highlight); margin-left: 2px;"></i></p>
                                    <span>Automático y seguro</span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                    <!-- 4. SECCIÓN INFERIOR (BOTTOM BAR - 4 BADGES) -->
                    <div class="vault-bottom-badges-row">
                        <div class="vault-badge-item">
                            <div class="vault-badge-icon"><i class="fa-solid fa-user-shield"></i></div>
                            <div class="vault-badge-text">
                                <h6>CIFRADO DE EXTREMO A EXTREMO</h6>
                                <p>Tu información está 100% protegida.</p>
                            </div>
                        </div>
                        <div class="vault-badge-item">
                            <div class="vault-badge-icon"><i class="fa-solid fa-key"></i></div>
                            <div class="vault-badge-text">
                                <h6>ACCESO PRIVADO</h6>
                                <p>Solo tú tienes la llave de nuestro mundo.</p>
                            </div>
                        </div>
                        <div class="vault-badge-item">
                            <div class="vault-badge-icon"><i class="fa-solid fa-infinity"></i></div>
                            <div class="vault-badge-text">
                                <h6>GUARDADO PERMANENTE</h6>
                                <p>Nuestro amor, para siempre.</p>
                            </div>
                        </div>
                        <div class="vault-badge-item">
                            <div class="vault-badge-icon"><i class="fa-solid fa-cloud"></i></div>
                            <div class="vault-badge-text">
                                <h6>RESPALDO AUTOMÁTICO</h6>
                                <p>Para que nunca perdamos nada importante.</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- FOOTER SUTIL DE LA BÓVEDA -->
                    <div class="vault-footer-row">
                        <p>♡ Hecho con amor, solo para ti. Porque tú mereces lo más seguro y hermoso del mundo. ♡</p>
                    </div>
                </div>
            `;
            initFinalVaultController(sec);
            break;
    }
}

/**
 * ⚡ 6. CONTROLADORES INTEGRADOS DE SUPER-COMPONENTES
 */

// Slider giratorio de la Portada Inicial (Módulo 1)
function initPortadaSliderController(sec) {
    const imgSlider = sec.querySelector('.img-slider');
    const items = sec.querySelectorAll('.item');
    const imgItems = sec.querySelectorAll('.img-item');
    const infoItems = sec.querySelectorAll('.info-item');
    const nextBtn = sec.querySelector('.next-slider-btn');
    const prevBtn = sec.querySelector('.prev-slider-btn');

    if (!imgSlider || !nextBtn || !prevBtn) return;

    let indexSlider = 0;
    let index = 0;

    const colors = [
        'rgba(255, 105, 180, 0.12)', // Rosa
        'rgba(0, 255, 255, 0.12)',  // Cian
        'rgba(255, 215, 0, 0.12)',   // Dorado
        'rgba(255, 69, 0, 0.12)',    // Rojo
        'rgba(147, 112, 219, 0.12)', // Púrpura
        'rgba(50, 205, 50, 0.12)'    // Verde
    ];

    const colorsRGB = [
        '255, 105, 180',
        '0, 255, 255',
        '255, 215, 0',
        '255, 69, 0',
        '147, 112, 219',
        '50, 205, 50'
    ];

    const slider = () => {
        imgSlider.style.transform = `rotate(${indexSlider * 60}deg)`;

        items.forEach(item => {
            item.style.transform = `rotate(${indexSlider * -60}deg)`;
        });

        const activeImg = sec.querySelector('.img-item.active');
        if (activeImg) activeImg.classList.remove('active');
        imgItems[index].classList.add('active');

        const activeInfo = sec.querySelector('.info-item.active');
        if (activeInfo) activeInfo.classList.remove('active');
        infoItems[index].classList.add('active');

        // Cambiar dinámicamente el resplandor ambiental del fondo y el acento del progreso
        const wrapper = sec.querySelector('.carousel-slider-wrapper');
        if (wrapper) {
            wrapper.style.setProperty('--glow-bg', colors[index]);
            document.documentElement.style.setProperty('--glow-accent-rgb', colorsRGB[index]);
        }
    };

    nextBtn.addEventListener('click', () => {
        indexSlider++;
        index++;
        if (index > imgItems.length - 1) {
            index = 0;
        }
        slider();
    });

    prevBtn.addEventListener('click', () => {
        indexSlider--;
        index--;
        if (index < 0) {
            index = imgItems.length - 1;
        }
        slider();
    });

    // Vincular botones de ingreso de cada tarjeta del slider para desplazarse suavemente
    const enterButtons = sec.querySelectorAll('.btn-enter-portal-slider');
    enterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const sec2 = document.getElementById('sec-2');
            if (sec2) {
                sec2.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Cronómetro del Core Hero
function initHeroChronometer(sec) {
    const yearsEl = sec.querySelector('#hero-years');
    const monthsEl = sec.querySelector('#hero-months');
    const daysEl = sec.querySelector('#hero-days');
    const hoursEl = sec.querySelector('#hero-hours');
    const minutesEl = sec.querySelector('#hero-minutes');
    const secondsEl = sec.querySelector('#hero-seconds');

    if (!yearsEl || !monthsEl || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const startIso = CONFIG_DATA.anniversaryStartDate;
    const startDate = new Date(startIso);

    function update() {
        if (!sec.isConnected) return;
        const now = new Date();
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prev = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prev.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        yearsEl.textContent = years < 10 ? `0${years}` : years;
        monthsEl.textContent = months < 10 ? `0${months}` : months;
        daysEl.textContent = days < 10 ? `0${days}` : days;
        hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
        minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
        
        setTimeout(update, 1000);
    }
    update();
}

// Hub de Memorias (Categorías e interactividad dinámica)
function initMemoryHubController(sec) {
    const grid = sec.querySelector('#hub-polaroid-grid');
    const btns = sec.querySelectorAll('.memory-category-btn');
    if (!grid || btns.length === 0) return;

    function renderCategory(catId) {
        grid.style.opacity = '0';
        setTimeout(() => {
            grid.innerHTML = '';
            const items = CONFIG_DATA.memoryHub.items[catId] || [];
            
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'polaroid-card';
                card.style.setProperty('--r', `${item.rotation}deg`);
                card.innerHTML = `
                    <img src="${item.src}" alt="${item.alt}">
                    <div class="polaroid-title">${item.title}</div>
                `;
                
                // Efecto de explosión de destellos al hacer clic en polaroids
                card.addEventListener('click', () => {
                    triggerPolaroidSparkles(card);
                });

                grid.appendChild(card);
            });
            grid.style.opacity = '1';
        }, 250);
    }

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCategory(btn.dataset.cat);
        });
    });

    // Cargar por defecto
    renderCategory('2024');
}

// Mapa del Futuro (Categorías e interactividad dinámica idéntica al Hub de Memorias)
function initFutureMapController(sec) {
    const grid = sec.querySelector('#future-polaroid-grid');
    const btns = sec.querySelectorAll('.future-category-btn');
    const coordsDisplay = sec.querySelector('#future-coords-display');
    if (!grid || btns.length === 0) return;

    function renderCategory(catId) {
        grid.style.opacity = '0';
        setTimeout(() => {
            grid.innerHTML = '';
            
            // Buscar la categoría para mostrar coordenadas
            const catObj = CONFIG_DATA.futureMap.categories.find(c => c.id === catId);
            if (catObj && coordsDisplay) {
                coordsDisplay.innerHTML = `<i class="fa-solid fa-location-dot" style="margin-right: 4px;"></i>\u00a0\u00a0${catObj.coords}`;
            }

            const items = CONFIG_DATA.futureMap.items[catId] || [];
            
            items.forEach(item => {
                const card = document.createElement('div');
                card.className = 'polaroid-card';
                card.style.setProperty('--r', `${item.rotation}deg`);
                card.innerHTML = `
                    <img src="${item.src}" alt="${item.title}">
                    <div class="polaroid-title">${item.title}</div>
                `;
                
                // Efecto de explosión de destellos al hacer clic en polaroids
                card.addEventListener('click', () => {
                    triggerPolaroidSparkles(card);
                });

                grid.appendChild(card);
            });
            grid.style.opacity = '1';
        }, 250);
    }

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCategory(btn.dataset.cat);
        });
    });

    // Cargar por defecto la primera categoría
    if (CONFIG_DATA.futureMap.categories.length > 0) {
        renderCategory(CONFIG_DATA.futureMap.categories[0].id);
    }
}

function triggerPolaroidSparkles(elem) {
    const rect = elem.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const container = document.body;
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'love-explosion-particle';
        p.textContent = '✨';
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 80 + 40;
        const dx = Math.sin(angle) * radius;
        const dy = Math.cos(angle) * radius;
        p.style.setProperty('--dx', `${dx}px`);
        p.style.setProperty('--dy', `${dy}px`);
        p.style.setProperty('--dr', '0deg');
        p.style.animationDuration = '0.8s';
        p.addEventListener('animationend', () => p.remove());
        container.appendChild(p);
    }
}

// Buzón Cuántico
function initQuantumMailboxController(sec) {
    const pillToggle = sec.querySelector('#btn-pill-dropdown-toggle');
    const dropdownMenu = sec.querySelector('#quantum-dropdown-menu');
    const envelope = sec.querySelector('#quantum-3d-envelope');
    const flap = sec.querySelector('#quantum-envelope-flap');
    const seal = sec.querySelector('#quantum-wax-seal-btn');
    const letterText = sec.querySelector('#quantum-letter-text');
    const emotionBtns = sec.querySelectorAll('.quantum-emotion-card-btn');
    const dropdownItems = sec.querySelectorAll('.quantum-dropdown-item');

    if (!envelope || !flap || !seal || !letterText) return;

    let selectedEmotion = '';
    let typewriterTimeout = null;
    let isOpen = false;

    // Función para alternar el menú desplegable de la píldora
    if (pillToggle && dropdownMenu) {
        pillToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isMenuOpen = dropdownMenu.style.display === 'flex';
            dropdownMenu.style.display = isMenuOpen ? 'none' : 'flex';
            pillToggle.classList.toggle('active', !isMenuOpen);
        });

        // Cerrar menú al hacer clic afuera
        document.addEventListener('click', () => {
            dropdownMenu.style.display = 'none';
            pillToggle.classList.remove('active');
        });
    }

    // Seleccionar emoción y disparar animación
    function selectEmotion(emotionId) {
        if (typewriterTimeout) clearTimeout(typewriterTimeout);
        
        selectedEmotion = emotionId;
        const emoConfig = CONFIG_DATA.quantumMailbox.emotions.find(e => e.id === emotionId);
        
        if (!emoConfig) return;

        // Actualizar UI del selector de píldora
        if (pillToggle) {
            const pillSpan = pillToggle.querySelector('span');
            if (pillSpan) {
                pillSpan.innerHTML = `<i class="${emoConfig.icon}" style="margin-right: 8px; color: var(--color-highlight);"></i> Sintiéndome: ${emoConfig.name} ♡`;
            }
        }

        // Sincronizar botones de la lista izquierda
        emotionBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.id === emotionId);
        });

        // Cerrar el sobre temporalmente si estaba abierto para reiniciarlo
        if (isOpen) {
            envelope.classList.remove('open');
            isOpen = false;
            letterText.innerHTML = '';
            
            // Retardo para reabrir con la nueva carta holográfica
            setTimeout(() => {
                openEnvelope();
            }, 600);
        } else {
            openEnvelope();
        }
    }

    // Eventos de botones de emoción (Lista izquierda)
    emotionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectEmotion(btn.dataset.id);
        });
    });

    // Eventos de opciones del menú desplegable
    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            selectEmotion(item.dataset.id);
        });
    });

    // Función para abrir el sobre y escribir
    function openEnvelope() {
        if (!selectedEmotion) return;

        isOpen = true;
        envelope.classList.add('open');

        // Retardo para esperar que la solapa 3D del sobre se abra
        setTimeout(() => {
            letterText.innerHTML = '';
            const rawText = CONFIG_DATA.quantumMailbox.letters[selectedEmotion];
            if (!rawText) return;

            let idx = 0;
            function type() {
                if (!sec.isConnected) return;
                if (idx < rawText.length) {
                    letterText.textContent += rawText[idx];
                    idx++;
                    
                    // Auto-scrollear la carta hacia abajo si el texto es largo
                    const letterPaper = letterText.closest('.envelope-letter-paper');
                    if (letterPaper) {
                        letterPaper.scrollTop = letterPaper.scrollHeight;
                    }
                    
                    typewriterTimeout = setTimeout(type, 30);
                }
            }
            type();
        }, 850);
    }

    // Acción del Sello de Cera Central
    seal.addEventListener('click', (e) => {
        e.stopPropagation();
        
        if (!selectedEmotion) {
            // Si no hay emoción seleccionada, abrir "feliz" por defecto para un inicio mágico
            selectEmotion('feliz');
            return;
        }

        if (isOpen) {
            // Cerrar sobre
            if (typewriterTimeout) clearTimeout(typewriterTimeout);
            envelope.classList.remove('open');
            isOpen = false;
            setTimeout(() => {
                letterText.innerHTML = '';
            }, 800);
        } else {
            // Reabrir
            openEnvelope();
        }
    });

    // Permitir clic en el sobre mismo para abrir o cerrar
    envelope.addEventListener('click', (e) => {
        // Ignorar clics en la carta misma cuando está extendida arriba
        if (e.target.closest('.envelope-letter')) return;
        
        if (!selectedEmotion) {
            selectEmotion('feliz');
            return;
        }

        seal.click();
    });
}

// Mazo de Razones 3D
// Mazo de Razones 3D (Premium & Cinematic Redesign)
function initReasonsDeckController(sec) {
    const deck = sec.querySelector('#reasons-deck-wrapper');
    const btn = sec.querySelector('#btn-next-reason');
    if (!deck || !btn) return;

    const reasons = CONFIG_DATA.reasonsCore.reasons;
    let activeIndex = 0;

    // Generar partículas rosas flotantes dentro del contenedor Reasons
    const particlesContainer = sec.querySelector('.reasons-particles-container');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'reason-floating-particle';
            const size = Math.random() * 5 + 3;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 8;
            const duration = Math.random() * 8 + 8;
            
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.left = `${left}%`;
            p.style.top = `${top}%`;
            p.style.animationDelay = `${delay}s`;
            p.style.animationDuration = `${duration}s`;
            particlesContainer.appendChild(p);
        }
    }

    function renderDeck() {
        deck.innerHTML = '';
        
        // Renderizar un subconjunto de 3 cartas consecutivas para lograr profundidad 3D
        for (let i = 0; i < 3; i++) {
            const index = (activeIndex + i) % reasons.length;
            const card = document.createElement('div');
            card.className = i === 0 ? 'stacked-card active' : 'stacked-card inactive';
            
            // Estilos 3D apilados decrecientes
            const scale = 1 - (i * 0.06);
            const translateY = i * 20;
            const translateZ = -i * 50;
            const opacity = 1 - (i * 0.4);
            const filterVal = i > 0 ? `blur(${i * 2}px)` : 'none';
            
            card.style.transform = `scale(${scale}) translateY(${translateY}px) translateZ(${translateZ}px)`;
            card.style.opacity = opacity;
            card.style.filter = filterVal;
            card.style.zIndex = 100 - i;
            
            card.innerHTML = `
                <div class="reason-num">Razón #${index + 1}</div>
                <div class="reason-text">"${reasons[index]}"</div>
            `;
            
            // Añadir drag swipeable solo a la carta superior (i === 0)
            if (i === 0) {
                initSwipeableCard(card);
            }

            deck.appendChild(card);
        }

        // Actualizar mini widget de progreso
        const currentNumEl = sec.querySelector('#widget-current-num');
        const totalNumEl = sec.querySelector('#widget-total-num');
        const barFillEl = sec.querySelector('#widget-bar-fill');
        if (currentNumEl && totalNumEl && barFillEl) {
            const formattedCurrent = activeIndex + 1 < 10 ? `0${activeIndex + 1}` : `${activeIndex + 1}`;
            const formattedTotal = reasons.length < 10 ? `0${reasons.length}` : `${reasons.length}`;
            currentNumEl.textContent = formattedCurrent;
            totalNumEl.textContent = formattedTotal;
            
            const pct = ((activeIndex + 1) / reasons.length) * 100;
            barFillEl.style.width = `${pct}%`;
        }
    }

    function initSwipeableCard(card) {
        let isDragging = false;
        let startX = 0;
        let currentX = 0;

        function dragStart(e) {
            isDragging = true;
            startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            card.style.transition = 'none';
            card.style.animation = 'none'; // Detener animación flotante mientras se arrastra
            
            window.addEventListener('mousemove', dragMove);
            window.addEventListener('mouseup', dragEnd);
            window.addEventListener('touchmove', dragMove, { passive: false });
            window.addEventListener('touchend', dragEnd);
        }

        function dragMove(e) {
            if (!isDragging) return;
            if (e.type === 'touchmove') e.preventDefault(); // Evitar scroll vertical nativo
            
            currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const diffX = currentX - startX;
            const rot = diffX / 14;
            
            card.style.transform = `translateX(${diffX}px) rotate(${rot}deg) scale(1.02)`;
        }

        function dragEnd() {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = currentX - startX;
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s';
            
            if (Math.abs(diffX) > 120) {
                // Swipe Out exitoso (Derecha o Izquierda)
                const dir = diffX > 0 ? 1 : -1;
                card.style.transform = `translateX(${dir * 380}px) rotate(${dir * 25}deg) scale(0.85) filter(blur(4px))`;
                card.style.opacity = '0';
                
                // Efecto de pulso en el widget
                const progressWidget = sec.querySelector('#reasons-progress-container');
                if (progressWidget) {
                    progressWidget.style.transform = 'scale(1.08)';
                    setTimeout(() => progressWidget.style.transform = 'none', 300);
                }

                setTimeout(() => {
                    activeIndex = (activeIndex + 1) % reasons.length;
                    renderDeck();
                }, 250);
            } else {
                // Volver a posición original apilada
                card.style.transform = '';
                card.style.animation = 'reason-float 6s ease-in-out infinite';
            }

            window.removeEventListener('mousemove', dragMove);
            window.removeEventListener('mouseup', dragEnd);
            window.removeEventListener('touchmove', dragMove);
            window.removeEventListener('touchend', dragEnd);
        }

        card.addEventListener('mousedown', dragStart);
        card.addEventListener('touchstart', dragStart, { passive: true });
    }

    btn.addEventListener('click', () => {
        const topCard = deck.children[0];
        if (!topCard) return;

        topCard.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s';
        topCard.style.transform = 'translateX(380px) rotate(22deg) scale(0.85) filter(blur(4px))';
        topCard.style.opacity = '0';
        
        // Efecto de pulso al presionar botón
        btn.classList.add('pulse-click');
        setTimeout(() => btn.classList.remove('pulse-click'), 400);

        // Efecto de pulso en el widget
        const progressWidget = sec.querySelector('#reasons-progress-container');
        if (progressWidget) {
            progressWidget.style.transform = 'scale(1.08)';
            setTimeout(() => progressWidget.style.transform = 'none', 300);
        }

        setTimeout(() => {
            activeIndex = (activeIndex + 1) % reasons.length;
            renderDeck();
        }, 250);
    });

    renderDeck();
}

// Consola de Diagnóstico
function initSystemConsoleController(sec) {
    const body = sec.querySelector('#sec-terminal-console-body');
    if (!body) return;
    body.innerHTML = '';

    const logs = CONFIG_DATA.systemConsole.logs;
    let idx = 0;

    function printRow() {
        if (!sec.isConnected || idx >= logs.length) return;
        const row = document.createElement('div');
        row.textContent = `> ${logs[idx]}`;
        row.style.marginBottom = '6px';
        body.appendChild(row);
        idx++;
        setTimeout(printRow, 600);
    }
    printRow();
}

// Centro de Decisiones (Minijuegos Ruletas)
function initDecisionCenterController(sec) {
    const tabCitas = sec.querySelector('#tab-citas');
    const tabPelis = sec.querySelector('#tab-pelis');
    const disk = sec.querySelector('#decision-spinner-disk');
    const btnCenter = sec.querySelector('#btn-spin-wheel-center');
    const btnFooter = sec.querySelector('#btn-spin-wheel-footer');

    if (!tabCitas || !tabPelis || !disk || !btnCenter || !btnFooter) return;

    const CITAS_SEGMENTS = [
        { text: 'Cena romántica', icon: 'fa-bell-concierge' },
        { text: 'Picnic bajo las estrellas', icon: 'fa-basket-shopping' },
        { text: 'Noche de juegos', icon: 'fa-gamepad' },
        { text: 'Aventura sorpresa', icon: 'fa-map' },
        { text: 'Helado y paseo', icon: 'fa-ice-cream' },
        { text: 'Café y charla', icon: 'fa-mug-hot' }
    ];

    const PELIS_SEGMENTS = [
        { text: 'Ciencia Ficción', icon: 'fa-user-astronaut' },
        { text: 'Romance Clásico', icon: 'fa-heart' },
        { text: 'Comedia Divertida', icon: 'fa-face-laugh-squint' },
        { text: 'Terror del Bueno', icon: 'fa-ghost' },
        { text: 'Maratón de Series', icon: 'fa-tv' },
        { text: 'Película Animada', icon: 'fa-cat' }
    ];

    let currentMode = 'citas'; // 'citas' o 'pelis'
    let currentRotation = 0;
    let isSpinning = false;

    // Renderiza dinámicamente los 6 segmentos alrededor de la ruleta
    function renderSegments(mode) {
        const container = sec.querySelector('#wheel-segments-container');
        if (!container) return;
        
        const segments = mode === 'citas' ? CITAS_SEGMENTS : PELIS_SEGMENTS;
        container.innerHTML = '';
        
        segments.forEach((seg, idx) => {
            const angle = idx * 60;
            const el = document.createElement('div');
            el.className = 'decision-segment';
            // Fórmula exacta para colocar en círculo y mantener el texto horizontal legible
            el.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(-105px) rotate(-${angle}deg)`;
            el.innerHTML = `
                <i class="fa-solid ${seg.icon}"></i>
                <span>${seg.text}</span>
            `;
            container.appendChild(el);
        });
    }

    // Inicializar la ruleta con Planes de Citas
    renderSegments('citas');

    // Cambiar a Planes de Citas
    tabCitas.addEventListener('click', () => {
        if (isSpinning) return;
        tabCitas.classList.add('active');
        tabPelis.classList.remove('active');
        currentMode = 'citas';
        renderSegments('citas');
        // Resetear la rotación de forma limpia
        currentRotation = 0;
        disk.style.transition = 'none';
        disk.style.transform = `rotate(0deg)`;
    });

    // Cambiar a Tardes de Cine
    tabPelis.addEventListener('click', () => {
        if (isSpinning) return;
        tabPelis.classList.add('active');
        tabCitas.classList.remove('active');
        currentMode = 'pelis';
        renderSegments('pelis');
        // Resetear la rotación de forma limpia
        currentRotation = 0;
        disk.style.transition = 'none';
        disk.style.transform = `rotate(0deg)`;
    });

    // Función unificada de giro
    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;

        // Desactivar UI interactiva
        btnCenter.style.pointerEvents = 'none';
        btnFooter.style.pointerEvents = 'none';
        btnFooter.classList.add('disabled');
        tabCitas.style.opacity = '0.5';
        tabPelis.style.opacity = '0.5';

        // Cambiar textos de estado
        btnCenter.innerHTML = `<span>Girando...</span><i class="fa-solid fa-spinner fa-spin"></i>`;
        const btnFooterText = btnFooter.querySelector('span');
        if (btnFooterText) btnFooterText.textContent = 'GIRANDO...';

        // Elegir un sector ganador (0 a 5)
        const targetSector = Math.floor(Math.random() * 6);
        
        // Calcular el ángulo final requerido para que el sector ganador apunte a la parte superior (0 grados)
        // La fórmula exacta para que el sector quede alineado con el puntero es: (6 - targetSector) % 6 * 60
        const finalAngleMod = ((6 - targetSector) % 6) * 60;
        
        // Mínimo 5 vueltas completas (1800 grados) + el ángulo del sector
        const extraRotations = 1800 + Math.floor(Math.random() * 3) * 360;
        
        // Asegurar que siempre rote hacia adelante de forma acumulativa
        const currentBase = Math.ceil(currentRotation / 360) * 360;
        currentRotation = currentBase + extraRotations + finalAngleMod;

        // Aplicar rotación con transición suave
        disk.style.transition = 'transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)';
        disk.style.transform = `rotate(${currentRotation}deg)`;

        setTimeout(() => {
            isSpinning = false;

            // Reactivar UI
            btnCenter.style.pointerEvents = 'auto';
            btnFooter.style.pointerEvents = 'auto';
            btnFooter.classList.remove('disabled');
            tabCitas.style.opacity = '1';
            tabPelis.style.opacity = '1';

            // Restaurar textos de los botones
            btnCenter.innerHTML = `<span>Pulsa<br>girar</span><i class="fa-solid fa-heart"></i>`;
            if (btnFooterText) btnFooterText.textContent = 'GIRAR RULETA';

            // Obtener el plan ganador
            const segments = currentMode === 'citas' ? CITAS_SEGMENTS : PELIS_SEGMENTS;
            const winner = segments[targetSector];

            // Lanzar partículas mágicas de victoria
            triggerWheelSparks();

            // Mostrar el plan ganador en un precioso modal/alerta flotante premium temporal
            showWinnerAlert(winner.text, winner.icon);
        }, 4000);
    }

    btnCenter.addEventListener('click', spinWheel);
    btnFooter.addEventListener('click', spinWheel);

    // Alerta Premium flotante para el ganador
    function showWinnerAlert(text, icon) {
        // Eliminar alerta previa si existe
        const existing = document.querySelector('.decision-winner-alert');
        if (existing) existing.remove();

        const alert = document.createElement('div');
        alert.className = 'decision-winner-alert';
        alert.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: rgba(9, 9, 9, 0.95);
            border: 2px solid var(--color-highlight);
            box-shadow: 0 0 40px rgba(255, 51, 102, 0.6);
            border-radius: 20px;
            padding: 2.5rem;
            text-align: center;
            z-index: 9999;
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            max-width: 380px;
            width: 90%;
        `;

        alert.innerHTML = `
            <div style="font-size: 3.2rem; color: var(--color-highlight); margin-bottom: 1rem; filter: drop-shadow(0 0 10px rgba(255, 51, 102, 0.5));">
                <i class="fa-solid ${icon}"></i>
            </div>
            <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: #fff; margin-bottom: 0.5rem;">¡El Destino ha decidido!</h3>
            <p style="font-size: 0.82rem; color: rgba(255,255,255,0.5); margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 0.05em;">Haremos hoy:</p>
            <div style="font-size: 1.4rem; font-weight: 700; color: #fff; background: rgba(255, 51, 102, 0.1); border: 1px solid rgba(255, 51, 102, 0.25); border-radius: 12px; padding: 1rem; margin-bottom: 1.8rem; text-shadow: 0 0 8px rgba(255,255,255,0.3);">
                ${text} ✨
            </div>
            <button id="btn-close-winner-alert" style="background: var(--color-highlight); border: none; color: #fff; font-weight: 700; font-size: 0.85rem; padding: 0.8rem 2rem; border-radius: 50px; cursor: pointer; box-shadow: 0 5px 15px rgba(255, 51, 102, 0.4); transition: all 0.3s;">
                ¡Me encanta el plan! ♡
            </button>
        `;

        document.body.appendChild(alert);

        // Forzar reflow y animar entrada
        setTimeout(() => {
            alert.style.opacity = '1';
            alert.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 50);

        // Sonido o vibración simulada si es posible
        if (navigator.vibrate) navigator.vibrate([100, 50, 100]);

        const closeBtn = alert.querySelector('#btn-close-winner-alert');
        closeBtn.addEventListener('click', () => {
            alert.style.opacity = '0';
            alert.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => alert.remove(), 400);
        });
    }
}

function triggerWheelSparks() {
    const container = document.body;
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.className = 'love-explosion-particle';
        p.textContent = '✨';
        p.style.left = '50%';
        p.style.top = '50%';
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 100 + 60;
        const dx = Math.sin(angle) * radius;
        const dy = Math.cos(angle) * radius;
        p.style.setProperty('--dx', `${dx}px`);
        p.style.setProperty('--dy', `${dy}px`);
        p.style.setProperty('--dr', '0deg');
        p.style.animationDuration = '0.9s';
        p.addEventListener('animationend', () => p.remove());
        container.appendChild(p);
    }
}

// Bóveda de Seguridad Final y Switch háptico de login
function initFinalVaultController(sec) {
    const unlockBtn = sec.querySelector('#btn-unlock-vault-dynamic');
    const passField = sec.querySelector('#vault-passcode-field');
    const authView = sec.querySelector('#vault-auth-view');
    const promiseView = sec.querySelector('#vault-promise-view');
    const vaultPanel = sec.querySelector('#sec-vault-panel');
    const themeBtn = sec.querySelector('#vault-theme-switch');
    const eyeToggle = sec.querySelector('#vault-eye-toggle');
    const eyeIcon = sec.querySelector('#vault-eye-icon');

    if (!unlockBtn || !passField || !authView || !promiseView || !vaultPanel || !themeBtn) return;

    // Toggle de visibilidad de contraseña
    if (eyeToggle && eyeIcon) {
        eyeToggle.addEventListener('click', () => {
            const isPass = passField.type === 'password';
            passField.type = isPass ? 'text' : 'password';
            
            if (isPass) {
                eyeIcon.className = 'fa-solid fa-eye';
            } else {
                eyeIcon.className = 'fa-solid fa-eye-slash';
            }
        });
    }

    unlockBtn.addEventListener('click', () => {
        const code = passField.value.trim();
        if (code === CONFIG_DATA.finalVault.correctCode) {
            // Animación desvanecer login
            authView.style.opacity = '0';
            setTimeout(() => {
                authView.style.display = 'none';
                promiseView.innerHTML = `
                    <div style="text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 250px;">
                        <div class="promise-scroll-text" style="font-family: var(--font-cursive); font-size: 1.8rem; line-height: 1.5; color: var(--color-highlight); text-shadow: 0 0 15px rgba(255, 51, 102, 0.4); margin-bottom: 2rem;">
                            ${CONFIG_DATA.finalVault.promiseText}
                        </div>
                        <div class="promise-sig" style="font-family: var(--font-serif); font-size: 1.2rem; color: #fff; margin-bottom: 2rem;">
                            — ${CONFIG_DATA.finalVault.signature}
                        </div>
                        <div style="background: rgba(255,255,255,0.01); border-top: 1px solid rgba(255,255,255,0.04); padding-top: 1rem; width: 100%; font-size: 0.65rem; font-family: monospace; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.15em;">
                            <i class="fa-solid fa-circle-check mr-2" style="color: var(--color-highlight);"></i>Sistema de Amor 100% Desbloqueado y Operativo
                        </div>
                    </div>
                `;
                promiseView.style.display = 'block';
                promiseView.style.opacity = '0';
                
                setTimeout(() => {
                    promiseView.style.opacity = '1';
                    promiseView.style.transition = 'opacity 0.8s';
                    triggerFinalRadialExplosion();
                }, 100);
            }, 500);
        } else {
            // Vibrar tarjeta
            vaultPanel.classList.add('shake-card');
            passField.value = '';
            setTimeout(() => vaultPanel.classList.remove('shake-card'), 550);
        }
    });

    themeBtn.addEventListener('click', () => {
        const isNeon = document.body.classList.contains('theme-neon');
        if (isNeon) {
            document.body.className = 'theme-rose';
            themeBtn.classList.remove('active');
        } else {
            document.body.className = 'theme-neon';
            themeBtn.classList.add('active');
        }
    });

    // Sincronizar estado inicial del interruptor del tema con el body
    const initialIsNeon = document.body.classList.contains('theme-neon');
    if (initialIsNeon) {
        themeBtn.classList.add('active');
    } else {
        themeBtn.classList.remove('active');
    }
}

function triggerFinalRadialExplosion() {
    const container = document.body;
    const symbols = ['💖', '💝', '❤️', '✨', '🌸'];
    for (let i = 0; i < 35; i++) {
        const p = document.createElement('div');
        p.className = 'love-explosion-particle';
        p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        p.style.left = '50%';
        p.style.top = '50%';
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 260 + 120;
        const dx = Math.sin(angle) * radius;
        const dy = -Math.abs(Math.cos(angle) * radius) - 100;
        const dr = Math.random() * 720 - 360;
        p.style.setProperty('--dx', `${dx}px`);
        p.style.setProperty('--dy', `${dy}px`);
        p.style.setProperty('--dr', `${dr}deg`);
        p.style.animationDuration = '1.3s';
        p.addEventListener('animationend', () => p.remove());
        container.appendChild(p);
    }
}

/**
 * 💖 7. CONTROLADOR DE LA CABECERA PREMIUM Y MENÚS DE NAVEGACIÓN
 */
function initHeaderNavigation() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const navToggle = header.querySelector('.mobile-nav-toggle');
    const nav = header.querySelector('.header-nav');
    const navLinks = header.querySelectorAll('.nav-link');

    // 1. Interactividad del Menú Móvil (Hamburger)
    if (navToggle && nav) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggle.classList.toggle('active-toggle');
            nav.classList.toggle('mobile-active');
        });

        // Cerrar el menú si se hace clic fuera de él
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('mobile-active') && !nav.contains(e.target) && e.target !== navToggle) {
                navToggle.classList.remove('active-toggle');
                nav.classList.remove('mobile-active');
            }
        });
    }

    // 2. Control de Desplazamiento Suave (Smooth Scroll) Offseteado
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const secNum = parseInt(link.getAttribute('data-sec'));
            const targetSec = document.getElementById(`sec-${secNum}`);

            // Cerrar menú móvil si está abierto
            if (navToggle && nav) {
                navToggle.classList.remove('active-toggle');
                nav.classList.remove('mobile-active');
            }

            if (targetSec) {
                // Garantizar la hidratación del componente si está diferido (lazy hydrated)
                if (targetSec.dataset.loaded === 'false') {
                    hydrateSuperSection(targetSec, secNum);
                }
                
                // Calcular la posición exacta considerando el alto de la cabecera fija
                const headerHeight = header.offsetHeight || 85;
                const elementPosition = targetSec.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Clic en el branding para volver suavemente al Inicio (Scroll to top)
    const branding = header.querySelector('.logo-branding-container');
    if (branding) {
        branding.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}
