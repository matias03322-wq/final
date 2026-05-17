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

        case 4: // QUANTUM MAILBOX
            sec.innerHTML = `
                <div class="glass-panel reveal-element revealed mailbox-state-container" id="mailbox-ambient-card">
                    <h2 style="font-family: var(--font-serif); font-size: 2rem; margin-bottom: 0.5rem;">${CONFIG_DATA.quantumMailbox.title}</h2>
                    <p style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 1.5rem;">${CONFIG_DATA.quantumMailbox.subtitle}</p>
                    
                    <div class="quantum-select-wrapper">
                        <select class="quantum-select" id="quantum-emotion-select">
                            <option value="" disabled selected>-- Ábrelo cuando te sientas... --</option>
                            ${CONFIG_DATA.quantumMailbox.emotions.map(e => `
                                <option value="${e.id}">${e.name}</option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="envelope-wrapper">
                        <div class="envelope-glass">
                            <div class="envelope-flap" id="quantum-envelope-flap"></div>
                            <div class="wax-seal" id="quantum-wax-seal-btn">
                                <i class="fa-solid fa-heart"></i>
                            </div>
                        </div>
                    </div>

                    <div style="background: rgba(5,5,8,0.75); padding: 1.5rem; border-radius: 16px; font-family: monospace; color: var(--color-highlight); min-height: 140px; text-align: left; line-height: 1.6; border: 1px solid rgba(255,255,255,0.03); display: none;" id="quantum-letter-body">
                        [SELECCIONE UNA EMOCIÓN...]
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

        case 8: // DECISION CENTER
            sec.innerHTML = `
                <div class="glass-panel reveal-element revealed" style="padding: 3rem 2.5rem; text-align: center; max-width: 580px; width: 100%;">
                    <h2 style="font-family: var(--font-serif); font-size: 2rem; margin-bottom: 0.5rem;">${CONFIG_DATA.decisionCenter.title}</h2>
                    <p style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 2rem;">${CONFIG_DATA.decisionCenter.subtitle}</p>
                    
                    <div class="decision-tabs">
                        <button class="decision-tab-btn active" id="tab-citas">Planes de Citas</button>
                        <button class="decision-tab-btn" id="tab-pelis">Tardes de Cine</button>
                    </div>

                    <div class="decision-wheel-wrapper">
                        <div class="wheel-spinner" id="decision-spinner-disk">
                            Pulsa girar
                        </div>
                    </div>

                    <button class="btn-glow-magenta" id="btn-spin-wheel" style="margin-top: 1rem;">
                        <i class="fa-solid fa-rotate mr-2"></i>Girar Ruleta
                    </button>
                </div>
            `;
            initDecisionCenterController(sec);
            break;

        case 9: // FUTURE MAP
            sec.innerHTML = `
                <div class="glass-panel reveal-element revealed" style="padding: 3rem 2rem; text-align: center; max-width: 550px; width: 100%;">
                    <h2 style="font-family: var(--font-serif); font-size: 2rem; margin-bottom: 0.5rem;">${CONFIG_DATA.futureMap.title}</h2>
                    <p style="font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-bottom: 2.5rem;">${CONFIG_DATA.futureMap.subtitle}</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 1rem; text-align: left;">
                        ${CONFIG_DATA.futureMap.pins.map((p, idx) => `
                            <div style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 1.2rem; border-radius: 16px; display: flex; gap: 1rem; align-items: center; transition: all 0.3s;" class="future-pin-card">
                                <div style="font-size: 1.6rem; color: var(--color-highlight);"><i class="fa-solid fa-map-location-dot"></i></div>
                                <div>
                                    <h4 style="font-family: var(--font-serif); font-size: 1.1rem; color: #fff; margin-bottom: 2px;">${p.name}</h4>
                                    <span style="font-size: 0.65rem; color: var(--color-highlight); font-family: monospace;">${p.coords}</span>
                                    <p style="font-size: 0.78rem; color: rgba(255,255,255,0.5); margin-top: 6px;">${p.desc}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;

        case 10: // FINAL VAULT
            sec.innerHTML = `
                <div class="glass-panel vault-card reveal-element revealed" id="sec-vault-panel" style="max-width: 500px; width: 100%; padding: 3.5rem 2rem; text-align: center; position: relative;">
                    <!-- Login de Seguridad (Inicial) -->
                    <div id="vault-auth-view">
                        <div class="vault-warning">
                            <i class="fa-solid fa-shield-halved mr-2" style="font-size: 1.8rem; margin-bottom: 8px;"></i>
                            <br>${CONFIG_DATA.finalVault.title}<br>${CONFIG_DATA.finalVault.subtitle}
                        </div>
                        <div class="vault-input-wrapper">
                            <input type="password" id="vault-passcode-field" class="vault-input-box" placeholder="DDMMAAAA" maxlength="8">
                        </div>
                        
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
                            <button id="btn-unlock-vault-dynamic" class="btn-glow-magenta">Desbloquear Bóveda</button>
                            
                            <!-- Switch Háptico de Temas incrustado convenientemente en el login -->
                            <div style="display: flex; align-items: center; gap: 1rem; margin-top: 1rem;">
                                <span style="font-size: 0.72rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em;">Tema Alternativo:</span>
                                <div class="haptic-switch-box" id="vault-theme-switch">
                                    <div class="haptic-switch-nob"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contenido Oculto de la Promesa (Hydrated al autenticarse) -->
                    <div id="vault-promise-view" style="display: none;">
                        <!-- Inyección cinemática tras contraseña correcta -->
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
    const select = sec.querySelector('#quantum-emotion-select');
    const flap = sec.querySelector('#quantum-envelope-flap');
    const seal = sec.querySelector('#quantum-wax-seal-btn');
    const letter = sec.querySelector('#quantum-letter-body');
    const ambientCard = sec.querySelector('#mailbox-ambient-card');

    if (!select || !flap || !seal || !letter || !ambientCard) return;

    let selectedEmotion = '';
    let typewriterTimeout = null;

    select.addEventListener('change', (e) => {
        selectedEmotion = e.target.value;
        const emoConfig = CONFIG_DATA.quantumMailbox.emotions.find(em => em.id === selectedEmotion);
        
        // Cambiar iluminación ambiental y sombras de borde
        if (emoConfig) {
            ambientCard.style.background = emoConfig.color;
            ambientCard.style.borderColor = `rgba(${CONFIG_DATA.themes.rose.accent}, 0.4)`;
            ambientCard.style.boxShadow = `0 15px 40px 0 ${emoConfig.color}`;
        }
        
        // Cerrar sobre si estaba abierto para reiniciar
        flap.style.transform = 'rotateX(0deg)';
        letter.style.display = 'none';
        letter.innerHTML = '';
        if (typewriterTimeout) clearTimeout(typewriterTimeout);
    });

    seal.addEventListener('click', () => {
        if (!selectedEmotion) {
            alert('Por favor, selecciona primero un estado de ánimo en el selector superior.');
            return;
        }

        // Abrir sobre
        flap.style.transform = 'rotateX(180deg)';
        
        setTimeout(() => {
            letter.style.display = 'block';
            letter.innerHTML = '';
            
            const rawText = CONFIG_DATA.quantumMailbox.letters[selectedEmotion];
            let idx = 0;
            
            function type() {
                if (!sec.isConnected) return;
                if (idx < rawText.length) {
                    letter.textContent += rawText[idx];
                    idx++;
                    typewriterTimeout = setTimeout(type, 25);
                }
            }
            type();
        }, 600);
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
    const btn = sec.querySelector('#btn-spin-wheel');

    if (!tabCitas || !tabPelis || !disk || !btn) return;

    let currentMode = 'citas'; // 'citas' o 'pelis'
    let currentRotation = 0;

    tabCitas.addEventListener('click', () => {
        tabCitas.classList.add('active');
        tabPelis.classList.remove('active');
        currentMode = 'citas';
        disk.textContent = 'Ruleta de Citas';
    });

    tabPelis.addEventListener('click', () => {
        tabPelis.classList.add('active');
        tabCitas.classList.remove('active');
        currentMode = 'pelis';
        disk.textContent = 'Ruleta de Películas';
    });

    btn.addEventListener('click', () => {
        const options = currentMode === 'citas' 
            ? CONFIG_DATA.decisionCenter.optionsCitas 
            : CONFIG_DATA.decisionCenter.optionsPelis;

        const extraRot = Math.floor(Math.random() * 5) * 360 + 1440; // Mínimo 4 vueltas completas
        currentRotation += extraRot;

        disk.style.transform = `rotate(${currentRotation}deg)`;
        disk.textContent = 'Girando...';

        setTimeout(() => {
            const finalChoice = options[Math.floor(Math.random() * options.length)];
            disk.textContent = finalChoice;
            triggerWheelSparks();
        }, 4000);
    });
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

    if (!unlockBtn || !passField || !authView || !promiseView || !vaultPanel || !themeBtn) return;

    unlockBtn.addEventListener('click', () => {
        const code = passField.value.trim();
        if (code === CONFIG_DATA.finalVault.correctCode) {
            // Animación desvanecer login
            authView.style.opacity = '0';
            setTimeout(() => {
                authView.style.display = 'none';
                promiseView.innerHTML = `
                    <div class="promise-scroll-text">${CONFIG_DATA.finalVault.promiseText}</div>
                    <div class="promise-sig">${CONFIG_DATA.finalVault.signature}</div>
                    <div style="background: rgba(255,255,255,0.01); border-top: 1px solid rgba(255,255,255,0.04); padding-top: 1rem; margin-top: 2rem; font-size: 0.65rem; font-family: monospace; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.15em;">
                        <i class="fa-solid fa-circle-check mr-2" style="color: var(--color-highlight);"></i>Sistema Amoroso 100% Operativo. Continuará...
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
        } else {
            document.body.className = 'theme-neon';
        }
    });
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
