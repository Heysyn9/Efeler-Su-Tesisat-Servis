// ===================================
// Efeler Su Arıtma - Interactive JavaScript
// Modern animations and smooth interactions
// ===================================

// ===== Utility Functions =====
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// ===== Navigation Functionality =====
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileToggle = document.getElementById('mobileMenuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        // Scroll event for navbar background
        window.addEventListener('scroll', debounce(() => this.handleScroll(), 10));

        // Mobile menu toggle
        this.mobileToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e);
                this.closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu?.contains(e.target) && !this.mobileToggle?.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Set active link on scroll
        window.addEventListener('scroll', debounce(() => this.setActiveLink(), 50));
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar?.classList.add('scrolled');
        } else {
            this.navbar?.classList.remove('scrolled');
        }
    }

    toggleMobileMenu() {
        this.navMenu?.classList.toggle('active');
        this.mobileToggle?.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navMenu?.classList.remove('active');
        this.mobileToggle?.classList.remove('active');
    }

    handleNavClick(e) {
        const href = e.target.getAttribute('href');

        if (href?.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = this.navbar?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===== Scroll Animations =====
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        this.init();
    }

    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        // Observe all animated elements
        const animatedElements = document.querySelectorAll(
            '.about-item, .service-card, .why-card'
        );

        animatedElements.forEach(el => this.observer.observe(el));
    }

    handleIntersection(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);

                // Stop observing once animated
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// ===== Back to Top Button =====
class BackToTop {
    constructor() {
        this.button = document.getElementById('backToTop');
        this.init();
    }

    init() {
        if (!this.button) return;

        // Show/hide on scroll
        window.addEventListener('scroll', debounce(() => this.handleScroll(), 10));

        // Click handler
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    handleScroll() {
        if (window.scrollY > 500) {
            this.button?.classList.add('visible');
        } else {
            this.button?.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ===== Service Cards Interaction =====
class ServiceCards {
    constructor() {
        this.cards = document.querySelectorAll('.service-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', () => this.handleHover(card));

            // Add click handler for mobile
            card.addEventListener('click', () => this.handleClick(card));
        });
    }

    handleHover(card) {
        // Add subtle scale animation
        card.style.transition = 'all 0.3s ease';
    }

    handleClick(card) {
        // On mobile, toggle expanded state
        if (window.innerWidth <= 768) {
            card.classList.toggle('expanded');
        }
    }
}

// ===== Lazy Loading Images =====
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');
        this.init();
    }

    init() {
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            return;
        }

        // Fallback for browsers that don't support lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        this.images.forEach(img => imageObserver.observe(img));
    }
}

// ===== Smooth Scroll Polyfill =====
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                if (href === '#' || href === '') return;

                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== Performance Monitoring =====
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Log page load performance
        window.addEventListener('load', () => {
            if (window.performance && window.performance.timing) {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

                console.log(`🚀 Page loaded in ${pageLoadTime}ms`);
            }
        });
    }
}

// ===== Hero Parallax Effect =====
class HeroParallax {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.heroImage = document.querySelector('.hero-image');
        this.init();
    }

    init() {
        if (!this.hero || !this.heroImage) return;

        window.addEventListener('scroll', debounce(() => this.handleScroll(), 5));
    }

    handleScroll() {
        const scrolled = window.scrollY;
        const heroHeight = this.hero?.offsetHeight || 0;

        if (scrolled <= heroHeight) {
            // Parallax effect
            const parallaxSpeed = 0.5;
            this.heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    }
}

// ===== Contact Form Animation =====
class ContactAnimations {
    constructor() {
        this.contactCards = document.querySelectorAll('.contact-card');
        this.init();
    }

    init() {
        this.contactCards.forEach((card, index) => {
            // Stagger animation on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 150);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';

            observer.observe(card);
        });
    }
}

// ===== Why Choose Us Icon Animations =====
class WhyChooseAnimations {
    constructor() {
        this.whyCards = document.querySelectorAll('.why-card');
        this.init();
    }

    init() {
        this.whyCards.forEach(card => {
            const icon = card.querySelector('.why-icon');

            card.addEventListener('mouseenter', () => {
                if (icon) {
                    icon.style.transform = 'rotateY(360deg) scale(1.1)';
                }
            });

            card.addEventListener('mouseleave', () => {
                if (icon) {
                    icon.style.transform = 'rotateY(0deg) scale(1)';
                }
            });
        });
    }
}

// ===== Cursor Effect (Optional Enhancement) =====
class CursorEffect {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.init();
    }

    init() {
        // Only on desktop
        if (window.innerWidth < 768) return;

        // Create cursor elements
        this.createCursor();

        // Track mouse movement
        document.addEventListener('mousemove', (e) => this.moveCursor(e));

        // Add hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .why-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.expandCursor());
            el.addEventListener('mouseleave', () => this.shrinkCursor());
        });
    }

    createCursor() {
        // Custom cursor implementation (optional)
        // Can be enabled for enhanced user experience
    }

    moveCursor(e) {
        if (this.cursor) {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        }
    }

    expandCursor() {
        if (this.cursor) {
            this.cursor.style.transform = 'scale(1.5)';
        }
    }

    shrinkCursor() {
        if (this.cursor) {
            this.cursor.style.transform = 'scale(1)';
        }
    }
}

