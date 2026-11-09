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

  // 1. Sticky Navbar on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any nav item
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when tapping outside on mobile
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
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

  // 8. Image Lightbox for Gallery Photos
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-card img, .fellowship-img');

  galleryItems.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Clarissa Trent Advancement Gallery';
      if (lightboxCaption) {
        const parentCard = img.closest('.gallery-card');
        const captionText = parentCard ? parentCard.querySelector('.gallery-caption')?.textContent : img.alt;
        lightboxCaption.textContent = captionText || '';
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
  });
});

