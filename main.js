// AllGnosisAI Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeModals();
    initializeSliders();
    initializeForms();
    initializeCharts();
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeMobileMenu();
    initializeDataBackgrounds();
    initializeProjectProgress();
    initializeAdvantagesScroll();
    initializeFAQ();
    initializeApproachSlider();
});

// Initialize Data Backgrounds
function initializeDataBackgrounds() {
    const itemsWithBg = document.querySelectorAll('[data-bg-image]');
    itemsWithBg.forEach(item => {
        const bgImage = item.dataset.bgImage;
        if (bgImage) {
            item.style.backgroundImage = `url('${bgImage}')`;
        }
    });
}

// Initialize Mobile Menu
function initializeMobileMenu() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const mobileMenu = document.querySelector('.nav-mobile-menu');
        const mobileToggle = document.querySelector('.nav-mobile-toggle');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });
    
    // Close mobile menu when clicking on navigation links
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
}

// Modal Management
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id.replace('-modal', ''));
            }
        });
    });
    
    // Close modal when clicking close button
    modalCloses.forEach(close => {
        close.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id.replace('-modal', ''));
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal.id.replace('-modal', ''));
            }
        }
    });
}

function openModal(modalType) {
    const modal = document.getElementById(modalType + '-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 300);
        }
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(modalType + '-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Slider Management
function initializeSliders() {
    initializeCaseStudySlider();
    // initializeTestimonialSlider(); // Commented out since testimonials section is hidden
}

function initializeCaseStudySlider() {
    const slides = document.querySelectorAll('.case-study-card');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);
}

function initializeTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 6000);
}

// Form Management
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const formType = form.className;
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showSuccessMessage(formType);
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Close modal after successful submission
        const modal = form.closest('.modal');
        if (modal) {
            closeModal(modal.id.replace('-modal', ''));
        }
    }, 1500);
}

