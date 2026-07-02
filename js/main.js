// ============================================
// ReWireWorks - Main JavaScript
// Card expansion, mobile nav, scroll reveal
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // Rotate expanded-card image position: top, bottom, left, right, repeating.
  // Runs once per page load, in document order, and skips cards with no
  // image entirely (their counter position isn't consumed). This overrides
  // whatever image-left/right/top/bottom class is set in the HTML, so the
  // position no longer needs to be hand-authored per card.
  const imagePositionOrder = ['image-top', 'image-bottom', 'image-left', 'image-right'];
  let imagePositionIndex = 0;
  document.querySelectorAll('.expanded-layout').forEach(layout => {
    if (layout.classList.contains('no-image')) return;
    layout.classList.remove('image-left', 'image-right', 'image-top', 'image-bottom');
    layout.classList.add(imagePositionOrder[imagePositionIndex % imagePositionOrder.length]);
    imagePositionIndex++;
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close on link click (mobile)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          navMenu.classList.remove('active');
        }
      });
    });
  }

  // Mobile dropdown toggle
  document.querySelectorAll('.dropdown > a').forEach(dropLink => {
    dropLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        dropLink.parentElement.classList.toggle('active');
      }
    });
  });

  // Card expansion (Read more)
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.card');
      const isExpanded = card.classList.contains('expanded');

      // Close all other cards on same page (optional - accordion behavior)
      // Uncomment next line if you want only one open at a time:
      // card.parentElement.querySelectorAll('.card.expanded').forEach(c => c.classList.remove('expanded'));

      card.classList.toggle('expanded');

      // Update button text
      if (card.classList.contains('expanded')) {
        this.innerHTML = 'Read less <span class="icon">−</span>';
      } else {
        this.innerHTML = 'Read more <span class="icon">+</span>';
      }
    });
  });

  // Scroll reveal animation
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Form validation
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#C04535';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) {
        e.preventDefault();
        alert('Please fill in all required fields.');
      }
    });
  });

  // Current page nav highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.split('/').pop() === currentPage) {
      link.classList.add('active');
    }
  });

});
