// ============================================================================
// Hox Infotech - Interactive JavaScript with Animations and WhatsApp Integration
// ============================================================================

document.addEventListener('DOMContentLoaded', function () {
    // ========================================================================
    // Navigation and Header Functionality
    // ========================================================================

    const header = document.querySelector('.header');
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        }
    });

    // Smooth scrolling and active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu
                hamburger.classList.remove('active');
                navbar.classList.remove('active');

                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // ========================================================================
    // Scroll Animations
    // ========================================================================

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Animate cards with stagger effect
                const cards = entry.target.querySelectorAll('.course-card, .project-card, .service-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Active link tracking on scroll
    function updateActiveLink() {
        const scrollPosition = window.scrollY + header.offsetHeight + 50;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ========================================================================
    // Hero Section Animations
    // ========================================================================

    // Animate hero text elements
    const heroElements = document.querySelectorAll('.hero-text .animate-fade-in-up');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });

    // ========================================================================
    // Live Sessions Date Update
    // ========================================================================

    function updateLiveDates() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const formattedDate = tomorrow.toLocaleDateString('en-US', options);

        const liveDates = document.querySelectorAll('.live-date');
        liveDates.forEach(dateElement => {
            const text = dateElement.textContent;
            if (text.includes('Tomorrow')) {
                dateElement.textContent = text.replace('Tomorrow', formattedDate);
            }
        });
    }

    updateLiveDates();

    // ========================================================================
    // WhatsApp Integration
    // ========================================================================

    const whatsappButton = document.getElementById('whatsappButton');
    const whatsappModal = document.getElementById('whatsappModal');
    const modalClose = document.getElementById('modalClose');
    const quickMessages = document.querySelectorAll('.quick-message');
    const startChatButton = document.querySelector('.start-chat-button');

    const whatsappNumber = '919995550353';

    // Open WhatsApp modal
    whatsappButton.addEventListener('click', function () {
        whatsappModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close WhatsApp modal
    function closeModal() {
        whatsappModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside
    whatsappModal.addEventListener('click', function (e) {
        if (e.target === whatsappModal) {
            closeModal();
        }
    });

    // Handle quick messages
    quickMessages.forEach(button => {
        button.addEventListener('click', function () {
            const message = this.getAttribute('data-message');
            sendWhatsAppMessage(message);
        });
    });

    // Handle start chat button
    startChatButton.addEventListener('click', function () {
        const message = this.getAttribute('data-message');
        sendWhatsAppMessage(message);
    });

    // Send WhatsApp message function
    function sendWhatsAppMessage(message) {
        const
            encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
        closeModal();
    }

    // ========================================================================
    // Interactive Elements and Micro-animations
    // ========================================================================

    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .live-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Card tilt effect on mouse move (for desktop)
    const cards = document.querySelectorAll('.course-card, .project-card, .service-card');

    if (window.innerWidth > 768) {
        cards.forEach(card => {
            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // ========================================================================
    // Performance Optimizations
    // ========================================================================

    // Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Throttled scroll handler
    const throttledScrollHandler = throttle(function () {
        updateActiveLink();
    }, 100);

    window.addEventListener('scroll', throttledScrollHandler);

    // ========================================================================
    // Accessibility Enhancements
    // ========================================================================

    // Keyboard navigation for modal
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && whatsappModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Focus management for modal
    whatsappModal.addEventListener('transitionend', function () {
        if (this.classList.contains('active')) {
            const firstFocusable = this.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
        }
    });

    // ========================================================================
    // Loading Animations
    // ========================================================================

    // Fade in page content after load
    window.addEventListener('load', function () {
        document.body.style.opacity = '1';

        // Trigger hero animations
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.classList.add('animate-in');
        }
    });

    // ========================================================================
    // Additional Interactive Features
    // ========================================================================

    // Smooth scroll to top functionality (optional)
    let scrollTopButton = document.querySelector('.scroll-top');
    if (!scrollTopButton) {
        scrollTopButton = document.createElement('button');
        scrollTopButton.className = 'scroll-top';
        scrollTopButton.innerHTML = '↑';
        scrollTopButton.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        `;
        document.body.appendChild(scrollTopButton);
    }

    // Show/hide scroll to top button
    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.visibility = 'visible';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================================================
    // Error Handling and Fallbacks
    // ========================================================================

    // Handle image loading errors
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function () {
            this.style.opacity = '0.5';
            this.alt = 'Image not available';
        });
    });

    // Console welcome message
    console.log(`
    🚀 Welcome to Hox Infotech!
    
    Interested in learning more about web development?
    Contact us at info@hoxinfotech.com or +91 9995550353
    
    This website is built with modern web technologies:
    - Vanilla JavaScript for interactivity
    - CSS3 with animations and transitions
    - Responsive design for all devices
    - WhatsApp integration for easy contact
    `);
});

// ============================================================================
// Service Worker Registration (Progressive Web App features)
// ============================================================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function (registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}