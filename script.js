// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if it's open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.querySelector('.mobile-menu-button').classList.remove('active');
            }
        }
    });
});

// Add mobile navigation menu
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const mobileMenu = document.querySelector('.mobile-menu');
    
    nav.appendChild(mobileMenuButton);
    
    // Toggle menu when clicking the menu button
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });

    // Close menu when clicking the close button
    const closeButton = document.querySelector('.mobile-menu-close');
    closeButton.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuButton.classList.remove('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        }
    });
};

// Initialize mobile menu
window.addEventListener('load', createMobileMenu);

// Add scroll event listener for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});