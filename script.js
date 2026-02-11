// =============================================
// PORTFOLIO - PREMIUM JAVASCRIPT
// Dark Luxury Experience with Motion-Heavy Interactions
// =============================================

'use strict';

// =============================================
// GLOBAL VARIABLES
// =============================================
let customCursor = null;
let cursorFollower = null;
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let isHovering = false;

// Linear Interpolation for smooth animations
const lerp = (start, end, factor) => start + (end - start) * factor;

// =============================================
// DOM CONTENT LOADED - INITIALIZE EVERYTHING
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    // Custom cursor disabled for better click interaction
    // initCustomCursor();
    initParticleCanvas();
    typingEffect();
    setupSmoothScrolling();
    handleNavbarScroll();
    highlightActiveSection();
    setupMobileMenu();
    setupScrollReveal();
    animateSkillBars();
    setupBackToTop();
    setupScrollDown();
    setupContactForm();
    enhanceBackgroundAnimation();
    setupProjectCardTilt();
    setupMagneticButtons();
    setupHollowTextFill();
    
    console.log('Portfolio initialized successfully!');
});

// =============================================
// CUSTOM DUAL-ELEMENT CURSOR WITH SPRING PHYSICS
// =============================================
function initCustomCursor() {
    // Check if device supports mouse (skip on touch devices)
    if (window.matchMedia('(pointer: coarse)').matches) {
        return; // Exit on mobile/touch devices
    }
    
    // Create cursor dot (inner)
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');
    cursorDot.style.left = '50%';
    cursorDot.style.top = '50%';
    document.body.appendChild(cursorDot);
    
    // Create cursor ring (outer/follower)
    const cursorRing = document.createElement('div');
    cursorRing.classList.add('custom-cursor-ring');
    cursorRing.style.left = '50%';
    cursorRing.style.top = '50%';
    document.body.appendChild(cursorRing);
    
    // Mouse position tracking - initialize to center
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop for both cursors
    function animateCursors() {
        // Update dot position immediately (no lag)
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        // Spring/Lag animation for ring using lerp
        // Lerp formula: current + (target - current) * factor
        ringX = ringX + (mouseX - ringX) * 0.15;
        ringY = ringY + (mouseY - ringY) * 0.15;
        
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        
        requestAnimationFrame(animateCursors);
    }
    
    // Start animation
    animateCursors();
    
    // Hover effects for ALL interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .btn, input, textarea, select, ' +
        '[role="button"], [role="link"], ' +
        '.project-card, .social-link, .hamburger, ' +
        '.nav-link, .back-to-top, .tag'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorRing.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorRing.classList.remove('hover');
        });
    });
    
    // Click animation
    document.addEventListener('mousedown', () => {
        cursorRing.classList.add('click');
        if (!cursorDot.classList.contains('hover')) {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
    });
    
    document.addEventListener('mouseup', () => {
        setTimeout(() => {
            cursorRing.classList.remove('click');
        }, 300);
        if (!cursorDot.classList.contains('hover')) {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
    
    // Hide cursors when mouse leaves viewport
    document.addEventListener('mouseleave', () => {
        cursorDot.classList.add('hidden');
        cursorRing.classList.add('hidden');
    });
    
    // Show cursors when mouse enters viewport
    document.addEventListener('mouseenter', () => {
        cursorDot.classList.remove('hidden');
        cursorRing.classList.remove('hidden');
    });
}

// =============================================
// PARTICLE CANVAS BACKGROUND
// =============================================
function initParticleCanvas() {
    const background = document.querySelector('.animated-background');
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    background.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Create floating color blobs
    const blob1 = document.createElement('div');
    blob1.className = 'color-blob blob-1';
    background.appendChild(blob1);
    
    const blob2 = document.createElement('div');
    blob2.className = 'color-blob blob-2';
    background.appendChild(blob2);
    
    const blob3 = document.createElement('div');
    blob3.className = 'color-blob blob-3';
    background.appendChild(blob3);
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles = [];
    const particleCount = 80;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Connect nearby particles with lines
    function connectParticles() {
        const maxDistance = 150;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.2;
                    ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Mouse interaction
    let mouseParticles = [];
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Repel particles near mouse
        particles.forEach(particle => {
            const dx = particle.x - mouseX;
            const dy = particle.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x += dx * force * 0.05;
                particle.y += dy * force * 0.05;
            }
        });
        
        // Create temporary particles at mouse position
        if (mouseParticles.length < 5) {
            mouseParticles.push({
                x: mouseX,
                y: mouseY,
                size: Math.random() * 3 + 2,
                opacity: 0.8,
                life: 1
            });
        }
    });
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Connect particles
        connectParticles();
        
        // Update mouse particles
        mouseParticles = mouseParticles.filter(p => {
            p.life -= 0.02;
            p.y -= 1;
            
            if (p.life > 0) {
                ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity * p.life})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                return true;
            }
            return false;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// =============================================
// HOLLOW TEXT FILL ON SCROLL
// =============================================
function setupHollowTextFill() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            
            // Fill text as user scrolls down
            if (scrollPosition > heroHeight * 0.2) {
                heroTitle.classList.add('filled');
            } else {
                heroTitle.classList.remove('filled');
            }
        });
    }
}

