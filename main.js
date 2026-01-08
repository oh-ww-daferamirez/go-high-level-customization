/**
 * Archivo JavaScript consolidado para Go High Level
 * Contiene todas las funcionalidades en un solo archivo para facilitar la implementación
 */

'use strict';

// ========================================
// CONFIGURACIÓN GLOBAL
// ========================================
const GHLConfig = {
  version: '1.0.0',
  colors: {
    primary: '#181a8d',
    secondary: '#4551d8',
    accent1: '#373ebe',
    accent2: '#292ca5',
    accent3: '#000675'
  },
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1280
  }
};

// ========================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ========================================
const GHLState = {
  isMobile: false,
  isTablet: false,
  isDesktop: false,
  scrollY: 0,
  scrollDirection: 'down',
  lastScrollY: 0
};

// ========================================
// UTILIDADES
// ========================================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function scrollToElement(element, offset = 0) {
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

function formatNumber(number) {
  return new Intl.NumberFormat('en-US').format(number);
}

function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', Object.assign({}, defaultOptions, options)).format(date);
}

function formatTime(date, options = {}) {
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Intl.DateTimeFormat('en-US', Object.assign({}, defaultOptions, options)).format(date);
}

function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function isMobile() {
  return window.innerWidth <= 768;
}

function isTablet() {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
}

function isDesktop() {
  return window.innerWidth > 1024;
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function setQueryParam(param, value) {
  const url = new URL(window.location);
  url.searchParams.set(param, value);
  window.history.pushState({}, '', url);
}

function removeQueryParam(param) {
  const url = new URL(window.location);
  url.searchParams.delete(param);
  window.history.pushState({}, '', url);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

function downloadFile(content, filename, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function isValidPhone(phone) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return re.test(phone);
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

function sanitizeHtml(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#039;');
}

const storage = {
  set: function(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error('Error saving to localStorage:', err);
      return false;
    }
  },
  
  get: function(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.error('Error reading from localStorage:', err);
      return defaultValue;
    }
  },
  
  remove: function(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error('Error removing from localStorage:', err);
      return false;
    }
  },
  
  clear: function() {
    try {
      localStorage.clear();
      return true;
    } catch (err) {
      console.error('Error clearing localStorage:', err);
      return false;
    }
  }
};

const session = {
  set: function(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error('Error saving to sessionStorage:', err);
      return false;
    }
  },
  
  get: function(key, defaultValue = null) {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (err) {
      console.error('Error reading from sessionStorage:', err);
      return defaultValue;
    }
  },
  
  remove: function(key) {
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error('Error removing from sessionStorage:', err);
      return false;
    }
  },
  
  clear: function() {
    try {
      window.sessionStorage.clear();
      return true;
    } catch (err) {
      console.error('Error clearing sessionStorage:', err);
      return false;
    }
  }
};

const cookies = {
  set: function(name, value, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  },
  
  get: function(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  
  remove: function(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  }
};

function delegate(parent, selector, event, handler) {
  parent.addEventListener(event, function(e) {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  });
}

function waitForElement(selector, callback, timeout = 10000) {
  const startTime = Date.now();
  
  const check = () => {
    const element = document.querySelector(selector);
    if (element) {
      callback(element);
      return;
    }
    
    if (Date.now() - startTime >= timeout) {
      console.warn(`Element ${selector} not found within ${timeout}ms`);
      return;
    }
    
    requestAnimationFrame(check);
  };
  
  check();
}

function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.onload = callback;
  script.onerror = () => console.error(`Failed to load script: ${src}`);
  document.head.appendChild(script);
}

function loadStylesheet(href, callback) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.onload = callback;
  link.onerror = () => console.error(`Failed to load stylesheet: ${href}`);
  document.head.appendChild(link);
}

