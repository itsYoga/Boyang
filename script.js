// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Adjust for fixed header height if necessary
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // If mobile menu is active, close it after clicking a link
            const mobileMenu = document.querySelector('.mobile-menu');
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuButton.classList.remove('active');
                mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>'; // Reset icon
            }
        }
    });
});

// Add mobile navigation menu
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    if (!nav) return; // Guard clause

    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.setAttribute('aria-label', 'Toggle Menu'); // Accessibility
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        mobileMenu.innerHTML = navLinks.innerHTML;
    }
    
    // Insert button before nav-links if they exist, or at the end of nav
    const existingNavLinks = nav.querySelector('.nav-links');
    if (existingNavLinks) {
        nav.insertBefore(mobileMenuButton, existingNavLinks);
    } else {
        nav.appendChild(mobileMenuButton);
    }
    document.body.appendChild(mobileMenu); // Append menu to body to ensure stacking context
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
        if (mobileMenu.classList.contains('active')) {
            mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>'; // Change to X icon
            mobileMenuButton.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>'; // Change back to bars icon
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
};

// Initialize mobile menu
window.addEventListener('DOMContentLoaded', createMobileMenu); // Changed to DOMContentLoaded

// Add scroll event listener for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return; // Guard clause

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});