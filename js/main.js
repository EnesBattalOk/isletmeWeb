document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Sticky Header (Optimized)
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (lastScrollY > 50) {
                    header.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                    header.style.background = 'rgba(255, 255, 255, 0.98)'; // Slightly more opaque on scroll
                } else {
                    header.style.boxShadow = 'none';
                    header.style.background = 'rgba(255, 255, 255, 0.95)';
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Pricing Toggle (Monthly / Yearly)
    const billingToggle = document.getElementById('billing-toggle');
    const monthlyPrices = document.querySelectorAll('.monthly-price');
    const yearlyPrices = document.querySelectorAll('.yearly-price');
    const monthlyLabel = document.getElementById('monthly-label');
    const yearlyLabel = document.getElementById('yearly-label');

    if (billingToggle) {
        billingToggle.addEventListener('change', () => {
            if (billingToggle.checked) {
                // Yearly
                monthlyPrices.forEach(el => el.style.display = 'none');
                yearlyPrices.forEach(el => el.style.display = 'inline');
                if (monthlyLabel) monthlyLabel.classList.remove('active');
                if (yearlyLabel) yearlyLabel.classList.add('active');
            } else {
                // Monthly
                monthlyPrices.forEach(el => el.style.display = 'inline');
                yearlyPrices.forEach(el => el.style.display = 'none');
                if (monthlyLabel) monthlyLabel.classList.add('active');
                if (yearlyLabel) yearlyLabel.classList.remove('active');
            }
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                
                // Toggle current item
                const wasActive = item.classList.contains('active');
                
                // Close others
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // If it wasn't active before, make it active now
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    if (navMenu) navMenu.classList.remove('active');
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.feature-card, .section-title, .about-text-wrapper, .faq-item, .mobile-addon-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});