// ========================================
// ANIMACIONES
// ========================================
class ScrollAnimations {
  constructor(options = {}) {
    this.options = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px 0px -50px 0px',
      animationClass: options.animationClass || 'animate-in',
      hiddenClass: options.hiddenClass || 'animate-hidden'
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin
      }
    );
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(this.options.animationClass);
        entry.target.classList.remove(this.options.hiddenClass);
        this.observer.unobserve(entry.target);
      }
    });
  }

  observe(selector) {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add(this.options.hiddenClass);
      this.observer.observe(el);
    });
  }

  observeElement(element) {
    element.classList.add(this.options.hiddenClass);
    this.observer.observe(element);
  }

  disconnect() {
    this.observer.disconnect();
  }
}

class AnimatedCounter {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      duration: options.duration || 2000,
      startValue: options.startValue || 0,
      endValue: options.endValue || parseInt(element.textContent.replace(/[^0-9.-]+/g, '')),
      prefix: options.prefix || '',
      suffix: options.suffix || '',
      decimals: options.decimals || 0,
      separator: options.separator || ','
    };
    
    this.startTime = null;
    this.isAnimating = false;
  }

  animate() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.startTime = null;
    
    requestAnimationFrame(this.update.bind(this));
  }

  update(currentTime) {
    if (!this.startTime) this.startTime = currentTime;
    
    const elapsed = currentTime - this.startTime;
    const progress = Math.min(elapsed / this.options.duration, 1);
    
    const easeProgress = 1 - Math.pow(1 - progress, 4);
    
    const currentValue = this.options.startValue + 
      (this.options.endValue - this.options.startValue) * easeProgress;
    
    this.element.textContent = this.formatValue(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(this.update.bind(this));
    } else {
      this.isAnimating = false;
    }
  }

  formatValue(value) {
    const formatted = value.toFixed(this.options.decimals);
    const parts = formatted.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.options.separator);
    return this.options.prefix + parts.join('.') + this.options.suffix;
  }
}

class CountdownTimer {
  constructor(element, endDate, options = {}) {
    this.element = element;
    this.endDate = new Date(endDate).getTime();
    this.options = {
      onTick: options.onTick || null,
      onComplete: options.onComplete || null,
      format: options.format || 'd:h:m:s'
    };
    
    this.interval = null;
  }

  start() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.endDate - now;

    if (distance < 0) {
      this.stop();
      if (this.options.onComplete) {
        this.options.onComplete();
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const formatted = this.formatTime(days, hours, minutes, seconds);
    this.element.innerHTML = formatted;

    if (this.options.onTick) {
      this.options.onTick({ days, hours, minutes, seconds });
    }
  }

  formatTime(days, hours, minutes, seconds) {
    const format = this.options.format;
    let result = '';

    if (format.includes('d')) {
      result += `<span class="countdown-value">${days}</span><span class="countdown-label">d</span> `;
    }
    if (format.includes('h')) {
      result += `<span class="countdown-value">${hours}</span><span class="countdown-label">h</span> `;
    }
    if (format.includes('m')) {
      result += `<span class="countdown-value">${minutes}</span><span class="countdown-label">m</span> `;
    }
    if (format.includes('s')) {
      result += `<span class="countdown-value">${seconds}</span><span class="countdown-label">s</span>`;
    }

    return result;
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

class Typewriter {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      text: options.text || element.textContent,
      speed: options.speed || 50,
      delay: options.delay || 1000,
      cursor: options.cursor !== false,
      cursorChar: options.cursorChar || '|',
      loop: options.loop || false,
      deleteSpeed: options.deleteSpeed || 30
    };
    
    this.element.textContent = '';
    this.currentIndex = 0;
    this.isDeleting = false;
    this.timeout = null;
  }

  start() {
    this.type();
  }

  type() {
    const currentText = this.options.text;
    
    if (this.isDeleting) {
      this.element.textContent = currentText.substring(0, this.currentIndex - 1);
      this.currentIndex--;
    } else {
      this.element.textContent = currentText.substring(0, this.currentIndex + 1);
      this.currentIndex++;
    }

    let typeSpeed = this.options.speed;

    if (this.isDeleting) {
      typeSpeed = this.options.deleteSpeed;
    }

    if (!this.isDeleting && this.currentIndex === currentText.length) {
      typeSpeed = this.options.delay;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentIndex === 0) {
      if (this.options.loop) {
        this.isDeleting = false;
      } else {
        return;
      }
    }

    this.timeout = setTimeout(() => this.type(), typeSpeed);
  }

  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }
}

