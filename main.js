// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current navigation item
const currentLocation = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentLocation.split('/').pop()) {
        link.classList.add('active');
    }
});

// Add scroll-based animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.content-card, .feature, .character-card').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .fade-in.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-container');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    menuButton.setAttribute('aria-label', 'Toggle menu');
    
    menuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--text-white);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;

    nav.insertBefore(menuButton, nav.firstChild);

    menuButton.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Show/hide menu button based on screen size
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleScreenChange = (e) => {
        menuButton.style.display = e.matches ? 'block' : 'none';
        if (!e.matches) {
            document.querySelector('.nav-links').style.display = 'flex';
        }
    };

    mediaQuery.addListener(handleScreenChange);
    handleScreenChange(mediaQuery);
};

// Initialize mobile menu
createMobileMenu(); 