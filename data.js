/**
 * ==========================================================================
 * PROYECTO "ANTIGRAVITY LOVE" — LA BASE DE DATOS DE SUPER-COMPONENTES
 * data.js - Configuración JSON Consolidada para los 10 Super-Módulos
 * ==========================================================================
 */

const CONFIG_DATA = {
    // 📅 Configuración de Fecha Aniversario
    anniversaryStartDate: '2024-05-16T17:00:00',

    // 🎨 Temas del Sistema
    themes: {
        rose: {
            name: 'Rosa Clásico Lujo',
            class: 'theme-rose',
            accent: 'rgba(255, 105, 180, 0.8)',
            accentSolid: '#ff69b4'
        },
        neon: {
            name: 'Cian Neón Sci-Fi',
            class: 'theme-neon',
            accent: 'rgba(0, 255, 255, 0.5)',
            accentSolid: '#00ffff'
        }
    },

    // 🪐 1. COVER PAGE: Portada de Bienvenida
    coverPage: {
        title: 'Antigravity Love',
        subtitle: 'Para la persona que desafía las leyes de mi física y llena de luz mi universo entero.',
        badge: 'Módulo 1 / 10',
        enterBtn: 'Ingresar al Portal'
    },

    // 🌟 2. CORE HERO: El Centro de Mando
    coreHero: {
        title: 'Un Regalo del Destino',
        subtitle: 'Nuestra historia en un latido constante',
        badge: 'Módulo 2 / 10'
    },

    // 📸 3. MEMORY HUB: Galería de Polaroids Categorizada
    memoryHub: {
        title: 'El Hub de Memorias',
        subtitle: 'Explora nuestros recuerdos filtrados por categoría',
        badge: 'Módulo 3 / 10',
        categories: [
            { id: '2024', name: 'Nuestros Inicios' },
            { id: 'viajes', name: 'Viajes & Rutas' },
            { id: 'comida', name: 'Tardes de Café' },
            { id: 'mascotas', name: 'Amigos Peludos' }
        ],
        items: {
            '2024': [
                { id: 1, title: 'Nuestra Primera Tarde', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=60', alt: 'Primera cita', rotation: -3 },
                { id: 2, title: 'Bajo las Luces del Café', src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=60', alt: 'Noche especial', rotation: 4 },
                { id: 3, title: 'Tu Mirada de Luz', src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=60', alt: 'Tarde de parque', rotation: -2 }
            ],
            'viajes': [
                { id: 4, title: 'Escapada al Bosque', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=60', alt: 'Viaje montaña', rotation: 3 },
                { id: 5, title: 'Bajo la Lluvia', src: 'https://images.unsplash.com/photo-1437419764061-2473afe69fc2?w=600&auto=format&fit=crop&q=60', alt: 'Ciudad lluviosa', rotation: -4 },
                { id: 6, title: 'Atardecer en la Playa', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=60', alt: 'Mar azul', rotation: 2 }
            ],
            'comida': [
                { id: 7, title: 'Café & Muffins', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=60', alt: 'Postre delicioso', rotation: -5 },
                { id: 8, title: 'Pizza de Viernes', src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=60', alt: 'Cena compartida', rotation: 3 }
            ],
            'mascotas': [
                { id: 9, title: 'Travesuras de Firulais', src: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=60', alt: 'Perrito feliz', rotation: -2 },
                { id: 10, title: 'Misi en el Sofá', src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60', alt: 'Gatito durmiendo', rotation: 4 }
            ]
        }
    },

    // ✉️ 4. QUANTUM MAILBOX: El Buzón de Cartas Emocionales
    quantumMailbox: {
        title: 'El Buzón Cuántico',
        subtitle: 'Selecciona una emoción para desplegar la carta holográfica correspondiente',
        badge: 'Módulo 4 / 10',
        emotions: [
            { id: 'aniversario', name: 'Ábrelo en Aniversario', icon: 'fa-gift', color: 'rgba(255, 105, 180, 0.15)' },
            { id: 'triste', name: 'Ábrelo si estás Triste', icon: 'fa-cloud-showers-water', color: 'rgba(30, 144, 255, 0.15)' },
            { id: 'feliz', name: 'Ábrelo si estás Feliz', icon: 'fa-wand-magic-sparkles', color: 'rgba(255, 215, 0, 0.15)' },
            { id: 'cansada', name: 'Ábrelo si estás Cansada', icon: 'fa-circle-check', color: 'rgba(147, 112, 219, 0.15)' }
        ],
        letters: {
            'aniversario': 'Querido Amor,\n\nHoy celebramos otro ciclo de complicidad perfecta. A tu lado, el tiempo no transcurre en segundos tradicionales, sino en latidos sincrónicos e intensos. Eres mi constante física favorita del universo.\n\nPara Siempre,\nTu Amor Eterno.',
            'triste': 'Hola mi cielo,\n\nSi hoy el día se ve nublado, recuerda que detrás de las nubes el sol sigue brillando para nosotros. Estoy a un solo latido de distancia. Cierra los ojos y siente mi abrazo incondicional en este texto.\n\nTe amo infinitamente.',
            'feliz': '¡Qué alegría verte sonreír!\n\nTu felicidad es el motor que impulsa toda la antigravedad de mi mundo. Sigamos construyendo momentos mágicos y pintando galaxias enteras con nuestra risa compartida.\n\n¡Eres increíble!',
            'cansada': 'Descansa, mi vida...\n\nSé que te esfuerzas al máximo cada día. Hoy relájate, ponte cómoda y deja que este sistema te susurre lo orgulloso que estoy de ti. Válido por mimos infinitos y masajes de pies al llegar.\n\nTu refugio seguro.'
        }
    },

    // 💖 5. REASONS CORE: El Mazo de 30 Cartas
    reasonsCore: {
        title: 'El Mazo del Alma',
        subtitle: 'Desliza las cartas para descubrir las razones por las que te amo',
        badge: 'Módulo 5 / 10',
        reasons: [
            "Por tu sonrisa que disuelve mis días más difíciles.",
            "Por la forma en que tus ojos brillan cuando te ríes de mis tonterías.",
            "Por tu paciencia inquebrantable y tu apoyo incondicional.",
            "Por cómo encajan nuestras manos de forma natural, desafiando la distancia.",
            "Por tu inteligencia brillante que me inspira a ser mejor cada día.",
            "Por tus pequeños hábitos adorables al tomar tu taza de café por las mañanas.",
            "Por cada aventura que planeamos juntos, llenando nuestro mapa de ilusiones.",
            "Por tu voz, que es la melodía que calma cualquier tormenta en mi mente.",
            "Por tu generosidad sin límites y la belleza pura de tu corazón.",
            "Por la forma mágica en la que me haces sentir seguro en tus abrazos.",
            "Por cada risa compartida hasta que nos duele el abdomen.",
            "Por ser mi refugio seguro y mi constante en este universo caótico.",
            "Por tu valentía para afrontar cada desafío con una sonrisa.",
            "Por la calidez de tus besos que disipan cualquier frío invernal.",
            "Por tu capacidad para encontrar belleza en los detalles más pequeños del día.",
            "Por tu lealtad a toda prueba, que cuido como el tesoro más sagrado.",
            "Por tu olor único que se queda grabado en mis suéteres favoritos.",
            "Por la complicidad con la que nos entendemos con una sola mirada de reojo.",
            "Por tu forma de escucharme con absoluta atención y sin juzgarme.",
            "Por cómo te preocupas por mi bienestar en cada pequeño detalle cotidiano.",
            "Por cada postre delicioso que compartimos compartiendo el último bocado.",
            "Por tus mimos cariñosos que son el mejor analgésico del planeta.",
            "Por tu alegría contagiosa que ilumina cualquier habitación al entrar.",
            "Por los apodos secretos y las bromas internas que solo nosotros entendemos.",
            "Por inspirarme a soñar en grande y caminar a tu lado hacia el futuro.",
            "Por tu amor incondicional que no pide nada a cambio más que reciprocidad.",
            "Por la forma en que cuidas de los que amas con tanta ternura.",
            "Por cada mensaje de buenos días que hace que empiece mi jornada con luz.",
            "Por cada promesa del alma que hemos pactado en voz baja en la noche.",
            "Por ser tú, la persona ideal con la que el destino me premió."
        ]
    },

    // 💻 6. SYSTEM CONSOLE: Consola y Diagnóstico
    systemConsole: {
        title: 'Consola del Sistema',
        subtitle: 'Monitoreo activo y diagnóstico de nuestro clúster afectivo',
        badge: 'Módulo 6 / 10',
        logs: [
            'Inicializando Amor Server v2.6.5... [OK]',
            'Conectando clúster MongoDB Atlas (Cluster: Corazon_Principal)... [CONECTADO]',
            'Verificando canal seguro de lealtad TLS 1.3... [SEGURO]',
            'Monitoreando frecuencia de latidos... 72 lpm [ESTABLE]',
            'Cargando variables de confianza y mimos... 100% [COMPLETO]',
            'Diagnóstico del núcleo: Sistema amoroso operando con 0% de desconexión.'
        ]
    },

    // 🎟️ 7. COUPONS WALLET: Billetera de Vales
    couponsWallet: {
        title: 'Tus Vales Digitales',
        subtitle: 'Canjea tus cupones holográficos interactivos',
        badge: 'Módulo 7 / 10',
        coupons: [
            { id: 1, title: "Cena Romántica", icon: "fa-utensils", description: "Válido por una cena mágica bajo la luz de las velas con postre ilimitado.", code: "CENA-GLAM-2026" },
            { id: 2, title: "Pelis y Manta", icon: "fa-film", description: "Válido por una tarde entera acurrucados con palomitas, mantita y sagas.", code: "PELIS-MANTA-LOVE" },
            { id: 3, title: "Viaje Sorpresa", icon: "fa-plane-departure", description: "Válido por una escapada de fin de semana a un destino por descubrir.", code: "VIAJE-SORPRESA" }
        ]
    },

    // 🎯 8. DECISION CENTER: Minijuegos de Citas y Películas
    decisionCenter: {
        title: 'Centro de Decisiones',
        subtitle: 'Alterna entre nuestros minijuegos para resolver la tarde ideal',
        badge: 'Módulo 8 / 10',
        optionsCitas: ['Paseo por el Parque', 'Cena Elegante', 'Tarde de Museos', 'Cocinar Juntos', 'Karaoke Privado', 'Sesión de Masajes'],
        optionsPelis: ['Ciencia Ficción', 'Romance Clásico', 'Comedia Divertida', 'Terror del Bueno', 'Maratón de Series', 'Película Animada']
    },

    // 🌍 9. FUTURE MAP: Metas y Coordenadas del Porvenir
    futureMap: {
        title: 'Mapa del Futuro',
        subtitle: 'Nuestros próximos hitos, aventuras y promesas geográficas',
        badge: 'Módulo 9 / 10',
        categories: [
            { id: 'casa', name: 'Nuestra Casa', coords: 'Lat 45.4642° / Lon 9.1900°', icon: 'fa-house-chimney' },
            { id: 'aventura', name: 'Viaje de Aventura', coords: 'Lat 46.0619° / Lon 11.1202°', icon: 'fa-mountain-sun' },
            { id: 'soñado', name: 'El Viaje Soñado', coords: 'Lat 35.6762° / Lon 139.6503°', icon: 'fa-plane-up' }
        ],
        items: {
            'casa': [
                { id: 1, title: 'El Living Soñado', src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=60', rotation: -3 },
                { id: 2, title: 'Cocina de Mimos', src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=60', rotation: 2 },
                { id: 3, title: 'Balcón de Plantas', src: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=60', rotation: -2 }
            ],
            'aventura': [
                { id: 4, title: 'Cabaña de Pinos', src: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&auto=format&fit=crop&q=60', rotation: 3 },
                { id: 5, title: 'Lago Espejo', src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=60', rotation: -4 },
                { id: 6, title: 'Fogata de Noche', src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=60', rotation: 1 }
            ],
            'soñado': [
                { id: 7, title: 'Cerezos en Flor', src: 'https://images.unsplash.com/photo-1524413840003-058749e36584?w=600&auto=format&fit=crop&q=60', rotation: -3 },
                { id: 8, title: 'Luces de Tokio', src: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&auto=format&fit=crop&q=60', rotation: 4 },
                { id: 9, title: 'Templo de Kioto', src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop&q=60', rotation: -2 }
            ]
        }
    },

    // 🔒 10. FINAL VAULT: La Bóveda de Seguridad
    finalVault: {
        title: 'Bóveda de Seguridad',
        subtitle: 'Ingrese la llave de encriptación para revelar el pacto final (DDMMAAAA)',
        badge: 'Módulo 10 / 10',
        correctCode: '23022026',
        promiseText: '"Esta es mi promesa final: cuidarte en cada latido, acompañarte en cada paso y amarte infinitamente con la fuerza que desafía la gravedad de nuestro universo."',
        signature: 'Tu Amor Eterno'
    }
};