class Parallax {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      speed: options.speed || 0.5,
      direction: options.direction || 'vertical',
      offset: options.offset || 0
    };
    
    this.init();
  }

  init() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    const scrollY = window.pageYOffset;
    const offset = scrollY * this.options.speed + this.options.offset;

    if (this.options.direction === 'vertical') {
      this.element.style.transform = `translateY(${offset}px)`;
    } else if (this.options.direction === 'horizontal') {
      this.element.style.transform = `translateX(${offset}px)`;
    }
  }

  destroy() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
}

class FadeInScroll {
  constructor(selector, options = {}) {
    this.selector = selector;
    this.options = {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '0px',
      duration: options.duration || 600
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin
      }
    );
    
    this.init();
  }

  init() {
    document.querySelectorAll(this.selector).forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity ${this.options.duration}ms ease, transform ${this.options.duration}ms ease`;
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        this.observer.unobserve(entry.target);
      }
    });
  }

  destroy() {
    this.observer.disconnect();
  }
}

function initAnimations() {
  const scrollAnimations = new ScrollAnimations();
  scrollAnimations.observe('.ghl-animate-on-scroll');

  document.querySelectorAll('.ghl-animated-counter').forEach(el => {
    const counter = new AnimatedCounter(el);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counter.animate();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });

  document.querySelectorAll('.ghl-countdown').forEach(el => {
    const endDate = el.dataset.endDate;
    if (endDate) {
      const countdown = new CountdownTimer(el, endDate);
      countdown.start();
    }
  });

  document.querySelectorAll('.ghl-typewriter').forEach(el => {
    const typewriter = new Typewriter(el);
    typewriter.start();
  });

  const fadeInScroll = new FadeInScroll('.ghl-fade-in');
}

// ========================================
// FORMULARIOS
// ========================================
class FormValidator {
  constructor(formElement, options = {}) {
    this.form = formElement;
    this.rules = options.rules || {};
    this.options = {
      errorClass: options.errorClass || 'error',
      successClass: options.successClass || 'success',
      errorElement: options.errorElement || 'ghl-form-error-message',
      onValidate: options.onValidate || null,
      onSubmit: options.onSubmit || null
    };
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    this.form.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', () => this.clearError(field));
    });
  }

  addRule(fieldName, rule) {
    this.rules[fieldName] = rule;
  }

  validateField(field) {
    const rule = this.rules[field.name];
    if (!rule) return true;

    let isValid = true;
    let errorMessage = '';

    if (rule.required && !field.value.trim()) {
      isValid = false;
      errorMessage = rule.requiredMessage || 'Este campo es requerido';
    } else if (rule.email && !this.isValidEmail(field.value)) {
      isValid = false;
      errorMessage = rule.emailMessage || 'Por favor ingresa un email válido';
    } else if (rule.minLength && field.value.length < rule.minLength) {
      isValid = false;
      errorMessage = rule.minLengthMessage || `Mínimo ${rule.minLength} caracteres`;
    } else if (rule.maxLength && field.value.length > rule.maxLength) {
      isValid = false;
      errorMessage = rule.maxLengthMessage || `Máximo ${rule.maxLength} caracteres`;
    } else if (rule.pattern && !rule.pattern.test(field.value)) {
      isValid = false;
      errorMessage = rule.patternMessage || 'Formato inválido';
    } else if (rule.match && field.value !== document.querySelector(rule.match).value) {
      isValid = false;
      errorMessage = rule.matchMessage || 'Los campos no coinciden';
    } else if (rule.custom && !rule.custom(field.value)) {
      isValid = false;
      errorMessage = rule.customMessage || 'Valor inválido';
    }

    this.updateFieldStatus(field, isValid, errorMessage);
    
    if (this.options.onValidate) {
      this.options.onValidate(field, isValid, errorMessage);
    }
    
    return isValid;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  updateFieldStatus(field, isValid, errorMessage) {
    const formGroup = field.closest('.ghl-form-group');
    const errorElement = formGroup.querySelector(`.${this.options.errorElement}`);
    
    if (isValid) {
      field.classList.remove(this.options.errorClass);
      field.classList.add(this.options.successClass);
      formGroup.classList.remove('has-error');
      formGroup.classList.add('has-success');
      if (errorElement) errorElement.remove();
    } else {
      field.classList.remove(this.options.successClass);
      field.classList.add(this.options.errorClass);
      formGroup.classList.remove('has-success');
      formGroup.classList.add('has-error');
      
      if (!errorElement) {
        const newErrorElement = document.createElement('div');
        newErrorElement.className = this.options.errorElement;
        formGroup.appendChild(newErrorElement);
      }
      formGroup.querySelector(`.${this.options.errorElement}`).textContent = errorMessage;
    }
  }

  clearError(field) {
    const formGroup = field.closest('.ghl-form-group');
    field.classList.remove(this.options.errorClass);
    formGroup.classList.remove('has-error');
    const errorElement = formGroup.querySelector(`.${this.options.errorElement}`);
    if (errorElement) errorElement.remove();
  }

  handleSubmit(e) {
    e.preventDefault();
    let isFormValid = true;

    this.form.querySelectorAll('input, select, textarea').forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      if (this.options.onSubmit) {
        this.options.onSubmit(this.form);
      } else {
        this.form.submit();
      }
    }
  }

  reset() {
    this.form.reset();
    this.form.querySelectorAll('.error, .success').forEach(el => {
      el.classList.remove('error', 'success');
    });
    this.form.querySelectorAll('.has-error, .has-success').forEach(el => {
      el.classList.remove('has-error', 'has-success');
    });
    this.form.querySelectorAll(`.${this.options.errorElement}`).forEach(el => {
      el.remove();
    });
  }
}

function initAutoResizeTextareas() {
  document.querySelectorAll('textarea[data-auto-resize]').forEach(textarea => {
    const resize = () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    };
    
    textarea.addEventListener('input', resize);
    resize();
  });
}

function initPhoneMasks() {
  document.querySelectorAll('input[data-phone-mask]').forEach(input => {
    input.addEventListener('input', function(e) {
      let value = this.value.replace(/\D/g, '');
      if (value.length > 10) value = value.slice(0, 10);
      
      let formatted = '';
      if (value.length > 0) formatted = `(${value.slice(0, 3)}`;
      if (value.length > 3) formatted += `) ${value.slice(3, 6)}`;
      if (value.length > 6) formatted += `-${value.slice(6)}`;
      
      this.value = formatted;
    });
  });
}

function initDateMasks() {
  document.querySelectorAll('input[data-date-mask]').forEach(input => {
    input.addEventListener('input', function(e) {
      let value = this.value.replace(/\D/g, '');
      if (value.length > 8) value = value.slice(0, 8);
      
      let formatted = '';
      if (value.length > 0) formatted = value.slice(0, 2);
      if (value.length > 2) formatted += `/${value.slice(2, 4)}`;
      if (value.length > 4) formatted += `/${value.slice(4)}`;
      
      this.value = formatted;
    });
  });
}

function initPasswordToggles() {
  document.querySelectorAll('.ghl-password-toggle').forEach(button => {
    const input = button.previousElementSibling;
    
    button.addEventListener('click', function() {
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      
      const icon = this.querySelector('svg');
      if (icon) {
        icon.innerHTML = type === 'password' 
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />';
      }
    });
  });
}

function initCharacterCounters() {
  document.querySelectorAll('textarea[data-char-count]').forEach(textarea => {
    const maxLength = textarea.getAttribute('maxlength');
    const counter = document.createElement('div');
    counter.className = 'ghl-char-counter';
    counter.style.fontSize = '0.75rem';
    counter.style.color = 'var(--text-tertiary)';
    counter.style.textAlign = 'right';
    counter.style.marginTop = '0.25rem';
    textarea.parentNode.appendChild(counter);

    const updateCounter = () => {
      const currentLength = textarea.value.length;
      counter.textContent = `${currentLength}/${maxLength}`;
      
      if (currentLength >= maxLength * 0.9) {
        counter.style.color = 'var(--warning-color)';
      }
      if (currentLength >= maxLength) {
        counter.style.color = 'var(--error-color)';
      }
    };

    textarea.addEventListener('input', updateCounter);
    updateCounter();
  });
}

function initFormComponents() {
  initAutoResizeTextareas();
  initPhoneMasks();
  initDateMasks();
  initPasswordToggles();
  initCharacterCounters();
}

// ========================================
// COMPONENTES DE UI
// ========================================
class Toast {
  constructor(message, options = {}) {
    this.message = message;
    this.options = {
      type: options.type || 'success',
      duration: options.duration || 3000,
      position: options.position || 'top-right',
      showClose: options.showClose !== false
    };
    
    this.element = null;
    this.timeout = null;
  }

  show() {
    this.element = document.createElement('div');
    this.element.className = `ghl-toast ghl-toast-${this.options.type}`;
    this.element.innerHTML = `
      <div class="ghl-toast-content">
        <span class="ghl-toast-message">${this.message}</span>
        ${this.options.showClose ? '<button class="ghl-toast-close">&times;</button>' : ''}
      </div>
    `;
    
    this.element.style.cssText = `
      position: fixed;
      z-index: 9999;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      animation: slideIn 0.3s ease;
      max-width: 400px;
      ${this.getPositionStyles()}
    `;
    
    const colors = {
      success: 'background: #10b981; color: white;',
      error: 'background: #ef4444; color: white;',
      warning: 'background: #f59e0b; color: white;',
      info: 'background: #373ebe; color: white;'
    };
    this.element.style.cssText += colors[this.options.type];
    
    document.body.appendChild(this.element);
    
    const closeBtn = this.element.querySelector('.ghl-toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }
    
    if (this.options.duration > 0) {
      this.timeout = setTimeout(() => this.hide(), this.options.duration);
    }
  }

  getPositionStyles() {
    const positions = {
      'top-right': 'top: 1rem; right: 1rem;',
      'top-left': 'top: 1rem; left: 1rem;',
      'bottom-right': 'bottom: 1rem; right: 1rem;',
      'bottom-left': 'bottom: 1rem; left: 1rem;'
    };
    return positions[this.options.position];
  }

  hide() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    this.element.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    }, 300);
  }
}

class Modal {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      closeOnOverlay: options.closeOnOverlay !== false,
      closeOnEscape: options.closeOnEscape !== false,
      onOpen: options.onOpen || null,
      onClose: options.onClose || null
    };
    
    this.overlay = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'ghl-modal-overlay';
    this.overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 9998;
      animation: fadeIn 0.3s ease;
    `;
    
    this.element.style.cssText += `
      position: fixed;
      z-index: 9999;
      display: none;
      animation: scaleIn 0.3s ease;
    `;
    
    const closeButtons = this.element.querySelectorAll('[data-modal-close]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.close());
    });
    
    if (this.options.closeOnOverlay) {
      this.overlay.addEventListener('click', () => this.close());
    }
    
    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }
  }

  open() {
    document.body.appendChild(this.overlay);
    this.overlay.style.display = 'flex';
    this.element.style.display = 'block';
    document.body.style.overflow = 'hidden';
    this.isOpen = true;
    
    if (this.options.onOpen) {
      this.options.onOpen();
    }
  }

  close() {
    this.overlay.style.display = 'none';
    this.element.style.display = 'none';
    document.body.style.overflow = '';
    this.isOpen = false;
    
    if (this.options.onClose) {
      this.options.onClose();
    }
  }

  destroy() {
    this.close();
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }
}

