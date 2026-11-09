/**
 * Clarissa Trent - Philanthropy & Institutional Advancement Portfolio
 * Interactive Functionality & Resume Management
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const giftCards = document.querySelectorAll('.gift-card');
  const resumeModal = document.getElementById('resume-modal');
  const openResumeBtns = document.querySelectorAll('.js-open-resume');
  const closeResumeBtn = document.getElementById('modal-close-btn');
  const toastNotice = document.getElementById('toast-notice');
  const contactForm = document.getElementById('contact-form');

  // 1. Sticky Navbar on Scroll (Passive listener for 120Hz/144Hz high refresh displays)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Menu Toggle (Matching portfolio-site with full drawer & body scroll lock)
  if (menuToggle && navLinks) {
    function toggleMenu(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      navLinks.classList.toggle('active');
      const isActive = navLinks.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isActive);
      menuToggle.classList.toggle('active', isActive);

      // Lock body scroll when mobile menu is open to prevent background scrolling
      document.body.style.overflow = isActive ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Close Mobile Menu when clicking any nav item or button
    navLinks.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when tapping outside on mobile
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active')) {
        const isClickInside = navLinks.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);
        if (!isClickInside && !isClickOnToggle) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // 3. Donor Gifts Acquired Filter Tabs
  if (filterBtns.length > 0 && giftCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedFilter = btn.getAttribute('data-filter');

        giftCards.forEach(card => {
          const cardCategories = card.getAttribute('data-category').split(' ');
          if (selectedFilter === 'all' || cardCategories.includes(selectedFilter)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Resume Modal Interaction (Dedicated spot for resume viewing)
  function openResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If clicking preview button, open modal; if normal link to ClarissaTrentResume.pdf without js-prevent, let user open file
      if (btn.classList.contains('js-preview-modal')) {
        e.preventDefault();
        openResumeModal();
      }
    });
  });

  if (closeResumeBtn) {
    closeResumeBtn.addEventListener('click', closeResumeModal);
  }

  if (resumeModal) {
    // Close on backdrop click
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeResumeModal();
      }
    });
  }

  // 4b. Thesis Modal Interaction
  const thesisModal = document.getElementById('thesis-modal');
  const openThesisBtns = document.querySelectorAll('.js-open-thesis-modal');
  const closeThesisBtn = document.getElementById('thesis-modal-close-btn');

  function openThesisModal() {
    if (!thesisModal) return;
    thesisModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeThesisModal() {
    if (!thesisModal) return;
    thesisModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openThesisBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openThesisModal();
    });
  });

  if (closeThesisBtn) {
    closeThesisBtn.addEventListener('click', closeThesisModal);
  }

  if (thesisModal) {
    thesisModal.addEventListener('click', (e) => {
      if (e.target === thesisModal) {
        closeThesisModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && thesisModal.classList.contains('active')) {
        closeThesisModal();
      }
    });
  }

  // 5. Toast Notification System
  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('show');
    setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3800);
  }

  // Copy-to-clipboard for quick email copy
  const copyButtons = document.querySelectorAll('.js-copy-text');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      if (text && navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied to clipboard: ${text}`);
        }).catch(() => {
          showToast(`Direct address: ${text}`);
        });
      }
    });
  });

  // 6. Working Contact & Email Submission System
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('sender-name');
      const orgInput = document.getElementById('sender-org');
      const emailInput = document.getElementById('sender-email');
      const roleSelect = document.getElementById('sender-role');
      const messageInput = document.getElementById('sender-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      const senderName = nameInput ? nameInput.value.trim() : '';
      const senderOrg = orgInput ? orgInput.value.trim() : '';
      const senderEmail = emailInput ? emailInput.value.trim() : '';
      const senderRoleText = roleSelect ? roleSelect.options[roleSelect.selectedIndex].text : 'Advancement Opportunity';
      const senderMessage = messageInput ? messageInput.value.trim() : '';

      // Target email address
      const recipientEmail = 'clarissatrent@gmail.com';
      const emailSubject = encodeURIComponent(`Inquiry from ${senderName} (${senderOrg}) - ${senderRoleText}`);
      
      const emailBodyText = 
`Hello Clarissa,

${senderMessage}

---
Inquiry Details:
Name: ${senderName}
Organization: ${senderOrg}
Contact Email: ${senderEmail}
Opportunity Focus: ${senderRoleText}`;

      const emailBody = encodeURIComponent(emailBodyText);
      const mailtoLink = `mailto:${recipientEmail}?cc=trentcl@iu.edu&subject=${emailSubject}&body=${emailBody}`;

      submitBtn.innerHTML = 'Opening Email App...';
      submitBtn.disabled = true;

      // Copy message to clipboard as a helpful fallback for the sender
      if (navigator.clipboard) {
        navigator.clipboard.writeText(emailBodyText).catch(() => {});
      }

      // Launch the user's default email client (Outlook, Apple Mail, Gmail, etc.)
      window.location.href = mailtoLink;

      showToast(`Opening your email client... Message details copied to clipboard!`);

      setTimeout(() => {
        submitBtn.innerHTML = 'Inquiry Sent!';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          contactForm.reset();
        }, 2200);
      }, 1000);
    });
  }

  // 8. Image Lightbox for High-Res Zoom on Click / Tap
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const zoomableImages = document.querySelectorAll(
    '.gallery-card img, .exp-photo-thumb img, .speaking-img, .hero-full-photo'
  );

  zoomableImages.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Clarissa Trent Advancement Photo';

      if (lightboxCaption) {
        const galleryParent = img.closest('.gallery-card');
        const expParent = img.closest('.exp-photo-thumb');
        const speakingParent = img.closest('.speaking-img-wrapper');

        let caption = '';
        if (galleryParent && galleryParent.querySelector('.gallery-caption')) {
          caption = galleryParent.querySelector('.gallery-caption').textContent;
        } else if (expParent && expParent.querySelector('.exp-photo-caption')) {
          caption = expParent.querySelector('.exp-photo-caption').textContent;
        } else if (speakingParent && speakingParent.querySelector('.speaking-caption-title')) {
          caption = speakingParent.querySelector('.speaking-caption-title').textContent;
        } else {
          caption = img.alt || '';
        }
        lightboxCaption.textContent = caption;
      }
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 10. Smooth Active Nav Link Highlighting on Scroll
  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchorLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 130;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navAnchorLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 11. Mobile / High-DPI Safety Fallback (OnePlus 15 & Modern Android fix)
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 400);
});