// ===== Loading Animation =====
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        // Add loaded class to body when page is fully loaded
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');

            // Trigger initial animations
            this.triggerInitialAnimations();
        });
    }

    triggerInitialAnimations() {
        // Animate hero elements
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons, .hero-features');

        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// ===== Accessibility Enhancements =====
class AccessibilityEnhancements {
    constructor() {
        this.init();
    }

    init() {
        // Add keyboard navigation support
        this.addKeyboardNavigation();

        // Add focus visible styles
        this.addFocusStyles();

        // Add skip to content link
        this.addSkipLink();
    }

    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC to close mobile menu
            if (e.key === 'Escape') {
                const navMenu = document.getElementById('navMenu');
                navMenu?.classList.remove('active');
            }
        });
    }

    addFocusStyles() {
        // Add focus-visible class for better keyboard navigation
        document.body.addEventListener('mousedown', () => {
            document.body.classList.add('using-mouse');
        });

        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        });
    }

    addSkipLink() {
        // Skip to main content for screen readers
        const skipLink = document.createElement('a');
        skipLink.href = '#hizmetler';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Ana içeriğe atla';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary-cyan);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// ===== Floating Bubble Navigation =====
class FloatingBubbleNav {
    constructor() {
        this.bubbles = document.querySelectorAll('.nav-bubble');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        if (!this.bubbles.length) return;

        // Smooth scroll on bubble click
        this.bubbles.forEach(bubble => {
            bubble.addEventListener('click', (e) => this.handleBubbleClick(e));
        });

        // Update active bubble on scroll
        window.addEventListener('scroll', debounce(() => this.updateActiveBubble(), 50));

        // Set initial active state
        this.updateActiveBubble();
    }

    handleBubbleClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('data-section');
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    updateActiveBubble() {
        const scrollPosition = window.scrollY + 200;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all bubbles
                this.bubbles.forEach(bubble => bubble.classList.remove('active'));

                // Add active class to current section's bubble
                const activeBubble = document.querySelector(`.nav-bubble[data-section="${sectionId}"]`);
                if (activeBubble) {
                    activeBubble.classList.add('active');
                }
            }
        });
    }
}

// ===== Initialize All Components =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌊 Efeler Su Arıtma - Website Initialized');

    // Initialize all components
    new Navigation();
    new ScrollAnimations();
    new BackToTop();
    new ServiceCards();
    new LazyLoader();
    new SmoothScroll();
    new PerformanceMonitor();
    new HeroParallax();
    new ContactAnimations();
    new WhyChooseAnimations();
    new LoadingAnimation();
    new AccessibilityEnhancements();
    new FloatingBubbleNav();

    // Optional: Initialize cursor effect
    // new CursorEffect();

    console.log('✅ All components loaded successfully');
});

// ===== Promotional Video Controller =====
class PromoVideoController {
    constructor() {
        this.video = document.getElementById('promoVideo');
        this.init();
    }

    init() {
        if (!this.video) return;

        // Create Intersection Observer for auto-play/pause
        const observerOptions = {
            threshold: 0.5, // Video must be 50% visible
            rootMargin: '0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video is in view - play it
                    this.video.play().catch(err => {
                        console.log('Auto-play prevented:', err);
                    });
                } else {
                    // Video is out of view - pause it
                    this.video.pause();
                }
            });
        }, observerOptions);

        // Start observing the video
        this.observer.observe(this.video);

        // Handle user interaction
        this.video.addEventListener('click', () => {
            if (this.video.paused) {
                this.video.play();
            } else {
                this.video.pause();
            }
        });
    }
}

// Initialize video controller after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PromoVideoController();
    });
} else {
    new PromoVideoController();
}


// ===== Service Worker Registration (Optional for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA features
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed'));
    });
}

// ===== Analytics (Optional) =====
class Analytics {
    constructor() {
        this.init();
    }

    init() {
        // Track page views
        this.trackPageView();

        // Track button clicks
        this.trackButtonClicks();

        // Track service card interactions
        this.trackServiceInteractions();
    }

    trackPageView() {
        console.log('📊 Page view tracked');
    }

    trackButtonClicks() {
        const buttons = document.querySelectorAll('.btn, .nav-cta');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = e.target.textContent.trim();
                console.log(`🔘 Button clicked: ${buttonText}`);
            });
        });
    }

    trackServiceInteractions() {
        const serviceCards = document.querySelectorAll('.service-card');

        serviceCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const serviceName = card.querySelector('.service-title')?.textContent;
                console.log(`🛠️ Service viewed: ${serviceName}`);
            });
        });
    }
}

// Initialize analytics
new Analytics();

// ===== Console Branding =====
console.log('%c🌊 Efeler Su Arıtma', 'color: #00BCD4; font-size: 24px; font-weight: bold;');
console.log('%c🌿 Çevre Dostu Çözümler', 'color: #4CAF50; font-size: 16px;');
console.log('%cWebsite by Professional Web Development', 'color: #757575; font-size: 12px;');