function showSuccessMessage(formType) {
    let message = '';
    
    switch(formType) {
        case 'consultation-form':
            message = 'Consultation request submitted! We\'ll contact you within 24 hours.';
            break;
        case 'research-brief-form':
            message = 'Research brief download started! Check your email for the link.';
            break;
        case 'project-form':
            message = 'Project request submitted! Our team will review and respond soon.';
            break;
        case 'newsletter-form':
            message = 'Successfully subscribed to our newsletter!';
            break;
        case 'contact-form':
            message = 'Thank you for your message! We will get back to you shortly.';
            break;
        default:
            message = 'Form submitted successfully!';
    }
    
    showNotification(message, 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22C55E' : '#F97316'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        font-weight: 500;
        z-index: 3000;
        animation: slideInRight 300ms ease-out;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 300ms ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Chart Rendering
function initializeCharts() {
    drawSuccessChart();
    drawROIChart();
    initializeTimelineCharts();
    
    // Add resize handler for responsive charts
    window.addEventListener('resize', debounce(() => {
        // Re-initialize charts on significant resize
        const chartElements = document.querySelectorAll('#successChart, #roiChart');
        chartElements.forEach(canvas => {
            const chart = Chart.getChart(canvas);
            if (chart) {
                chart.resize();
            }
        });
    }, 250));
}

function initializeTimelineCharts() {
    const timelineBars = document.querySelectorAll('.timeline-item .progress-fill');
    const timelineObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%'; // Reset
                setTimeout(() => {
                    bar.style.transition = 'width 1s ease-out';
                    bar.style.width = targetWidth;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.8 });

    timelineBars.forEach(bar => {
        timelineObserver.observe(bar);
    });
}

function drawSuccessChart() {
    const canvas = document.getElementById('successChart');
    if (!canvas) return;

    // Mobile responsive settings
    const isMobile = window.innerWidth <= 768;
    const borderWidth = isMobile ? 2 : 4;
    const cutout = isMobile ? '75%' : '80%';

    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Successful', 'Partial Success'],
            datasets: [{
                label: 'Project Success Rate',
                data: [98, 2],
                backgroundColor: [
                    '#22C55E',
                    '#F59E0B'
                ],
                borderColor: '#FFFFFF',
                borderWidth: borderWidth,
                hoverOffset: isMobile ? 2 : 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: cutout,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#000000',
                    titleFont: { 
                        size: isMobile ? 12 : 14, 
                        weight: 'bold' 
                    },
                    bodyFont: { 
                        size: isMobile ? 10 : 12 
                    },
                    padding: isMobile ? 8 : 10,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            // Add resize handler for mobile responsiveness
            onResize: function(chart, size) {
                const isMobileResize = size.width <= 400;
                chart.options.plugins.tooltip.titleFont.size = isMobileResize ? 10 : 12;
                chart.options.plugins.tooltip.bodyFont.size = isMobileResize ? 9 : 10;
            }
        }
    });
}

function drawROIChart() {
    const canvas = document.getElementById('roiChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Mobile responsive settings
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#F97316');
    gradient.addColorStop(0.8, '#000000');
    
    const data = [120, 180, 250, 320, 400, 180, 290, 210, 350, 280];
    const mobileData = isSmallMobile ? data.slice(0, 6) : data; // Show fewer bars on small mobile

    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: mobileData.map((_, i) => `Client #${i + 1}`),
            datasets: [{
                label: 'Client ROI',
                data: mobileData,
                backgroundColor: gradient,
                borderRadius: isMobile ? 2 : 4,
                hoverBackgroundColor: '#F97316'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: '#000000',
                    titleFont: { 
                        size: isMobile ? 12 : 14, 
                        weight: 'bold' 
                    },
                    bodyFont: { 
                        size: isMobile ? 10 : 12 
                    },
                    padding: isMobile ? 8 : 10,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            return `ROI: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#F0F0F0',
                        lineWidth: isMobile ? 0.5 : 1
                    },
                    ticks: {
                        padding: isMobile ? 5 : 10,
                        font: {
                            size: isMobile ? 10 : 12
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                   grid: {
                       display: false
                   },
                   ticks: {
                       display: false
                   }
                }
            },
            // Add resize handler for mobile responsiveness
            onResize: function(chart, size) {
                const isMobileResize = size.width <= 400;
                chart.options.plugins.tooltip.titleFont.size = isMobileResize ? 10 : 12;
                chart.options.plugins.tooltip.bodyFont.size = isMobileResize ? 9 : 10;
                chart.options.scales.y.ticks.font.size = isMobileResize ? 9 : 10;
            }
        }
    });
}

// Animation System
function initializeAnimations() {
    // Fade in animations
    const fadeElements = document.querySelectorAll('.service-card, .project-card, .team-member, .methodology-step');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(element);
    });
    
    // Counter animations
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.metric-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const isPercentage = target.includes('%');
                const isMultiplier = target.includes('x');
                const numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
                
                animateCounter(counter, numericValue, isPercentage, isMultiplier);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target, isPercentage, isMultiplier) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (isPercentage) {
            displayValue += '%';
        } else if (isMultiplier) {
            displayValue = current.toFixed(1) + 'x';
        } else if (target >= 1000) {
            displayValue = Math.floor(current) + '+';
        }
        
        element.textContent = displayValue;
    }, stepTime);
}

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || '';
            const isHashLink = href.startsWith('#');
            const isExternal = /^https?:\/\//i.test(href) || link.target === '_blank' || (link.host && link.host !== window.location.host);

            // Allow external links to navigate normally
            if (isExternal) {
                return;
            }

            // Smooth scroll for hash links
            if (isHashLink) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (link.classList.contains('nav-mobile-link')) {
                        closeMobileMenu();
                    }
                }
            }
        });
    });
}

// Mobile Menu Management
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.nav-mobile-menu');
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    
    if (mobileMenu && mobileToggle) {
        mobileMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.nav-mobile-menu');
    const mobileToggle = document.querySelector('.nav-mobile-toggle');
    
    if (mobileMenu && mobileToggle) {
        mobileMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Scroll Effects
function initializeScrollEffects() {
    const navbar = document.querySelector('.nav-header');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Navbar background opacity
        if (scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Parallax effect for hero section
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth > 1024) { // Only apply parallax on desktop
                const scrollY = window.scrollY;
                const rate = scrollY * -0.5;
                heroVisual.style.transform = `translateY(${rate}px)`;
            } else {
                heroVisual.style.transform = 'translateY(0)'; // Ensure it's reset on mobile
            }
        });
    }
}

// Advantages Scroll Effects
function initializeAdvantagesScroll() {
    const advantageItems = document.querySelectorAll('.advantage-item');
    
    if (advantageItems.length === 0) return;
    
    const observerOptions = {
        threshold: window.innerWidth <= 768 ? 0.2 : 0.3,
        rootMargin: window.innerWidth <= 768 ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
    };
    
    const advantageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                
                // Add visible class for main animation
                item.classList.add('visible');
                
                // Animate statistics numbers
                const statsNumbers = item.querySelectorAll('.stat-number');
                statsNumbers.forEach(statNumber => {
                    const originalText = statNumber.textContent;
                    
                    // Check if it's a percentage or multiplier
                    const isPercentage = originalText.includes('%');
                    const isMultiplier = originalText.includes('x');
                    const isDollar = originalText.includes('$');
                    
                    // Extract the number
                    let targetValue = parseFloat(originalText.replace(/[^0-9.-]/g, ''));
                    
                    if (isNaN(targetValue)) {
                        // Handle special cases like "Zero"
                        if (originalText.toLowerCase().includes('zero')) {
                            targetValue = 0;
                        } else {
                            return; // Skip if can't parse number
                        }
                    }
                    
                    // Animate the number
                    animateStatNumber(statNumber, targetValue, isPercentage, isMultiplier, isDollar, originalText);
                });
                
                // Unobserve after animation to prevent re-triggering
                advantageObserver.unobserve(item);
            }
        });
    }, observerOptions);
    
    advantageItems.forEach(item => {
        advantageObserver.observe(item);
    });
    
    // Update observer options on window resize
    window.addEventListener('resize', debounce(() => {
        // Reinitialize observer with new options if needed
        const newThreshold = window.innerWidth <= 768 ? 0.2 : 0.3;
        const newRootMargin = window.innerWidth <= 768 ? '0px 0px -50px 0px' : '0px 0px -100px 0px';
        
        // Only update if threshold or rootMargin changed
        if (newThreshold !== observerOptions.threshold || newRootMargin !== observerOptions.rootMargin) {
            advantageObserver.disconnect();
            
            const newObserverOptions = {
                threshold: newThreshold,
                rootMargin: newRootMargin
            };
            
            const newAdvantageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
                        const item = entry.target;
                        
                        // Add visible class for main animation
                        item.classList.add('visible');
                        
                        // Animate statistics numbers
                        const statsNumbers = item.querySelectorAll('.stat-number');
                        statsNumbers.forEach(statNumber => {
                            const originalText = statNumber.textContent;
                            
                            // Check if it's a percentage or multiplier
                            const isPercentage = originalText.includes('%');
                            const isMultiplier = originalText.includes('x');
                            const isDollar = originalText.includes('$');
                            
                            // Extract the number
                            let targetValue = parseFloat(originalText.replace(/[^0-9.-]/g, ''));
                            
                            if (isNaN(targetValue)) {
                                // Handle special cases like "Zero"
                                if (originalText.toLowerCase().includes('zero')) {
                                    targetValue = 0;
                                } else {
                                    return; // Skip if can't parse number
                                }
                            }
                            
                            // Animate the number
                            animateStatNumber(statNumber, targetValue, isPercentage, isMultiplier, isDollar, originalText);
                        });
                        
                        // Unobserve after animation to prevent re-triggering
                        newAdvantageObserver.unobserve(item);
                    }
                });
            }, newObserverOptions);
            
            advantageItems.forEach(item => {
                if (!item.classList.contains('visible')) {
                    newAdvantageObserver.observe(item);
                }
            });
        }
    }, 250));
}

function animateStatNumber(element, target, isPercentage, isMultiplier, isDollar, originalText) {
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = target * easeOutQuart;
        
        let displayValue;
        
        if (originalText.toLowerCase().includes('zero')) {
            displayValue = progress >= 0.8 ? 'Zero' : '0';
        } else if (isDollar) {
            if (target >= 1000000) {
                displayValue = '$' + (currentValue / 1000000).toFixed(1) + 'M';
            } else if (target >= 1000) {
                displayValue = '$' + (currentValue / 1000).toFixed(0) + 'K';
            } else {
                displayValue = '$' + Math.floor(currentValue);
            }
        } else if (isPercentage) {
            displayValue = Math.floor(currentValue) + '%';
        } else if (isMultiplier) {
            displayValue = currentValue.toFixed(1) + 'x';
        } else if (originalText.includes('+')) {
            displayValue = Math.floor(currentValue) + '+';
        } else {
            displayValue = Math.floor(currentValue);
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            // Ensure final value is exact
            element.textContent = originalText;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for notifications
const notificationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Project Progress Animation
function initializeProjectProgress() {
    const projectCards = document.querySelectorAll('.project-card');

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const progressBar = card.querySelector('.progress-fill');
                const progressText = card.querySelector('.progress-text');
                
                if (progressBar && progressText) {
                    const targetWidth = progressBar.style.width;
                    const targetPercentage = parseInt(targetWidth, 10);

                    // Animate the bar
                    progressBar.style.width = '0%'; // Reset for animation
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1s ease-out';
                        progressBar.style.width = targetWidth;
                    }, 100);

                    // Animate the text
                    let currentPercentage = 0;
                    const increment = targetPercentage / 50; // Animate over 50 steps
                    const stepTime = 1000 / 50; // 1s total duration

                    const timer = setInterval(() => {
                        currentPercentage += increment;
                        if (currentPercentage >= targetPercentage) {
                            currentPercentage = targetPercentage;
                            clearInterval(timer);
                        }
                        progressText.textContent = `${Math.floor(currentPercentage)}% Complete`;
                    }, stepTime);
                }
                
                observer.unobserve(card); // Animate only once
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the card is visible

    projectCards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Initialize FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
        
        // Add keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        // Make question focusable
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded when toggled
        const observer = new MutationObserver(() => {
            const isExpanded = item.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded);
        });
        
        observer.observe(item, { attributes: true, attributeFilter: ['class'] });
    });
}

// Initialize Approach Image Slider
function initializeApproachSlider() {
    const principles = document.querySelectorAll('.principle');
    const slides = document.querySelectorAll('.image-slide');
    
    if (principles.length === 0 || slides.length === 0) return;
    
    // Set first principle as active by default
    if (principles[0]) {
        principles[0].classList.add('active');
    }
    
    principles.forEach((principle, index) => {
        principle.addEventListener('click', () => {
            // Remove active class from all principles and slides
            principles.forEach(p => p.classList.remove('active'));
            slides.forEach(slide => slide.classList.remove('active'));
            
            // Add active class to clicked principle
            principle.classList.add('active');
            
            // Find the corresponding slide and activate it
            const principleType = principle.dataset.principle;
            const targetSlide = document.querySelector(`[data-slide="${principleType}"]`);
            
            if (targetSlide) {
                targetSlide.classList.add('active');
            }
        });
        
        // Add keyboard support
        principle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                principle.click();
            }
        });
        
        // Make principle focusable
        principle.setAttribute('tabindex', '0');
        principle.setAttribute('role', 'button');
    });
}

// Global functions for button clicks
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleMobileMenu = toggleMobileMenu;

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart + 'ms');
        }, 0);
    });
} 