document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Slideshow Functionality
  const slideshow = document.querySelector('.slideshow');
  
  if (slideshow) {
    const slides = slideshow.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slideshow-dot');
    const nextBtn = document.querySelector('.slideshow-arrow.next');
    const prevBtn = document.querySelector('.slideshow-arrow.prev');
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Add active class to current slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      // Update current slide index
      currentSlide = index;
    }
    
    function nextSlide() {
      let newIndex = currentSlide + 1;
      if (newIndex >= slides.length) {
        newIndex = 0;
      }
      showSlide(newIndex);
    }
    
    function prevSlide() {
      let newIndex = currentSlide - 1;
      if (newIndex < 0) {
        newIndex = slides.length - 1;
      }
      showSlide(newIndex);
    }
    
    // Initialize slideshow with first slide active
    showSlide(0);
    
    // Auto advance slides
    startSlideshow();
    
    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopSlideshow() {
      clearInterval(slideInterval);
    }
    
    // Event listeners for slideshow controls
    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          stopSlideshow();
          showSlide(index);
          startSlideshow();
        });
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopSlideshow();
        nextSlide();
        startSlideshow();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopSlideshow();
        prevSlide();
        startSlideshow();
      });
    }
    
    // Pause slideshow on hover
    slideshow.addEventListener('mouseenter', stopSlideshow);
    slideshow.addEventListener('mouseleave', startSlideshow);
  }
  
  // Resources Tabs Functionality
  const resourceTabs = document.querySelectorAll('.resource-tab');
  const resourceContents = document.querySelectorAll('.resources-content');
  
  if (resourceTabs.length > 0 && resourceContents.length > 0) {
    resourceTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        resourceTabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to current tab
        tab.classList.add('active');
        
        // Hide all content sections
        resourceContents.forEach(content => content.classList.remove('active'));
        
        // Show content for the active tab
        resourceContents[index].classList.add('active');
      });
    });
  }
  
  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkVisibility() {
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('visible');
      }
    });
  }
  
  // Check visibility on page load
  if (animateElements.length > 0) {
    checkVisibility();
    
    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
  }
}); 