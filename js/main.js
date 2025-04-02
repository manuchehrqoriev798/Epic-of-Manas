// Constants
const LOCATIONS = [
  {
    name: 'Talas Valley',
    position: { lat: 42.5200, lng: 72.2400 },
    zoom: 11
  },
  {
    name: 'Ala-Too Mountains',
    position: { lat: 42.5000, lng: 74.5000 },
    zoom: 10
  },
  {
    name: 'Issyk-Kul Lake',
    position: { lat: 42.4500, lng: 77.1500 },
    zoom: 9
  },
  {
    name: 'Naryn Region',
    position: { lat: 41.4300, lng: 76.0000 },
    zoom: 10
  },
  {
    name: 'Suusamyr Valley',
    position: { lat: 42.2400, lng: 73.3000 },
    zoom: 11
  }
];

// State Management
let currentLocationIndex = 0;
let map;
let marker;
let slideInterval;

// DOM Elements
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');
const slideshow = document.querySelector('.slideshow');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slideshow-dot');
const prevArrow = document.querySelector('.slideshow-arrow.prev');
const nextArrow = document.querySelector('.slideshow-arrow.next');

// Mobile Navigation
function initMobileNav() {
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileNavToggle.querySelector('i').classList.toggle('fa-bars');
      mobileNavToggle.querySelector('i').classList.toggle('fa-times');
    });
  }
}

// Slideshow Functionality
function initSlideshow() {
  if (!slideshow) return;

  let currentSlide = 0;
  const SLIDE_INTERVAL = 5000;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function previousSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  function startSlideshow() {
    slideInterval = setInterval(nextSlide, SLIDE_INTERVAL);
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Event Listeners
  prevArrow?.addEventListener('click', () => {
    previousSlide();
    stopSlideshow();
  });

  nextArrow?.addEventListener('click', () => {
    nextSlide();
    stopSlideshow();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      stopSlideshow();
    });
  });

  slideshow.addEventListener('mouseenter', stopSlideshow);
  slideshow.addEventListener('mouseleave', startSlideshow);

  // Start slideshow
  startSlideshow();
}

// Resources Tab Functionality
function initResourceTabs() {
  const resourceTabs = document.querySelectorAll('.resource-tab');
  const resourceContents = document.querySelectorAll('.resources-content');

  if (resourceTabs.length > 0 && resourceContents.length > 0) {
    resourceTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        resourceTabs.forEach(t => t.classList.remove('active'));
        resourceContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        resourceContents[index].classList.add('active');
      });
    });
  }
}

// Smooth Scroll
function initSmoothScroll() {
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
}

// Animation on Scroll
function initScrollAnimation() {
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

  if (animateElements.length > 0) {
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
  }
}

// Map Functionality
window.initMap = function() {
  const mapOptions = {
    center: LOCATIONS[0].position,
    zoom: LOCATIONS[0].zoom,
    mapTypeId: 'terrain',
    styles: [
      {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [{ color: '#ebe3cd' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#b9d3c2' }]
      }
    ]
  };

  map = new google.maps.Map(document.getElementById('epic-map'), mapOptions);
  marker = new google.maps.Marker({
    position: LOCATIONS[0].position,
    map: map,
    animation: google.maps.Animation.DROP
  });

  showLocation(0);
};

window.showLocation = function(index) {
  if (!map || !marker) return;
  
  currentLocationIndex = index;
  map.panTo(LOCATIONS[index].position);
  map.setZoom(LOCATIONS[index].zoom);
  marker.setPosition(LOCATIONS[index].position);
  
  // Update UI
  document.querySelectorAll('.location-info').forEach(info => {
    info.classList.remove('active');
  });
  document.querySelectorAll('.location-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.location-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.location-info')[index].classList.add('active');
};

window.nextLocation = function() {
  const nextIndex = (currentLocationIndex + 1) % LOCATIONS.length;
  showLocation(nextIndex);
};

window.previousLocation = function() {
  const prevIndex = (currentLocationIndex - 1 + LOCATIONS.length) % LOCATIONS.length;
  showLocation(prevIndex);
};

// FAQ Functionality
window.toggleFaq = function(element) {
  const faqItem = element.closest('.faq-item');
  const answer = faqItem.querySelector('.faq-answer');
  const icon = element.querySelector('i');
  
  faqItem.classList.toggle('active');
  if (faqItem.classList.contains('active')) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    icon.style.transform = 'rotate(180deg)';
  } else {
    answer.style.maxHeight = '0';
    icon.style.transform = 'rotate(0)';
  }
};

// Gallery Functionality
window.openGallery = function(element) {
  const imgSrc = element.querySelector('img').src;
  const caption = element.querySelector('.gallery-overlay span').textContent;
  
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'gallery-modal';
  modal.innerHTML = `
    <div class="gallery-modal-content">
      <img src="${imgSrc}" alt="${caption}">
      <p>${caption}</p>
      <button class="close-modal">&times;</button>
    </div>
  `;
  
  // Add close functionality
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.className === 'close-modal') {
      modal.remove();
    }
  });
  
  document.body.appendChild(modal);
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSlideshow();
  initResourceTabs();
  initSmoothScroll();
  initScrollAnimation();
});

