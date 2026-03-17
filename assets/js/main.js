    // Header scroll effect
    const header = document.getElementById('siteHeader');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Mega Menu
    const megaMenuTrigger = document.getElementById('megaMenuTrigger');
    const megaMenu = document.getElementById('megaMenu');
    const servicesDropdown = document.getElementById('servicesDropdown');
    let megaMenuTimeout;

    function openMegaMenu() {
      clearTimeout(megaMenuTimeout);
      megaMenu.classList.add('show');
      document.body.classList.add('mega-menu-open');
      servicesDropdown.setAttribute('aria-expanded', 'true');
    }

    function closeMegaMenu() {
      megaMenuTimeout = setTimeout(() => {
        megaMenu.classList.remove('show');
        document.body.classList.remove('mega-menu-open');
        servicesDropdown.setAttribute('aria-expanded', 'false');
      }, 200);
    }

    megaMenuTrigger.addEventListener('mouseenter', openMegaMenu);
    megaMenu.addEventListener('mouseenter', openMegaMenu);
    megaMenuTrigger.addEventListener('mouseleave', closeMegaMenu);
    megaMenu.addEventListener('mouseleave', closeMegaMenu);

    // Mobile Offcanvas with GSAP
    const mobileOffcanvas = document.getElementById('mobileOffcanvas');
    const offcanvasBackdrop = document.getElementById('offcanvasBackdrop');
    const offcanvasPanel = document.getElementById('offcanvasPanel');
    const closeOffcanvas = document.getElementById('closeOffcanvas');
    const mobileToggler = document.getElementById('mobileToggler');
    let isOffcanvasOpen = false;

    function openOffcanvas() {
      if (isOffcanvasOpen) return;
      isOffcanvasOpen = true;

      // Make visible
      mobileOffcanvas.style.visibility = 'visible';
      document.body.style.overflow = 'hidden';

      // GSAP Animation - Backdrop fade in
      gsap.to(offcanvasBackdrop, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      // GSAP Animation - Panel slide from right
      gsap.fromTo(offcanvasPanel,
        { x: '100%' },
        {
          x: '0%',
          duration: 0.4,
          ease: 'power3.out'
        }
      );
    }

    function closeOffcanvasFn() {
      if (!isOffcanvasOpen) return;
      isOffcanvasOpen = false;

      // GSAP Animation - Panel slide to right
      gsap.to(offcanvasPanel, {
        x: '100%',
        duration: 0.3,
        ease: 'power3.in'
      });

      // GSAP Animation - Backdrop fade out
      gsap.to(offcanvasBackdrop, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: 'power2.in',
        onComplete: () => {
          mobileOffcanvas.style.visibility = 'hidden';
          document.body.style.overflow = '';
        }
      });
    }

    mobileToggler.addEventListener('click', openOffcanvas);
    closeOffcanvas.addEventListener('click', closeOffcanvasFn);
    offcanvasBackdrop.addEventListener('click', closeOffcanvasFn);

    // Close offcanvas when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOffcanvasOpen) {
        closeOffcanvasFn();
      }
    });

    // Mobile Dropdown
    const mobileDropdownToggle = document.getElementById('mobile-dropdown-toggle');
    const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');

    mobileDropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = mobileDropdownToggle.getAttribute('aria-expanded') === 'true';
      mobileDropdownToggle.setAttribute('aria-expanded', !isExpanded);
      mobileDropdownMenu.classList.toggle('show');
    });

    // Modals
    const androidModal = document.getElementById('androidModal');
    const iosModal = document.getElementById('iosModal');
    const closeAndroidModal = document.getElementById('closeAndroidModal');
    const closeIosModal = document.getElementById('closeIosModal');
    const understoodAndroid = document.getElementById('understoodAndroid');
    const understoodIos = document.getElementById('understoodIos');
    const androidModalBackdrop = document.getElementById('androidModalBackdrop');
    const iosModalBackdrop = document.getElementById('iosModalBackdrop');

    // Open modals
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-bs-target');
        if (target === '#androidModal') {
          androidModal.classList.remove('hidden');
        } else if (target === '#iosModal') {
          iosModal.classList.remove('hidden');
        }
      });
    });

    // Close Android modal
    function hideAndroidModal() {
      androidModal.classList.add('hidden');
    }
    closeAndroidModal.addEventListener('click', hideAndroidModal);
    understoodAndroid.addEventListener('click', hideAndroidModal);
    androidModalBackdrop.addEventListener('click', hideAndroidModal);

    // Close iOS modal
    function hideIosModal() {
      iosModal.classList.add('hidden');
    }
    closeIosModal.addEventListener('click', hideIosModal);
    understoodIos.addEventListener('click', hideIosModal);
    iosModalBackdrop.addEventListener('click', hideIosModal);

    // =============================================================================
    // MARQUEE BANNER - GSAP ANIMATION
    // =============================================================================
    (function() {
      const leftTrack = document.getElementById('mb-track-left-content');
      const rightTrack = document.getElementById('mb-track-right-content');
      
      if (!leftTrack || !rightTrack) return;

      // Get the width of one item group for seamless looping
      const leftItemGroup = leftTrack.querySelector('.mb-item-group');
      const rightItemGroup = rightTrack.querySelector('.mb-item-group');
      
      if (!leftItemGroup || !rightItemGroup) return;

      const leftWidth = leftItemGroup.offsetWidth;
      const rightWidth = rightItemGroup.offsetWidth;

      // Left track animation - scrolling left
      gsap.to(leftTrack, {
        x: -leftWidth,
        duration: 25,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % leftWidth)
        }
      });

      // Right track animation - scrolling right (reverse)
      gsap.set(rightTrack, { x: -rightWidth });
      gsap.to(rightTrack, {
        x: 0,
        duration: 25,
        ease: 'none',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % rightWidth)
        }
      });

      // Pause on hover
      const leftContainer = document.querySelector('.mb-track-left');
      const rightContainer = document.querySelector('.mb-track-right');

      if (leftContainer) {
        leftContainer.addEventListener('mouseenter', () => {
          gsap.globalTimeline.pause();
        });
        leftContainer.addEventListener('mouseleave', () => {
          gsap.globalTimeline.resume();
        });
      }

      if (rightContainer) {
        rightContainer.addEventListener('mouseenter', () => {
          gsap.globalTimeline.pause();
        });
        rightContainer.addEventListener('mouseleave', () => {
          gsap.globalTimeline.resume();
        });
      }
    })();