function initAccordions() {
  document.querySelectorAll('.ghl-accordion').forEach(accordion => {
    const items = accordion.querySelectorAll('.ghl-accordion-item');
    
    items.forEach(item => {
      const header = item.querySelector('.ghl-accordion-header');
      const content = item.querySelector('.ghl-accordion-content');
      
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        
        items.forEach(i => {
          i.classList.remove('open');
          i.querySelector('.ghl-accordion-content').style.maxHeight = '0';
        });
        
        if (!isOpen) {
          item.classList.add('open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    });
  });
}

function initTabs() {
  document.querySelectorAll('.ghl-tabs').forEach(tabContainer => {
    const tabButtons = tabContainer.querySelectorAll('.ghl-tab-button');
    const tabContents = tabContainer.querySelectorAll('.ghl-tab-content');
    
    tabButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        tabContents[index].classList.add('active');
      });
    });
  });
}

// ========================================
// FUNCIONES PRINCIPALES
// ========================================
function detectDevice() {
  const width = window.innerWidth;
  GHLState.isMobile = width < GHLConfig.breakpoints.tablet;
  GHLState.isTablet = width >= GHLConfig.breakpoints.tablet && width < GHLConfig.breakpoints.desktop;
  GHLState.isDesktop = width >= GHLConfig.breakpoints.desktop;
  
  document.body.classList.toggle('is-mobile', GHLState.isMobile);
  document.body.classList.toggle('is-tablet', GHLState.isTablet);
  document.body.classList.toggle('is-desktop', GHLState.isDesktop);
}

