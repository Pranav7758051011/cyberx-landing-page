/* =====================================================
   CYBERX — script.js
   Table of Contents:
   1. Loader
   2. Cursor Glow + Hero Parallax
   3. Scroll Progress Bar
   4. Navbar (sticky, active link, hamburger)
   5. Scroll Reveal Animations
   6. Statistics Counter
   7. Timeline Progress Line
   8. Gallery (no extra JS needed — pure CSS hover)
   9. Testimonials Slider
   10. FAQ Accordion
   11. Contact Form
   12. Back To Top
   13. Button Ripple Effect
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ============================= */
    /* 1. LOADER                     */
    /* ============================= */
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 500);
    });
    // Fallback in case 'load' already fired or takes too long
    setTimeout(() => loader && loader.classList.add('hidden'), 2500);


    /* ============================= */
    /* 2. CURSOR GLOW + HERO PARALLAX */
    /* ============================= */
    const cursorGlow = document.getElementById('cursorGlow');
    const heroVisual = document.querySelector('.hero-visual');
    const isTouchDevice = window.matchMedia('(hover: none)').matches;

    if (!isTouchDevice) {
        window.addEventListener('mousemove', (e) => {
            if (cursorGlow) {
                cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }

            // Subtle parallax for hero visual elements
            if (heroVisual) {
                const rect = heroVisual.getBoundingClientRect();
                const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
                const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;

                const core = document.getElementById('neuralCore');
                if (core) {
                    core.style.transform = `translate(${relX * 12}px, ${relY * 12}px)`;
                }

                document.querySelectorAll('.tech-card').forEach((card, i) => {
                    const depth = (i + 1) * 6;
                    card.style.marginLeft = `${relX * depth}px`;
                    card.style.marginTop = `${relY * depth}px`;
                });
            }
        });
    }


    /* ============================= */
    /* 3. SCROLL PROGRESS BAR         */
    /* ============================= */
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgress) scrollProgress.style.width = `${progress}%`;
    }


    /* ============================= */
    /* 4. NAVBAR                      */
    /* ============================= */
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');
    const sections = document.querySelectorAll('section[id]');

    function updateNavbarState() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    function updateActiveLink() {
        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 140;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle('active', link.dataset.section === current);
        });
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinksContainer.classList.toggle('mobile-open');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('mobile-open');
            document.body.classList.remove('no-scroll');
        });
    });


    /* ============================= */
    /* 5. SCROLL REVEAL ANIMATIONS    */
    /* ============================= */
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((el) => revealObserver.observe(el));


    /* ============================= */
    /* 6. STATISTICS COUNTER          */
    /* ============================= */
    const counters = document.querySelectorAll('.counter');

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const startTime = performance.now();

        function tick(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);
            el.textContent = value.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = target.toLocaleString();
            }
        }
        requestAnimationFrame(tick);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach((counter) => counterObserver.observe(counter));


    /* ============================= */
    /* 7. TIMELINE PROGRESS LINE      */
    /* ============================= */
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineProgress = document.querySelector('.timeline-progress');

    function updateTimelineProgress() {
        if (!timelineContainer || !timelineProgress) return;
        const rect = timelineContainer.getBoundingClientRect();
        const viewportH = window.innerHeight;

        const total = rect.height;
        const visible = Math.min(Math.max(viewportH - rect.top, 0), total);
        const percent = total > 0 ? (visible / total) * 100 : 0;

        timelineProgress.style.height = `${Math.min(percent, 100)}%`;
    }


    /* ============================= */
    /* 9. TESTIMONIALS SLIDER         */
    /* ============================= */
    const testiCards = document.querySelectorAll('.testi-card');
    const testiDotsContainer = document.getElementById('testiDots');
    const testiPrev = document.getElementById('testiPrev');
    const testiNext = document.getElementById('testiNext');
    let testiIndex = 0;
    let testiAutoTimer;

    // Build dots dynamically
    testiCards.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTesti(i));
        testiDotsContainer.appendChild(dot);
    });
    const testiDots = testiDotsContainer.querySelectorAll('span');

    function goToTesti(index) {
        testiCards[testiIndex].classList.remove('active');
        testiDots[testiIndex].classList.remove('active');
        testiIndex = (index + testiCards.length) % testiCards.length;
        testiCards[testiIndex].classList.add('active');
        testiDots[testiIndex].classList.add('active');
        restartAutoSlide();
    }

    function restartAutoSlide() {
        clearInterval(testiAutoTimer);
        testiAutoTimer = setInterval(() => goToTesti(testiIndex + 1), 6000);
    }

    if (testiNext) testiNext.addEventListener('click', () => goToTesti(testiIndex + 1));
    if (testiPrev) testiPrev.addEventListener('click', () => goToTesti(testiIndex - 1));
    restartAutoSlide();


    /* ============================= */
    /* 10. FAQ ACCORDION              */
    /* ============================= */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach((el) => el.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });


    /* ============================= */
    /* 11. CONTACT FORM               */
    /* ============================= */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = 'Transmitting message through the grid...';

            setTimeout(() => {
                formStatus.textContent = 'Message sent successfully. CyberX will respond shortly.';
                contactForm.reset();
                setTimeout(() => { formStatus.textContent = ''; }, 4000);
            }, 1200);
        });
    }


    /* ============================= */
    /* 12. BACK TO TOP                */
    /* ============================= */
    const backToTop = document.getElementById('backToTop');

    function updateBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    /* ============================= */
    /* 13. BUTTON RIPPLE EFFECT       */
    /* ============================= */
    document.querySelectorAll('.ripple').forEach((btn) => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const circle = document.createElement('span');
            const size = Math.max(rect.width, rect.height);

            circle.classList.add('ripple-circle');
            circle.style.width = circle.style.height = `${size}px`;
            circle.style.left = `${e.clientX - rect.left - size / 2}px`;
            circle.style.top = `${e.clientY - rect.top - size / 2}px`;

            this.appendChild(circle);
            setTimeout(() => circle.remove(), 650);
        });
    });


    /* ============================= */
    /* MASTER SCROLL LISTENER         */
    /* ============================= */
    function onScroll() {
        updateScrollProgress();
        updateNavbarState();
        updateActiveLink();
        updateTimelineProgress();
        updateBackToTop();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load to set initial states

});
