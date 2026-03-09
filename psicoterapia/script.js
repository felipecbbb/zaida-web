// ===========================
// Detectar dispositivo táctil
// ===========================
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// ===========================
// Menú móvil
// ===========================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ===========================
// Navbar scroll effect
// ===========================
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ===========================
// Scroll Reveal Animations
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
});

// También animar elementos legacy (subpáginas sin clases reveal)
const legacyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll(
    '.service-card:not(.reveal), .testimonial-card, .testimonial-full:not(.reveal), .when-card:not(.reveal), .about-main:not(.reveal-left), .method-card, .safe-space:not(.reveal-scale), .objective:not(.reveal), .service-detail:not(.reveal), .benefit-card:not(.reveal), .step:not(.reveal), .specialty-card:not(.reveal)'
).forEach(el => {
    if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') &&
        !el.classList.contains('reveal-right') && !el.classList.contains('reveal-scale')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        legacyObserver.observe(el);
    }
});

// ===========================
// Counter Animation
// ===========================
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.dataset.target);
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 40);
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// ===========================
// Hero Sparkles (reducidos en móvil)
// ===========================
function createSparkles() {
    const container = document.getElementById('heroSparkles');
    if (!container) return;

    const count = isTouchDevice ? 10 : 20;
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 3 + 's';
        sparkle.style.animationDuration = (2 + Math.random() * 2) + 's';
        sparkle.style.width = (2 + Math.random() * 4) + 'px';
        sparkle.style.height = sparkle.style.width;
        container.appendChild(sparkle);
    }
}
createSparkles();

// ===========================
// Parallax suave para hero card (solo desktop)
// ===========================
if (!isTouchDevice) {
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroCard.style.transform = `translateY(${scrolled * 0.06}px)`;
            }
        }, { passive: true });
    }
}

// ===========================
// Formulario de contacto
// ===========================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '¡Mensaje enviado!';
        btn.style.background = 'linear-gradient(135deg, #7A5E85, #B07878)';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 3000);
    });
}

// ===========================
// Tilt effect en tarjetas (solo desktop, no touch)
// ===========================
if (!isTouchDevice) {
    document.querySelectorAll('.service-card, .benefit-card, .when-card, .specialty-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===========================
// Cursor glow en CTA boxes (solo desktop)
// ===========================
if (!isTouchDevice) {
    document.querySelectorAll('.cta-box, .online-banner').forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            box.style.setProperty('--glow-x', x + 'px');
            box.style.setProperty('--glow-y', y + 'px');
            box.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, rgba(255,255,255,0.1), transparent), ${getComputedStyle(box).backgroundImage}`;
        });

        box.addEventListener('mouseleave', () => {
            box.style.background = '';
        });
    });
}
