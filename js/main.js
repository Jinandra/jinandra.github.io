document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
            
            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => {
                error.style.display = 'none';
                error.textContent = '';
            });
            
            // Form validation
            const formData = new FormData(contactForm);
            let isValid = true;
            
            // Validate name
            const name = formData.get('name').trim();
            if (!name) {
                showError('name-error', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('name-error', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            const email = formData.get('email').trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                showError('email-error', 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject
            const subject = formData.get('subject').trim();
            if (!subject) {
                showError('subject-error', 'Subject is required');
                isValid = false;
            } else if (subject.length < 5) {
                showError('subject-error', 'Subject must be at least 5 characters');
                isValid = false;
            }
            
            // Validate message
            const message = formData.get('message').trim();
            if (!message) {
                showError('message-error', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('message-error', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('.btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.background = '#27ae60';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                }, 2000);
            }
        });
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animate skill bars on scroll
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsSection = document.getElementById('skills');
        
        if (skillsSection && isElementInViewport(skillsSection)) {
            skillBars.forEach(bar => {
                if (!bar.classList.contains('animated')) {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    bar.classList.add('animated');
                    
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                }
            });
        }
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.skill-category, .portfolio-item, .service-item');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.classList.add('animated');
                }, 100);
            }
        });
    }
    
    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Throttled scroll event listener
    let ticking = false;
    
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                animateSkillBars();
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Typing animation for hero text
    function typeWriter() {
        const heroName = document.querySelector('.hero-name');
        if (!heroName) return;
        
        const text = 'Laravel Developer';
        const speed = 100;
        let i = 0;
        
        heroName.textContent = '';
        
        function type() {
            if (i < text.length) {
                heroName.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        // Start typing animation after page load
        setTimeout(type, 1000);
    }
    
    // Initialize typing animation
    typeWriter();
    
    // Parallax effect for hero section
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.backgroundPosition = `center ${rate}px`;
        }
    }
    
    window.addEventListener('scroll', parallaxEffect);
    
    // Counter animation for statistics
    // function animateCounters() {
    //     const counters = document.querySelectorAll('.stat-number');
    //     const aboutSection = document.getElementById('about');
        
    //     if (aboutSection && isElementInViewport(aboutSection)) {
    //         counters.forEach(counter => {
    //             if (!counter.classList.contains('counted')) {
    //                 const target = parseInt(counter.textContent.replace(/\D/g, ''));
    //                 const increment = target / 50;
    //                 let current = 0;
                    
    //                 const timer = setInterval(() => {
    //                     current += increment;
    //                     counter.textContent = Math.ceil(current) + '+';
                        
    //                     if (current >= target) {
    //                         counter.textContent = target + '+';
    //                         clearInterval(timer);
    //                         counter.classList.add('counted');
    //                     }
    //                 }, 50);
    //             }
    //         });
    //     }
    // }

    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const aboutSection = document.getElementById('about');

        if (aboutSection && isElementInViewport(aboutSection)) {
            counters.forEach(counter => {
                if (!counter.classList.contains('counted')) {
                    const originalText = counter.textContent.trim();
                    const target = parseInt(originalText.replace(/\D/g, ''));
                    const suffix = originalText.replace(/\d/g, ''); // capture '+' or '%'
                    const increment = target / 50;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        counter.textContent = Math.ceil(current) + suffix;

                        if (current >= target) {
                            counter.textContent = target + suffix;
                            clearInterval(timer);
                            counter.classList.add('counted');
                        }
                    }, 50);
                }
            });
        }
    }

    
    window.addEventListener('scroll', animateCounters);
    
    // Easter egg: Konami code
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Add rainbow animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Add smooth reveal animations to sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
    
    // Update CSS for fade-in animation
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(fadeInStyle);
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
