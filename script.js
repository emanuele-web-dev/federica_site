// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

// Change navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    const backToTop = document.getElementById('back-to-top');
    
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});

// Animate stats counter
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Initialize ScrollReveal
ScrollReveal().reveal('.service-card', {
    delay: 200,
    distance: '50px',
    origin: 'bottom',
    interval: 100,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
});

ScrollReveal().reveal('.section-header', {
    delay: 100,
    distance: '20px',
    origin: 'top',
    easing: 'ease-in-out',
});

// Start counter animation when stats section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('section.bg-gradient-to-r');
if (statsSection) {
    observer.observe(statsSection);
}