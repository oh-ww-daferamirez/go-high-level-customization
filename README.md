# Go High Level Customization

Personalización visual completa de Go High Level utilizando JavaScript y CSS con tu paleta de colores de marca personalizada.

## 🎨 Paleta de Colores

- **Color 1**: `#4551d8` (Azul claro)
- **Color 2**: `#373ebe` (Azul medio)
- **Color 3**: `#292ca5` (Azul medio-oscuro)
- **Color 4**: `#181a8d` (Azul oscuro - Color primario)
- **Color 5**: `#000675` (Azul muy oscuro)

## 📁 Estructura de Archivos

```
go-high-level-customization/
├── css/
│   ├── global/
│   │   ├── variables.css          # Variables CSS globales
│   │   ├── reset.css              # Reset y normalización
│   │   └── utilities.css         # Clases de utilidad
│   ├── components/
│   │   ├── buttons.css            # Estilos de botones
│   │   └── forms.css              # Estilos de formularios
│   └── pages/
│       └── landing-pages.css      # Estilos para landing pages
├── js/
│   ├── global/
│   │   ├── main.js                # Script principal
│   │   ├── utils.js               # Utilidades
│   │   └── animations.js          # Animaciones
│   └── components/
│       └── forms.js               # Componentes de formularios
└── README.md                     # Este archivo
```

## 🚀 Instalación Rápida

### Opción 1: Usar archivos CDN

Agrega el siguiente código en la sección **Head Tracking Code** de Go High Level:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://tu-dominio.com/css/global/variables.css">
<link rel="stylesheet" href="https://tu-dominio.com/css/global/reset.css">
<link rel="stylesheet" href="https://tu-dominio.com/css/global/utilities.css">
<link rel="stylesheet" href="https://tu-dominio.com/css/components/buttons.css">
<link rel="stylesheet" href="https://tu-dominio.com/css/components/forms.css">
<link rel="stylesheet" href="https://tu-dominio.com/css/pages/landing-pages.css">
```

Agrega el siguiente código en la sección **Body Tracking Code**:

```html
<!-- JavaScript -->
<script src="https://tu-dominio.com/js/global/utils.js"></script>
<script src="https://tu-dominio.com/js/global/animations.js"></script>
<script src="https://tu-dominio.com/js/components/forms.js"></script>
<script src="https://tu-dominio.com/js/global/main.js"></script>
```

### Opción 2: Archivo CSS consolidado

Crea un archivo `main.css` que importe todos los archivos CSS:

```css
@import 'global/variables.css';
@import 'global/reset.css';
@import 'global/utilities.css';
@import 'components/buttons.css';
@import 'components/forms.css';
@import 'pages/landing-pages.css';
```

Luego agrega solo este archivo:

```html
<link rel="stylesheet" href="https://tu-dominio.com/css/main.css">
```

## 📖 Uso

### Variables CSS

Usa las variables CSS en tu código personalizado:

```css
.my-element {
  background-color: var(--color-4);
  color: white;
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
}
```

### Clases de Utilidad

Usa las clases de utilidad predefinidas:

```html
<!-- Colores de fondo -->
<div class="color-1">Fondo verde</div>
<div class="color-4">Fondo azul</div>

<!-- Gradientes -->
<div class="bg-gradient-primary">Gradiente principal</div>

<!-- Espaciado -->
<div class="p-4 m-2">Padding y margin</div>

<!-- Flexbox -->
<div class="flex justify-center items-center">Centrado</div>
```

### Botones

```html
<!-- Botón primario -->
<button class="ghl-btn ghl-btn-primary">Enviar</button>

<!-- Botón gradiente -->
<button class="ghl-btn ghl-btn-gradient">Comprar Ahora</button>

<!-- Botón con color de marca -->
<button class="ghl-btn ghl-btn-color-4">Acción</button>

<!-- Botón de grupo -->
<div class="ghl-btn-group">
  <button class="ghl-btn ghl-btn-primary">Opción 1</button>
  <button class="ghl-btn ghl-btn-primary">Opción 2</button>
  <button class="ghl-btn ghl-btn-primary">Opción 3</button>
