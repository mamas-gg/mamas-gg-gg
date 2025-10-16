// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Scroll to section when clicking on navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars
    const skillSection = document.querySelector('.skills-container');
    if (skillSection) {
        const skillBars = document.querySelectorAll('.skill-per');
        
        function animateSkills() {
            skillBars.forEach(skill => {
                const percentage = skill.getAttribute('per');
                skill.style.width = percentage + '%';
            });
        }
        
        // Trigger skill animation when skills section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillSection);
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showAlert('Please fill in all fields', 'danger');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'danger');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                showAlert('Your message has been sent successfully!', 'success');
                contactForm.reset();
                submitBtn.innerHTML = 'Send Message';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Helper function to show alert messages
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = message;
        
        // Style the alert
        alertDiv.style.padding = '1rem';
        alertDiv.style.marginBottom = '1.5rem';
        alertDiv.style.borderRadius = 'var(--radius)';
        alertDiv.style.fontWeight = '500';
        
        if (type === 'danger') {
            alertDiv.style.backgroundColor = 'rgba(220, 53, 69, 0.15)';
            alertDiv.style.color = '#ff6b6b';
        } else if (type === 'success') {
            alertDiv.style.backgroundColor = 'rgba(40, 167, 69, 0.15)';
            alertDiv.style.color = '#51cf66';
        }
        
        // Insert alert before form
        const contactForm = document.getElementById('contactForm');
        contactForm.parentNode.insertBefore(alertDiv, contactForm);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
    
    // Create particle animation for the hero section background
    const hero = document.querySelector('.hero');
    if (hero) {
        createParticles(hero, 30);
    }
    
    // Helper function to create particles
    function createParticles(container, count) {
        const particles = document.createElement('div');
        particles.className = 'hero-particles';
        particles.style.position = 'absolute';
        particles.style.top = '0';
        particles.style.left = '0';
        particles.style.width = '100%';
        particles.style.height = '100%';
        particles.style.overflow = 'hidden';
        particles.style.zIndex = '1';
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('span');
            
            // Random properties
            const size = Math.random() * 6 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 20 + 10;
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Style particle
            particle.style.position = 'absolute';
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = '#fff';
            particle.style.borderRadius = '50%';
            particle.style.opacity = opacity;
            particle.style.animation = `float ${duration}s linear infinite`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.boxShadow = '0 0 10px rgba(0, 119, 255, 0.5)';
            
            particles.appendChild(particle);
        }
        
        container.appendChild(particles);
        
        // Add keyframes for float animation
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: ${Math.random() * 0.5 + 0.1};
                }
                50% {
                    transform: translateY(-${Math.random() * 100 + 50}px) translateX(${Math.random() * 50 - 25}px);
                    opacity: ${Math.random() * 0.5 + 0.3};
                }
                100% {
                    transform: translateY(-${Math.random() * 200 + 100}px) translateX(${Math.random() * 100 - 50}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    // Add active state to current page in navigation
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Create a scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top';
    document.body.appendChild(scrollTopBtn);
    
    // Style the scroll to top button
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.width = '50px';
    scrollTopBtn.style.height = '50px';
    scrollTopBtn.style.backgroundColor = 'var(--primary)';
    scrollTopBtn.style.color = 'white';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.fontSize = '1.25rem';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.justifyContent = 'center';
    scrollTopBtn.style.boxShadow = '0 5px 15px rgba(0, 119, 255, 0.3)';
    scrollTopBtn.style.transition = 'all 0.3s ease';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
    scrollTopBtn.style.zIndex = '999';
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mouse hover effect for button
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 8px 20px rgba(0, 119, 255, 0.4)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 119, 255, 0.3)';
    });
});