# Sistema de Diseño UI/UX — "Antigravity & Romance Premium"

Este documento es la **única fuente de verdad (Single Source of Truth - SSOT)** para el sistema de diseño UI/UX de nuestra web. Define la identidad visual, los componentes principales, los efectos globales y las pautas tipográficas para garantizar una experiencia de usuario coherente, lujosa e inmersiva.

---

## 🌌 1. Tema General y Filosofía Visual

El diseño se centra en un concepto de **Dark Mode Premium**, que combina el misterio del espacio cósmico con la calidez, romance y exclusividad de una experiencia de lujo. 

- **Atmósfera:** Nocturna, profunda, mágica y sumamente elegante.
- **Sensación:** Ingravidez, fluidez y misticismo emocional.
- **Acabados:** Bordes ultrafinos, reflejos cristalinos, luces difusas de neón suave y elementos flotantes.

---

## 🎨 2. Paleta de Colores (Fidelidad de Color)

Nuestra paleta de colores evoca un universo romántico y sofisticado. Se compone de un fondo estelar profundo y dos acentos luminosos de alta gama.

| Variable CSS | Valor Hex / RGBA | Función Visual | Ejemplo de Uso |
| :--- | :--- | :--- | :--- |
| `--bg-cosmic` | `#0a0a0c` | Fondo base ultra oscuro. | Fondo principal de la página, secciones completas. |
| `--magenta-glow` | `rgba(255, 105, 180, 0.8)` | Acento principal cálido y pasional (Magenta brillante). | Botones destacados, corazones, elementos de interacción activa, títulos románticos. |
| `--cyan-glow` | `rgba(0, 255, 255, 0.5)` | Acento tecnológico y secundario (Cian místico). | Detalles de interfaz, hover states alternativos, partículas luminosas del fondo. |

### Definición en CSS (Tokens de Raíz)

```css
:root {
    --bg-cosmic: #0a0a0c;
    --magenta-glow: rgba(255, 105, 180, 0.8);
    --magenta-solid: #ff69b4;
    --cyan-glow: rgba(0, 255, 255, 0.5);
    --cyan-solid: #00ffff;
    --white-soft: rgba(255, 255, 255, 0.9);
    --white-dim: rgba(255, 255, 255, 0.6);
}
```

---

## 🔮 3. Componentes Principales: Glassmorphism

Para evocar la pureza del cristal y el lujo contemporáneo, la interfaz hace un uso intensivo de **Glassmorphism**. Todos los paneles, modales, tarjetas y menús deben respetar la siguiente especificación estricta:

- **Efecto de Desenfoque:** `backdrop-filter: blur(12px)` para suavizar el contenido del fondo.
- **Fondo Translúcido:** Un fondo oscuro de alta transparencia que permita entrever los elementos del fondo de forma sutil.
- **Borde de Contención:** Un borde extremadamente delgado y sutil para definir la estructura de la tarjeta sin saturar la vista.

### Especificación Estándar de Tarjeta de Cristal (CSS)

```css
.card-glass {
    background: rgba(10, 10, 12, 0.45); /* Fondo oscuro muy transparente */
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05); /* Borde sutil y minimalista */
    border-radius: 16px; /* Esquinas redondeadas premium */
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                border-color 0.4s ease, 
                box-shadow 0.4s ease;
}

/* Efecto Hover Premium */
.card-glass:hover {
    border-color: rgba(255, 105, 180, 0.2); /* Resplandor magenta sutil en el borde */
    box-shadow: 0 8px 32px 0 rgba(255, 105, 180, 0.1);
    transform: translateY(-8px); /* Elevación interactiva */
}
```

---

## 🍃 4. Efectos Globales: Estilo 'Antigravedad'

Para reflejar la identidad del diseño flotante, la interfaz implementa un concepto de **Antigravedad**. Los elementos deben reaccionar como si estuvieran suspendidos en el espacio o en agua profunda.

### A. Suspensión de Tarjetas (Floating Cards)
Las tarjetas de contenido deben tener una animación de balanceo vertical suave y continuo que simule la flotabilidad.