</div>
```

### Formularios

```html
<form class="ghl-form" id="myForm">
  <div class="ghl-form-group">
    <label class="ghl-label ghl-label-required" for="email">Email</label>
    <input type="email" id="email" name="email" class="ghl-input" placeholder="tu@email.com" required>
  </div>
  
  <div class="ghl-form-group">
    <label class="ghl-label" for="message">Mensaje</label>
    <textarea id="message" name="message" class="ghl-textarea" rows="4"></textarea>
  </div>
  
  <button type="submit" class="ghl-btn ghl-btn-primary ghl-btn-block">Enviar</button>
</form>
```

### JavaScript

#### Validación de Formularios

```javascript
const form = document.getElementById('myForm');
const validator = new FormValidator(form, {
  rules: {
    email: {
      required: true,
      email: true,
      requiredMessage: 'El email es requerido',
      emailMessage: 'Por favor ingresa un email válido'
    },
    message: {
      required: true,
      minLength: 10,
      requiredMessage: 'El mensaje es requerido',
      minLengthMessage: 'Mínimo 10 caracteres'
    }
  },
  onSubmit: (form) => {
    console.log('Formulario válido!', form);
    // Tu lógica de envío aquí
  }
});
```

#### Notificaciones Toast

```javascript
// Mostrar notificación de éxito
new Toast('¡Mensaje enviado correctamente!', {
  type: 'success',
  duration: 3000
}).show();

// Mostrar notificación de error
new Toast('Hubo un error al enviar el mensaje', {
  type: 'error',
  duration: 5000
}).show();
```

#### Modal

```javascript
const modalElement = document.getElementById('myModal');
const modal = new Modal(modalElement, {
  onOpen: () => console.log('Modal abierto'),
  onClose: () => console.log('Modal cerrado')
});

// Abrir modal
modal.open();

// Cerrar modal
modal.close();
```

#### Contador Animado

```javascript
const counterElement = document.querySelector('.counter');
const counter = new AnimatedCounter(counterElement, {
  endValue: 1000,
  prefix: '$',
  decimals: 0
});

counter.animate();
```

#### Contador Regresivo

```javascript
const countdownElement = document.getElementById('countdown');
const countdown = new CountdownTimer(countdownElement, '2024-12-31T23:59:59', {
  format: 'd:h:m:s',
  onTick: (time) => console.log('Tiempo restante:', time),
  onComplete: () => console.log('¡Tiempo terminado!')
});

countdown.start();
```

## 🎯 Landing Pages

### Hero Section

```html
<section class="ghl-hero">
  <div class="ghl-hero-content">
    <span class="ghl-hero-badge">Nuevo</span>
    <h1 class="ghl-hero-title">Transforma tu Negocio</h1>
    <p class="ghl-hero-subtitle">La solución completa para automatizar y escalar tu empresa</p>
    <div class="ghl-hero-cta">
      <button class="ghl-btn ghl-btn-gradient">Comenzar Ahora</button>
      <button class="ghl-btn ghl-btn-ghost">Saber Más</button>
    </div>
  </div>
</section>
```

### Feature Cards

```html
<section class="ghl-features">
  <div class="ghl-features-header">
    <h2 class="ghl-features-title">Características</h2>
    <p class="ghl-features-subtitle">Todo lo que necesitas para crecer</p>
  </div>
  
  <div class="ghl-features-grid">
    <div class="ghl-feature-card ghl-animate-on-scroll">
      <div class="ghl-feature-icon color-1">🚀</div>
      <h3 class="ghl-feature-title">Automatización</h3>
      <p class="ghl-feature-description">Automatiza tus procesos y ahorra tiempo</p>
    </div>
    
    <div class="ghl-feature-card ghl-animate-on-scroll">
      <div class="ghl-feature-icon color-4">📊</div>
      <h3 class="ghl-feature-title">Analíticas</h3>
      <p class="ghl-feature-description">Mide y optimiza tus resultados</p>
    </div>
    
    <div class="ghl-feature-card ghl-animate-on-scroll">
      <div class="ghl-feature-icon color-5">💬</div>
      <h3 class="ghl-feature-title">Comunicación</h3>
      <p class="ghl-feature-description">Conecta con tus clientes fácilmente</p>
    </div>
  </div>
