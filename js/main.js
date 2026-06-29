/**
 * Lex Humanitas - Journal of Law, Society and Humanities
 * Shared JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStickyHeader();
  initAccordions();
  initSearchFilter();
  initContactForm();
});

/**
 * Mobile Navbar Toggle
 */
function initNavbar() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      
      // Animate hamburger lines
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach((span, index) => {
        if (navList.classList.contains('active')) {
          if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (index === 1) span.style.opacity = '0';
          if (index === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          span.style.transform = 'none';
          span.style.opacity = '1';
        }
      });
    });
  }
}

/**
 * Sticky Header Scroll Shadow
 */
function initStickyHeader() {
  const header = document.querySelector('header.site-header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

/**
 * Accordions (Author Guidelines / Collapsible sections)
 */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close other accordion items
      const allItems = item.parentElement.querySelectorAll('.accordion-item');
      allItems.forEach(i => i.classList.remove('active'));
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Live search and filter on Archives Page
 */
function initSearchFilter() {
  const searchInput = document.querySelector('.search-input');
  const articleItems = document.querySelectorAll('.article-item');
  
  if (searchInput && articleItems.length > 0) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      articleItems.forEach(item => {
        const title = item.querySelector('.article-title').textContent.toLowerCase();
        const authors = item.querySelector('.article-authors').textContent.toLowerCase();
        
        if (title.includes(query) || authors.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/**
 * Contact Form validation and feedback
 */
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !subject || !message) {
        alert('Please fill out all fields.');
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Visual feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = '#48bb78'; // Green
        submitBtn.style.color = '#fff';
        
        // Reset form
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          submitBtn.style.color = '';
        }, 3000);
      }, 1500);
    });
  }
}
