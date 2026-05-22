document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    const skills = [
        {
            title: 'Backend',
            icon: 'backend',
            items: ['Laravel', 'Python', 'FastAPI', 'Django', 'PHP', 'Symfony', 'Node.js', 'REST APIs', 'GraphQL']
        },
        {
            title: 'AI · Daily Driver',
            icon: 'ai',
            items: ['OpenAI / GPT', 'Claude', 'Gemini', 'Cursor', 'Copilot', 'n8n', 'AI Automation']
        },
        {
            title: 'Frontend',
            icon: 'frontend',
            items: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS', 'JavaScript']
        },
        {
            title: 'Cloud · DevOps',
            icon: 'devops',
            items: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'Nginx', 'Git', 'CI/CD', 'Jenkins']
        },
        {
            title: 'Data · APIs',
            icon: 'data',
            items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Stripe', 'OAuth', 'JWT']
        },
        {
            title: 'Architecture',
            icon: 'architecture',
            items: ['SaaS Architecture', 'Microservices', 'Queue Systems', 'Event-driven Systems', 'API Integrations', 'Webhooks', 'Payment Systems']
        }
    ];

    const skillIconMap = {
        backend: 'icon-backend',
        ai: 'icon-ai',
        frontend: 'icon-frontend',
        devops: 'icon-devops',
        data: 'icon-data',
        architecture: 'icon-architecture'
    };

    const skillsGrid = document.getElementById('skills-grid');

    function initializeTestimonialSourceLinks() {
        const linkedinUrl = 'https://www.linkedin.com/in/jinandra-kumar-49306122/';
        const upworkUrl = 'https://www.upwork.com/freelancers/~010458698f5bccfee1';
        const testimonialAuthors = document.querySelectorAll('.testimonial-author');

        testimonialAuthors.forEach(authorBlock => {
            if (authorBlock.querySelector('.testimonial-source-links')) return;

            const sourceLinks = document.createElement('div');
            sourceLinks.className = 'testimonial-source-links';

            sourceLinks.innerHTML = `
                <a href="${linkedinUrl}" target="_blank" rel="noopener" class="testimonial-source-link social-link" aria-label="View LinkedIn recommendations">
                    <i class="fab fa-linkedin"></i>
                    
                </a>
                <a href="${upworkUrl}" target="_blank" rel="noopener" class="testimonial-source-link social-link" aria-label="View Upwork reviews">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" style="width: 18px;"><path d="M493.9 359.6C443.6 359.6 410.4 320.7 401.1 305.7C413 210.4 447.9 180.3 493.9 180.3C539.4 180.3 574.8 216.7 574.8 270C574.8 323.3 539.4 359.7 493.9 359.7L493.9 359.6zM493.9 121.8C412 121.8 366.1 175.2 352.9 230.2C338 202.2 327 164.7 318.4 129.9L205.2 129.9L205.2 270.9C205.2 322 181.9 359.9 136.4 359.9C90.9 359.9 64.8 322.1 64.8 270.9L65.3 129.9L0 129.9L0 270.9C0 312 13.3 349.3 37.6 376C62.6 403.5 96.8 417.8 136.4 417.8C215.2 417.8 270.2 357.4 270.2 270.9L270.2 176.1C278.4 207.3 298 267.2 335.5 319.7L300.5 519.1L366.9 519.1L390 377.8C397.6 384.1 405.7 389.8 414.2 394.8C436.4 408.8 461.9 416.7 488.1 417.6C488.1 417.6 492.1 417.8 494.2 417.8C575.4 417.8 640.1 354.9 640.1 270C640.1 185.1 575.3 121.9 494.1 121.9L493.9 121.8z"/></svg>
                    
                </a>
            `;

            authorBlock.appendChild(sourceLinks);
        });
    }

    function initializeTestimonialToggles() {
        const maxChars = 360;
        const testimonialParagraphs = document.querySelectorAll('.testimonial-content p');

        testimonialParagraphs.forEach(paragraph => {
            if (paragraph.dataset.testimonialProcessed === 'true') return;

            const fullText = paragraph.textContent.replace(/\s+/g, ' ').trim();

            if (fullText.length <= maxChars) return;

            const truncatedText = `${fullText.slice(0, maxChars).trim()}...`;
            paragraph.textContent = truncatedText;
            paragraph.dataset.testimonialProcessed = 'true';

            const toggleButton = document.createElement('button');
            toggleButton.type = 'button';
            toggleButton.className = 'testimonial-toggle';
            toggleButton.textContent = 'See more';
            toggleButton.setAttribute('aria-expanded', 'false');

            toggleButton.addEventListener('click', function () {
                const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';

                if (isExpanded) {
                    paragraph.textContent = truncatedText;
                    toggleButton.textContent = 'See more';
                    toggleButton.setAttribute('aria-expanded', 'false');
                } else {
                    paragraph.textContent = fullText;
                    toggleButton.textContent = 'See less';
                    toggleButton.setAttribute('aria-expanded', 'true');
                }
            });

            paragraph.insertAdjacentElement('afterend', toggleButton);
        });
    }

    function initializeTestimonialsMobileCarousel() {
        const grid = document.querySelector('.testimonials-grid');
        if (!grid || grid.dataset.carouselReady === 'true') return;

        const cards = grid.querySelectorAll('.testimonial-item');
        if (cards.length < 2) return;

        const controls = document.createElement('div');
        controls.className = 'testimonials-carousel-controls';
        controls.innerHTML = `
            <button type="button" class="testimonials-carousel-btn" data-direction="prev" aria-label="Show previous testimonial">
                <i class="fas fa-chevron-left" aria-hidden="true"></i>
            </button>
            <button type="button" class="testimonials-carousel-btn" data-direction="next" aria-label="Show next testimonial">
                <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
        `;

        grid.insertAdjacentElement('afterend', controls);
        grid.dataset.carouselReady = 'true';

        const prevButton = controls.querySelector('[data-direction="prev"]');
        const nextButton = controls.querySelector('[data-direction="next"]');
        const mobileBreakpoint = window.matchMedia('(max-width: 768px)');

        const getScrollStep = () => {
            const firstCard = grid.querySelector('.testimonial-item');
            if (!firstCard) return grid.clientWidth;

            return firstCard.getBoundingClientRect().width + 16;
        };

        const updateButtonState = () => {
            if (!mobileBreakpoint.matches) {
                prevButton.disabled = true;
                nextButton.disabled = true;
                return;
            }

            const maxScrollLeft = Math.max(grid.scrollWidth - grid.clientWidth, 0);
            prevButton.disabled = grid.scrollLeft <= 4;
            nextButton.disabled = grid.scrollLeft >= maxScrollLeft - 4;
        };

        prevButton.addEventListener('click', () => {
            if (!mobileBreakpoint.matches) return;
            grid.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            if (!mobileBreakpoint.matches) return;
            grid.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        });

        grid.addEventListener('scroll', updateButtonState, { passive: true });
        window.addEventListener('resize', updateButtonState);
        updateButtonState();
    }

    function initializeSectionReveals() {
        const sections = document.querySelectorAll('section[id]');
        const revealableSections = Array.from(sections).filter(section => section.id !== 'home');

        sections.forEach(section => {
            if (section.id === 'home') {
                section.classList.add('is-visible');
            }
        });

        if (!revealableSections.length) return;

        if (!('IntersectionObserver' in window)) {
            revealableSections.forEach(section => section.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observerInstance.unobserve(entry.target);
            });
        }, {
            threshold: 0.18,
            rootMargin: '0px 0px -10% 0px'
        });

        revealableSections.forEach(section => observer.observe(section));
    }

    function initializeHeroVideoModal() {
        const trigger = document.getElementById('hero-video-trigger');
        const modal = document.getElementById('hero-video-modal');
        const closeButton = document.getElementById('hero-video-close');
        const iframe = document.getElementById('hero-video-iframe');

        if (!trigger || !modal || !closeButton || !iframe) return;

        const closeModal = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            iframe.src = '';
        };

        const openModal = () => {
            const videoUrl = iframe.dataset.src || '';
            if (videoUrl && iframe.getAttribute('src') !== videoUrl) {
                iframe.setAttribute('src', videoUrl);
            }
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            openModal();
        });
        closeButton.addEventListener('click', closeModal);

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    function renderSkillsDashboard() {
        if (!skillsGrid) return;

        skillsGrid.innerHTML = skills.map(card => {
            const iconId = skillIconMap[card.icon] || 'icon-frontend';
            const count = `${String(card.items.length).padStart(2, '0')} tools`;

            return `
                <article class="skill-card">
                    <div class="skill-card-header">
                        <h4 class="skill-card-title">${card.title}</h4>
                        <span class="skill-card-count">${count}</span>
                    </div>
                    <div class="skill-tags">
                        ${card.items.map(item => `
                            <span class="skill-tag">
                                <svg class="skill-tag-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#${iconId}"></use></svg>
                                <span>${item}</span>
                            </span>
                        `).join('')}
                    </div>
                </article>
            `;
        }).join('');
    }
    
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
        if (window.matchMedia('(max-width: 768px)').matches) {
            document.querySelectorAll('.skill-category, .portfolio-item, .service-item').forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'none';
                element.classList.add('animated');
            });
            return;
        }

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
    renderSkillsDashboard();
    initializeTestimonialSourceLinks();
    initializeTestimonialToggles();
    initializeTestimonialsMobileCarousel();
    initializeHeroVideoModal();
    initializeSectionReveals();
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
        // section.style.opacity = '0';
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
