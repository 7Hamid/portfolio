// Navigation et menu burger
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
};

// Navbar scroll effect
const navbarScroll = () => {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        if (scrollTop === 0) {
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.boxShadow = '0 10px 30px -10px rgba(2, 12, 27, 0.7)';
        }
        
        lastScrollTop = scrollTop;
    });
};

// Active link on scroll
const activeLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
};

// Projects filter
const projectsFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
};

// Form validation and AJAX submission
const formSubmit = () => {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                formMessage.textContent = 'Veuillez remplir tous les champs.';
                formMessage.className = 'error';
                formMessage.style.display = 'block';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Veuillez entrer une adresse email valide.';
                formMessage.className = 'error';
                formMessage.style.display = 'block';
                return;
            }
            
            // Create FormData object
            const formData = new FormData(form);
            
            // AJAX request
            const xhr = new XMLHttpRequest();
            xhr.open('POST', form.action, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        if (response.success) {
                            formMessage.textContent = response.message;
                            formMessage.className = 'success';
                            form.reset();
                        } else {
                            formMessage.textContent = response.message || 'Une erreur est survenue. Veuillez réessayer.';
                            formMessage.className = 'error';
                        }
                    } catch (e) {
                        formMessage.textContent = 'Le message a été envoyé avec succès!';
                        formMessage.className = 'success';
                        form.reset();
                    }
                } else {
                    formMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
                    formMessage.className = 'error';
                }
                formMessage.style.display = 'block';
            };
            xhr.onerror = function() {
                formMessage.textContent = 'Une erreur est survenue. Veuillez réessayer.';
                formMessage.className = 'error';
                formMessage.style.display = 'block';
            };
            xhr.send(formData);
        });
    }
};

// Download CV
const downloadCV = () => {
    const downloadBtn = document.getElementById('download-cv');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulate download (in a real scenario, this would be a link to the actual CV file)
            alert('Le téléchargement du CV commencera sous peu...');
        });
    }
};

// Scroll to top button
const scrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add CSS for the button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--accent-color);
            color: var(--primary-color);
            border: none;
            cursor: pointer;
            display: none;
            z-index: 999;
            transition: var(--transition);
        }
        
        .scroll-top-btn:hover {
            transform: translateY(-5px);
        }
    `;
    document.head.appendChild(style);
};

// Typing effect for hero section
const typingEffect = () => {
    const text = document.querySelector('.hero h2');
    const originalText = text.textContent;
    text.textContent = '';
    
    let i = 0;
    const typing = setInterval(() => {
        if (i < originalText.length) {
            text.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typing);
        }
    }, 100);
};

// Initialize all functions
const app = () => {
    navSlide();
    navbarScroll();
    activeLink();
    projectsFilter();
    formSubmit();
    downloadCV();
    scrollToTop();
    
    // Run typing effect after a short delay
    setTimeout(typingEffect, 1000);
};

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', app);
