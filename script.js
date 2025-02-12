// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(51, 51, 51, 0.2)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        lastScroll = currentScroll;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered delay for skill tags
                if (entry.target.classList.contains('skill-tag')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1;
                    entry.target.style.transitionDelay = `${delay}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });

    // Typing animation for hero section
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing animation when hero section is visible
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeWriter, 500);
                heroObserver.disconnect();
            }
        });

        heroObserver.observe(heroTitle);
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero-content');
    if (hero) {
        document.addEventListener('mousemove', (e) => {
            const speed = 5;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            
            requestAnimationFrame(() => {
                hero.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
        });
    }

    // Parallax effect for sections
    document.addEventListener('mousemove', (e) => {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const speed = 0.05;
            const rect = section.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * speed;
            const deltaY = (e.clientY - centerY) * speed;

            if (section.querySelector('.content-wrapper')) {
                section.querySelector('.content-wrapper').style.transform = 
                    `translate3d(${deltaX}px, ${deltaY}px, 0)`;
            }
        });
    });

    // Smooth reveal for skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.transitionDelay = `${index * 0.1}s`;
    });

    // Project card hover effect
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});