```css
@keyframes floating {
    0% {
        transform: translateY(0px) rotate(0deg);
    }
    50% {
        transform: translateY(-10px) rotate(0.5deg);
    }
    100% {
        transform: translateY(0px) rotate(0deg);
    }
}

.card-floating {
    animation: floating 6s ease-in-out infinite;
}
```

### B. Sistema de Partículas Ascendentes (Anti-gravity Background)
La web debe contar con un contenedor de fondo dedicado a partículas e iconos flotantes que emerjan de abajo hacia arriba de forma fluida y continua, desvaneciéndose en la parte superior.

```css
/* Contenedor del Sistema de Antigravedad */
#antigravity-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1; /* Detrás de las tarjetas de cristal */
    overflow: hidden;
}

/* Animación de Ascenso Cósmico */
@keyframes antigravedad {
    0% {
        transform: translateY(110vh) scale(0.8) rotate(0deg);
        opacity: 0;
    }
    15% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-15vh) scale(1.1) rotate(360deg);
        opacity: 0;
    }
}

.antigravity-particle {
    position: absolute;
    bottom: -100px;
    will-change: transform, opacity;
    animation: antigravedad linear forwards;
}
```

---

## ✍️ 5. Pautas de Tipografía y Jerarquía

La tipografía debe equilibrar la elegancia clásica y el misticismo del romance con una legibilidad excepcional en pantallas digitales.

### A. Títulos (Serif Elegante)
Para los títulos principales (`h1`, `h2`, `h3`), se utilizará una fuente **Serif clásica y elegante** que evoque editorial de lujo o diarios antiguos.
- **Fuentes Recomendadas:** *Playfair Display*, *Cinzel*, *Lora* o *Bodoni*.
- **Estilo:** Letras amplias, alto contraste de grosores y excelente espaciado entre letras (*letter-spacing*).
- **Ejemplo en CSS:**
  ```css
  h1, h2, h3, .font-serif-luxury {
      font-family: 'Playfair Display', Lora, Georgia, serif;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: var(--white-soft);
      text-shadow: 0 0 20px rgba(255, 105, 180, 0.15); /* Sutil resplandor rosa */
  }
  ```

### B. Cuerpos de Texto (Sans-Serif Limpio)
Para garantizar la legibilidad fluida de los diarios de amor, las descripciones y la navegación, se utiliza una fuente **Sans-Serif geométrica y sumamente limpia**.
- **Fuentes Recomendadas:** *Inter*, *Outfit*, *Montserrat* o *Roboto*.
- **Ejemplo en CSS:**
  ```css
  body, p, span, .font-sans-clean {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-weight: 400;
      line-height: 1.6;
      color: var(--white-dim);
  }
  ```

### C. Textos Románticos y Destacados (Cursiva / Cursive)
Para notas escritas a mano, cartas secretas, firmas románticas o frases poéticas seleccionadas, se empleará ocasionalmente una fuente **cursiva fluida y elegante**.
- **Fuentes Recomendadas:** *Great Vibes*, *Alex Brush*, *Dancing Script* o *Pinyon Script*.
- **Ejemplo en CSS:**
  ```css
  .romantic-note, .cursive-highlight {
      font-family: 'Great Vibes', 'Dancing Script', cursive;
      font-size: 1.5rem;
      color: var(--magenta-glow);
      font-style: italic;
      letter-spacing: 0.05em;
  }
  ```

---

## 🛠️ 6. Resplandor Adaptable (Glow & Neon Filters)

De acuerdo con las reglas de renderizado del sistema:
- **NO usar `box-shadow` en imágenes transparentes (PNG/WebP)**, ya que crea sombras cuadradas indeseadas.
- **USAR `filter: drop-shadow()`** para que el brillo de neón siga perfectamente la silueta de los iconos u objetos flotantes.

### Clases de Brillo Estándar

```css
/* Resplandor sutil */
.brillo-leve {
    filter: drop-shadow(0 0 8px rgba(255, 105, 180, 0.4));
}

/* Resplandor neón multicapa intenso */
.brillo-intenso {
    filter: drop-shadow(0 0 10px rgba(255, 105, 180, 0.6))
            drop-shadow(0 0 20px rgba(0, 255, 255, 0.4))
            drop-shadow(0 0 30px rgba(255, 105, 180, 0.3));
}
```