// =============================================
// TYPING EFFECT FOR HERO TITLE
// =============================================
function typingEffect() {
    const typedTextElement = document.getElementById('typedText');
    
    if (!typedTextElement) return;
    
    const textToType = 'Faisal Ahmed';
    let charIndex = 0;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseDuration = 2000;
    
    function type() {
        if (charIndex < textToType.length) {
            typedTextElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(deleteText, pauseDuration);
        }
    }
    
    function deleteText() {
        if (charIndex > 0) {
            typedTextElement.textContent = textToType.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(deleteText, deletingSpeed);
        } else {
            setTimeout(type, 500);
        }
    }
    
    // Start typing
    setTimeout(type, 1000);
}

// =============================================
// SMOOTH SCROLLING NAVIGATION
// =============================================
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('navMenu');
                const hamburger = document.getElementById('hamburger');
                
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
}

// =============================================
// NAVBAR SCROLL EFFECTS
// =============================================
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// =============================================
// HIGHLIGHT ACTIVE SECTION IN NAVIGATION
// =============================================
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// =============================================
// MOBILE BURGER MENU
// =============================================
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// =============================================
// SCROLL REVEAL ANIMATIONS WITH STAGGER
// =============================================
function setupScrollReveal() {
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// =============================================
// ANIMATED SKILL PROGRESS BARS
// =============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        root: null,
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-progress');
                
                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// =============================================
// BACK TO TOP BUTTON
// =============================================
function setupBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// =============================================
// SCROLL DOWN INDICATORS
// =============================================
function setupScrollDown() {
    const scrollDownElements = document.querySelectorAll('.scroll-down');
    
    scrollDownElements.forEach(element => {
        element.addEventListener('click', () => {
            const nextSection = element.getAttribute('data-next');
            if (nextSection) {
                const targetSection = document.getElementById(nextSection);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// =============================================
// SCROLL DOWN INDICATORS
// =============================================
function setupScrollDown() {
    const scrollDownElements = document.querySelectorAll('.scroll-down');
    
    scrollDownElements.forEach(element => {
        element.addEventListener('click', () => {
            const nextSection = element.getAttribute('data-next');
            if (nextSection) {
                const targetSection = document.getElementById(nextSection);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// =============================================
// CONTACT FORM HANDLING
// =============================================
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }
            
            // Form will submit naturally to FormSubmit
            // Show sending message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
        });
    }
}

// =============================================
// ENHANCED BACKGROUND WITH LERP SMOOTHING
// =============================================
function enhanceBackgroundAnimation() {
    let backgroundX = 0;
    let backgroundY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const background = document.querySelector('.animated-background');
    
    if (background) {
        document.addEventListener('mousemove', (e) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 30;
            targetY = (e.clientY / window.innerHeight - 0.5) * 30;
        });
        
        function animateBackground() {
            backgroundX = lerp(backgroundX, targetX, 0.05);
            backgroundY = lerp(backgroundY, targetY, 0.05);
            
            const blobs = document.querySelectorAll('.color-blob');
            blobs.forEach((blob, index) => {
                const multiplier = (index + 1) * 0.5;
                blob.style.transform = `translate(${backgroundX * multiplier}px, ${backgroundY * multiplier}px)`;
            });
            
            requestAnimationFrame(animateBackground);
        }
        
        animateBackground();
    }
}

// =============================================
// 3D CARD TILT EFFECT ON PROJECT CARDS
// =============================================
function setupProjectCardTilt() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Reduced rotation for subtler effect (changed from /10 to /25)
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            
            // Update radial gradient position
            const mouseXPercent = (x / rect.width) * 100;
            const mouseYPercent = (y / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${mouseXPercent}%`);
            card.style.setProperty('--mouse-y', `${mouseYPercent}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// =============================================
// MAGNETIC BUTTON EFFECT
// =============================================
function setupMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 80;
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = x * strength * 0.3;
                const moveY = y * strength * 0.3;
                
                button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// =============================================
// PERFORMANCE OPTIMIZATION
// =============================================
// Debounce function for resize events
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

// Optimized resize handler
const handleResize = debounce(() => {
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// =============================================
// CONSOLE ART
// =============================================
console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #8B5CF6; font-size: 20px; font-weight: bold;');
console.log('%cDark Luxury Experience | Motion-Heavy Interactions', 'color: #06B6D4; font-size: 14px;');
console.log('%cFeatures: Particle Canvas, Custom Cursor, 3D Tilt, Glassmorphism 2.0', 'color: #a1a1aa; font-size: 12px;');
