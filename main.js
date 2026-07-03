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

  // Crop-focus rotation, per the orientation-pairing table:
  // portrait image in a top/bottom (wide, short) slot needs the most
  // variety since it's the axis being cut hardest - 3 options.
  // Matched-aspect pairings (portrait/left-right, landscape/top-bottom)
  // need less - 2 options. Landscape image in a left/right (narrow,
  // tall) slot mirrors the first case on the horizontal axis - 3 options.
  const cropRotations = {
    'portrait-widerslot': ['crop-top', 'crop-bottom', 'crop-middle'],
    'portrait-tallslot': ['crop-top-adjusted', 'crop-bottom-adjusted'],
    'landscape-widerslot': ['crop-top-adjusted', 'crop-bottom-adjusted'],
    'landscape-tallslot': ['crop-left', 'crop-right', 'crop-middle']
  };
  const cropIndexes = { 'portrait-widerslot': 0, 'portrait-tallslot': 0, 'landscape-widerslot': 0, 'landscape-tallslot': 0 };

  function assignCropClass(sectionImage, slotIsWide) {
    const img = sectionImage.querySelector('img');
    if (!img) return;

    const apply = () => {
      const orientation = img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait';
      const key = orientation + (slotIsWide ? '-widerslot' : '-tallslot');
      const options = cropRotations[key];
      const chosen = options[cropIndexes[key] % options.length];
      cropIndexes[key]++;

      sectionImage.classList.remove('crop-top', 'crop-top-adjusted', 'crop-middle', 'crop-bottom-adjusted', 'crop-bottom', 'crop-left', 'crop-right');
      sectionImage.classList.add(chosen);
    };

    if (img.complete && img.naturalWidth) {
      apply();
    } else {
      img.addEventListener('load', apply, { once: true });
    }
  }

  document.querySelectorAll('.expanded-layout').forEach(layout => {
    if (layout.classList.contains('no-image')) return;
    layout.classList.remove('image-left', 'image-right', 'image-top', 'image-bottom');
    const position = imagePositionOrder[imagePositionIndex % imagePositionOrder.length];
    layout.classList.add(position);
    imagePositionIndex++;

    const sectionImage = layout.querySelector('.section-image');
    if (sectionImage) {
      const slotIsWide = position === 'image-top' || position === 'image-bottom';
      assignCropClass(sectionImage, slotIsWide);
    }
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
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const isHomeLink = href === '/';
    const onHomePage = currentPath === '/' || currentPath.endsWith('/index.html');
    const matches = isHomeLink ? onHomePage : href.split('/').pop() === currentPath.split('/').pop();

    if (matches) {
      link.classList.add('active');
    }
  });

});