function handleScroll() {
  const currentScrollY = window.pageYOffset;
  GHLState.scrollDirection = currentScrollY > GHLState.lastScrollY ? 'down' : 'up';
  GHLState.scrollY = currentScrollY;
  GHLState.lastScrollY = currentScrollY;
  
  document.body.classList.toggle('scrolled', currentScrollY > 50);
  document.body.classList.toggle('scrolling-down', GHLState.scrollDirection === 'down');
  document.body.classList.toggle('scrolling-up', GHLState.scrollDirection === 'up');
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  } else {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

function initStickyHeader() {
  const header = document.querySelector('.ghl-header');
  if (!header) return;
  
  let lastScroll = 0;
  const scrollThreshold = 100;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > scrollThreshold) {
      header.classList.add('ghl-header-sticky');
    } else {
      header.classList.remove('ghl-header-sticky');
    }
    
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
      header.classList.add('ghl-header-hidden');
    } else {
      header.classList.remove('ghl-header-hidden');
    }
    
    lastScroll = currentScroll;
  });
}

function initMobileMenu() {
  const toggleButton = document.querySelector('.ghl-mobile-menu-toggle');
  const mobileMenu = document.querySelector('.ghl-mobile-menu');
  
  if (!toggleButton || !mobileMenu) return;
  
  toggleButton.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    toggleButton.classList.toggle('active');
    document.body.classList.toggle('menu-open', !isOpen);
  });
  
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggleButton.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !toggleButton.contains(e.target)) {
      mobileMenu.classList.remove('open');
      toggleButton.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

function initAll() {
  detectDevice();
  window.addEventListener('resize', debounce(detectDevice, 250));
  
  window.addEventListener('scroll', throttle(handleScroll, 100));
  
  initSmoothScroll();
  initLazyLoading();
  initStickyHeader();
  initMobileMenu();
  initAccordions();
  initTabs();
  
  initAnimations();
  initFormComponents();
  
  console.log('Go High Level Customization initialized successfully!');
}

// ========================================
// EXPORTACIONES GLOBALES
// ========================================
window.GHL = {
  config: GHLConfig,
  state: GHLState,
  Toast,
  Modal,
  FormValidator,
  AnimatedCounter,
  CountdownTimer,
  Typewriter,
  ScrollAnimations,
  init: initAll
};

// ========================================
// ANIMACIONES CSS
// ========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// ========================================
// INICIALIZACIÓN
// ========================================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