</section>
```

### Testimonials

```html
<section class="ghl-testimonials">
  <div class="ghl-testimonials-header">
    <h2 class="ghl-testimonials-title">Lo que dicen nuestros clientes</h2>
  </div>
  
  <div class="ghl-testimonials-grid">
    <div class="ghl-testimonial-card">
      <p class="ghl-testimonial-text">"Increíble servicio, superó todas mis expectativas."</p>
      <div class="ghl-testimonial-author">
        <img src="avatar1.jpg" alt="Cliente" class="ghl-testimonial-avatar">
        <div class="ghl-testimonial-info">
          <span class="ghl-testimonial-name">María García</span>
          <span class="ghl-testimonial-role">CEO, TechCorp</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

## 🔧 Personalización

### Cambiar Colores

Para cambiar los colores de la marca, edita el archivo [`css/global/variables.css`](css/global/variables.css):

```css
:root {
  --color-1: #4551d8;  /* Azul claro */
  --color-2: #373ebe;  /* Azul medio */
  --color-3: #292ca5;  /* Azul medio-oscuro */
  --color-4: #181a8d;  /* Azul oscuro */
  --color-5: #000675;  /* Azul muy oscuro */
}
```

### Cambiar Tipografía

Edita las variables de tipografía en [`css/global/variables.css`](css/global/variables.css):

```css
:root {
  --font-family-primary: 'Tu Fuente', sans-serif;
  --font-family-secondary: 'Tu Fuente Secundaria', sans-serif;
}
```

### Agregar Nuevas Animaciones

Agrega nuevas animaciones en [`js/global/animations.js`](js/global/animations.js):

```javascript
class MiNuevaAnimacion {
  constructor(element, options = {}) {
    this.element = element;
    this.options = options;
    this.init();
  }
  
  init() {
    // Tu lógica de inicialización
  }
  
  animate() {
    // Tu lógica de animación
  }
}
```

## 📱 Responsive Design

Los estilos son completamente responsive y se adaptan automáticamente a:

- **Móvil**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Pruebas

### Probar Localmente

1. Abre los archivos HTML en tu navegador
2. Verifica que los estilos se carguen correctamente
3. Prueba la funcionalidad JavaScript

### Probar en Go High Level

1. Sube los archivos a tu servidor o CDN
2. Agrega los enlaces en Go High Level
3. Verifica que todo funcione correctamente

## 🐛 Solución de Problemas

### Los estilos no se aplican

1. Verifica que los archivos CSS estén cargando (inspecciona la consola)
2. Asegúrate de que los archivos estén en el servidor correcto
3. Limpia el caché del navegador

### JavaScript no funciona

1. Abre la consola del navegador (F12)
2. Busca errores en la consola
3. Verifica que los archivos JS estén cargando en el orden correcto

### Los colores no se muestran

1. Verifica que el archivo `variables.css` esté cargando primero
2. Asegúrate de que las variables CSS estén definidas correctamente
3. Usa las variables con la sintaxis correcta: `var(--nombre-variable)`

## 📚 Recursos Adicionales

- [Documentación de Go High Level](https://help.gohighlevel.com/)
- [Guía de Custom Code](https://help.gohighlevel.com/support/solutions/articles/48001144906-custom-code)
- [Documentación CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

## 🤝 Contribuir

Si encuentras algún problema o tienes sugerencias, por favor:

1. Abre un issue describiendo el problema
2. O envía un pull request con tu mejora

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👨‍💻 Soporte

Para soporte adicional, consulta la documentación completa en [`plans/plan-personalizacion-go-high-level.md`](../plans/plan-personalizacion-go-high-level.md)

---

**Versión**: 1.0.0  
**Última actualización**: 2024
