/* ==========================================================================
   DHANASREE HYDRAULICS & EQUIPMENTS — MAIN SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 0. REACT BITS: TEXTTYPE COMPONENT INTEGRATION
  const typingContainer = document.getElementById('hero-typing-element');
  if (typingContainer) {
    const contentEl = typingContainer.querySelector('.text-type__content');
    const cursorEl = typingContainer.querySelector('.text-type__cursor');

    // Props configuration matching <TextType />
    const texts = ["Motion", "Precision", "Power", "Solutions", "Hydraulics"];
    const typingSpeed = 80;
    const deletingSpeed = 35;
    const pauseDuration = 1600;
    const initialDelay = 400;

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let displayedText = '';

    // Cursor blinking via GSAP (exact React Bits implementation)
    if (cursorEl && typeof gsap !== 'undefined') {
      gsap.set(cursorEl, { opacity: 1 });
      gsap.to(cursorEl, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }

    const typeStep = () => {
      const currentSentence = texts[currentTextIndex];

      if (isDeleting) {
        if (displayedText === '') {
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % texts.length;
          currentCharIndex = 0;
          setTimeout(typeStep, 350);
          return;
        } else {
          displayedText = displayedText.slice(0, -1);
          if (contentEl) contentEl.textContent = displayedText;
          setTimeout(typeStep, deletingSpeed);
          return;
        }
      } else {
        if (currentCharIndex < currentSentence.length) {
          displayedText += currentSentence[currentCharIndex];
          currentCharIndex++;
          if (contentEl) contentEl.textContent = displayedText;
          setTimeout(typeStep, typingSpeed);
          return;
        } else {
          setTimeout(() => {
            isDeleting = true;
            typeStep();
          }, pauseDuration);
          return;
        }
      }
    };

    setTimeout(typeStep, initialDelay);
  }

  // 1. INFINITY BAND SCROLL CONTROLS (HOMEPAGE)
  const infiniteTrack = document.getElementById('infinite-products-track');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (infiniteTrack && prevBtn && nextBtn) {
    let isPaused = false;
    let isReversed = false;

    prevBtn.addEventListener('click', () => {
      isReversed = !isReversed;
      infiniteTrack.style.animationDirection = isReversed ? 'reverse' : 'normal';
      prevBtn.style.backgroundColor = isReversed ? 'var(--c-flame)' : '';
      prevBtn.style.color = isReversed ? 'var(--c-abyssal)' : '';
    });

    nextBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      infiniteTrack.style.animationPlayState = isPaused ? 'paused' : 'running';
      nextBtn.style.backgroundColor = isPaused ? 'var(--c-flame)' : '';
      nextBtn.style.color = isPaused ? 'var(--c-abyssal)' : '';
    });
  }

  // 2. CAPABILITY VERTICAL TABS SWITCHER (AUTO-ROTATING & INTERACTIVE)
  const capSection = document.getElementById('capabilities');
  const capTabs = document.querySelectorAll('.cap-tab-item');
  const capImg = document.getElementById('cap-dynamic-img');
  const capTitle = document.querySelector('.capability-title');
  const capDesc = document.querySelector('.capability-desc');
  const metricBlocks = document.querySelectorAll('.capability-metrics .metric-block');

  const capData = {
    lift: {
      title: 'Precision Scissor & Goods Lifts.',
      desc: 'Engineered vertical elevation systems for heavy industrial payloads, factory logistics, and automotive maintenance.',
      img: 'assets/images/prod_lifts.jpg',
      metrics: [
        { num: '20T', label: 'Max Payload' },
        { num: '100%', label: 'Fail-Safe Safety' },
        { num: 'Custom', label: 'Platform & Stroke' }
      ]
    },
    press: {
      title: 'Built For Demanding Applications.',
      desc: 'Reliable hydraulic systems and industrial equipment designed to perform with precision in demanding manufacturing environments.',
      img: 'assets/images/capability.jpg',
      metrics: [
        { num: '5,000T', label: 'Pressing Capacity' },
        { num: '350 BAR', label: 'Hydraulic Pressure' },
        { num: 'PLC', label: 'Precision Control' }
      ]
    },
    handle: {
      title: 'Heavy Material Flow & Stackers.',
      desc: 'High-capacity automated dock levelers, electric stackers, and precision hydraulic jacks for safe warehouse material handling.',
      img: 'assets/images/prod_material_handling.jpg',
      metrics: [
        { num: '15T', label: 'Dock Leveling' },
        { num: 'Electric', label: 'Powered Drive' },
        { num: '12 MOS', label: 'Standard Warranty' }
      ]
    },
    convey: {
      title: 'Integrated Industrial Conveyors.',
      desc: 'Heavy-duty powered roller conveyors and industrial belt handling systems engineered for high-throughput assembly lines.',
      img: 'assets/images/prod_conveyors.jpg',
      metrics: [
        { num: 'Continuous', label: 'High Throughput' },
        { num: 'Powered', label: 'Roller & Belt' },
        { num: 'Modular', label: 'Plant Integration' }
      ]
    }
  };

  if (capTabs.length > 0 && capImg) {
    const capKeys = ['lift', 'press', 'handle', 'convey'];
    let currentIndex = 0;
    const switchDuration = 2400; // 2.4s per tab for readable, energetic cadence
    let progressStartTime = Date.now();
    let isCapPaused = false;
    let animFrameId = null;

    function applyCapability(key) {
      const data = capData[key];
      if (!data) return;

      // Update active class
      capTabs.forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-cap') === key);
      });

      // Smooth crossfade image
      capImg.style.opacity = '0';
      capImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        capImg.src = data.img;
        if (capTitle) capTitle.textContent = data.title;
        if (capDesc) capDesc.textContent = data.desc;

        // Update metrics
        if (metricBlocks.length >= 3 && data.metrics) {
          data.metrics.forEach((m, idx) => {
            const numEl = metricBlocks[idx].querySelector('.metric-num');
            const labelEl = metricBlocks[idx].querySelector('.metric-label');
            if (numEl) numEl.textContent = m.num;
            if (labelEl) labelEl.textContent = m.label;
          });
        }

        capImg.style.opacity = '1';
        capImg.style.transform = 'scale(1)';
      }, 180);
    }

    // Progress bar loop
    function updateProgress() {
      if (!isCapPaused) {
        const elapsed = Date.now() - progressStartTime;
        const progressPct = Math.min(100, (elapsed / switchDuration) * 100);

        // Update progress fill on active tab
        capTabs.forEach(tab => {
          const fill = tab.querySelector('.cap-tab-fill');
          if (fill) {
            if (tab.classList.contains('active')) {
              fill.style.width = `${progressPct}%`;
            } else {
              fill.style.width = '0%';
            }
          }
        });

        if (elapsed >= switchDuration) {
          currentIndex = (currentIndex + 1) % capKeys.length;
          applyCapability(capKeys[currentIndex]);
          progressStartTime = Date.now();
        }
      } else {
        progressStartTime = Date.now(); // freeze progress while paused
      }

      animFrameId = requestAnimationFrame(updateProgress);
    }

    // Start auto loop
    applyCapability(capKeys[currentIndex]);
    animFrameId = requestAnimationFrame(updateProgress);

    // Pause on hover
    if (capSection) {
      capSection.addEventListener('mouseenter', () => { isCapPaused = true; });
      capSection.addEventListener('mouseleave', () => { 
        isCapPaused = false; 
        progressStartTime = Date.now();
      });
    }

    // Manual click override
    capTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        currentIndex = index;
        progressStartTime = Date.now();
        applyCapability(capKeys[currentIndex]);
      });
    });
  }

  // 2.5 INDUSTRY SHOWROOM EXPANDING ACCORDION
  const industryPanels = document.querySelectorAll('.industry-panel');
  if (industryPanels.length > 0) {
    industryPanels.forEach(panel => {
      // Expand on click / tap
      panel.addEventListener('click', (e) => {
        // If clicking a link/button inside the expanded panel, let it navigate
        if (e.target.closest('a') || e.target.closest('button')) return;
        industryPanels.forEach(p => p.classList.remove('active'));
        panel.classList.add('active');
      });

      // Expand on desktop mouseenter
      panel.addEventListener('mouseenter', () => {
        if (window.innerWidth > 900) {
          industryPanels.forEach(p => p.classList.remove('active'));
          panel.classList.add('active');
        }
      });
    });
  }

  // 2.6 CARD SWAP COMPONENT (ENGINEERING CAPABILITY)
  const cardSwapContainer = document.getElementById('capability-card-swap');
  if (cardSwapContainer && typeof gsap !== 'undefined') {
    const cards = Array.from(cardSwapContainer.querySelectorAll('.capability-swap-card'));
    const cardDistance = parseFloat(cardSwapContainer.dataset.cardDistance || '45');
    const verticalDistance = parseFloat(cardSwapContainer.dataset.verticalDistance || '50');
    const skewAmount = parseFloat(cardSwapContainer.dataset.skew || '5');
    const delay = parseFloat(cardSwapContainer.dataset.delay || '4500');

    const config = {
      ease: 'elastic.out(0.6, 0.9)',
      durDrop: 1.8,
      durMove: 1.8,
      durReturn: 1.8,
      promoteOverlap: 0.9,
      returnDelay: 0.05
    };

    let order = Array.from({ length: cards.length }, (_, i) => i);
    let tlRef = null;
    let intervalId = null;

    const makeSlot = (i, distX, distY, total) => ({
      x: i * distX,
      y: -i * distY,
      z: -i * distX * 1.5,
      zIndex: total - i
    });

    const placeNow = (el, slot, skew) =>
      gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skew,
        transformOrigin: 'center center',
        zIndex: slot.zIndex,
        force3D: true
      });

    // Initial 3D placement of cards
    const total = cards.length;
    cards.forEach((card, i) => placeNow(card, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.length < 2) return;

      const [front, ...rest] = order;
      const elFront = cards[front];
      const tl = gsap.timeline();
      tlRef = tl;

      tl.to(elFront, {
        y: '+=480',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = cards[idx];
        const slot = makeSlot(i, cardDistance, verticalDistance, cards.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.12}`
        );
      });

      const backSlot = makeSlot(cards.length - 1, cardDistance, verticalDistance, cards.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order = [...rest, front];
      });
    };

    // Auto-swap interval
    intervalId = setInterval(swap, delay);

    // Pause on hover
    cardSwapContainer.addEventListener('mouseenter', () => {
      if (tlRef) tlRef.pause();
      clearInterval(intervalId);
    });

    cardSwapContainer.addEventListener('mouseleave', () => {
      if (tlRef) tlRef.play();
      intervalId = setInterval(swap, delay);
    });

    // Swap on card click
    cards.forEach(card => {
      card.addEventListener('click', () => {
        swap();
      });
    });
  }

  // 2.7 FLOWING MENU COMPONENT (OUR PROCESS)
  const flowingMenuContainer = document.getElementById('process-flowing-menu');
  if (flowingMenuContainer && typeof gsap !== 'undefined') {
    const menuItems = flowingMenuContainer.querySelectorAll('.menu__item');
    const animationDefaults = { duration: 0.6, ease: 'expo.out' };

    const distMetric = (x, y, x2, y2) => {
      const xDiff = x - x2;
      const yDiff = y - y2;
      return xDiff * xDiff + yDiff * yDiff;
    };

    const findClosestEdge = (mouseX, mouseY, width, height) => {
      const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
      const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
      return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
    };

    menuItems.forEach(item => {
      const marquee = item.querySelector('.marquee');
      const marqueeInner = item.querySelector('.marquee__inner');
      const speed = parseFloat(item.dataset.speed || '15');

      if (!marquee || !marqueeInner) return;

      // Animate marquee continuously for seamless infinite loop
      const setupMarquee = () => {
        const firstPart = marqueeInner.querySelector('.marquee__part');
        if (!firstPart) return;
        const partWidth = firstPart.offsetWidth;
        if (partWidth === 0) return;

        gsap.to(marqueeInner, {
          x: -partWidth,
          duration: speed,
          ease: 'none',
          repeat: -1
        });
      };

      setTimeout(setupMarquee, 100);

      // Direction-aware hover effect using GSAP
      item.addEventListener('mouseenter', ev => {
        const rect = item.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const edge = findClosestEdge(x, y, rect.width, rect.height);

        gsap.timeline({ defaults: animationDefaults })
          .set(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
          .set(marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
          .to([marquee, marqueeInner], { y: '0%' }, 0);
      });

      item.addEventListener('mouseleave', ev => {
        const rect = item.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        const edge = findClosestEdge(x, y, rect.width, rect.height);

        gsap.timeline({ defaults: animationDefaults })
          .to(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
          .to(marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0);
      });
    });
  }

  // 2.8 ACCORDION GALLERY (INDUSTRIES WE SUPPORT)
  // Configurable parameters: defaultIndex = 2, expandRatio = 0.52, trigger = 'hover'
  const accordionGallery = document.getElementById('industry-showroom');
  if (accordionGallery) {
    const panels = Array.from(accordionGallery.querySelectorAll('.industry-panel'));
    const defaultIndex = parseInt(accordionGallery.dataset.defaultIndex || '2', 10);
    const trigger = accordionGallery.dataset.trigger || 'hover';
    let leaveTimer = null;

    function setActivePanel(index) {
      if (index < 0 || index >= panels.length) return;
      panels.forEach((panel, idx) => {
        const isActive = idx === index;
        panel.classList.toggle('active', isActive);
        panel.setAttribute('aria-expanded', isActive ? 'true' : 'false');
      });
    }

    panels.forEach((panel, idx) => {
      if (trigger === 'hover') {
        panel.addEventListener('mouseenter', () => {
          if (leaveTimer) {
            clearTimeout(leaveTimer);
            leaveTimer = null;
          }
          setActivePanel(idx);
        });
      }

      panel.addEventListener('click', () => {
        setActivePanel(idx);
      });

      panel.addEventListener('focus', () => {
        setActivePanel(idx);
      });
    });

    accordionGallery.addEventListener('mouseleave', () => {
      leaveTimer = setTimeout(() => {
        setActivePanel(defaultIndex);
      }, 400);
    });

    // Initialize with defaultIndex (item 2: Warehousing & Logistics)
    setActivePanel(defaultIndex);
  }

  // 3. INTERACTIVE RFQ MODAL
  const modal = document.getElementById('rfq-modal');
  const openRfqBtns = document.querySelectorAll('.open-rfq-btn');
  const closeBtn = document.getElementById('modal-close');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const rfqForm = document.getElementById('rfq-modal-form');
  const rfqCategorySelect = document.getElementById('rfq-category');
  const toast = document.getElementById('toast-notice');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  function openModal(prefillCategory, prefillSpecs) {
    if (!modal) return;
    if (prefillCategory && rfqCategorySelect) {
      rfqCategorySelect.value = prefillCategory;
    }
    const specsInput = document.getElementById('rfq-specs');
    if (prefillSpecs && specsInput) {
      specsInput.value = prefillSpecs;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openRfqBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefill = btn.getAttribute('data-prefill') || '';
      openModal(prefill);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (rfqForm) {
    rfqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Thank you! Your quotation request has been received. Our sales engineering team will contact you shortly.');
      rfqForm.reset();
    });
  }

  // 4. CONTACT PAGE FORM HANDLER
  const contactForm = document.getElementById('contact-page-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your industrial inquiry has been submitted. Our team will review the specifications and respond.');
      contactForm.reset();
    });
  }

  // 5. PRODUCTS PAGE FILTERING
  const filterBtns = document.querySelectorAll('.filter-btn');
  const catalogCards = document.querySelectorAll('.catalog-item-card');

  if (filterBtns.length > 0 && catalogCards.length > 0) {
    function applyFilter(category) {
      filterBtns.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-filter') === category);
      });

      catalogCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-filter');
        applyFilter(cat);
      });
    });

    // Check URL hash on page load
    const hash = window.location.hash;
    if (hash && hash.startsWith('#cat-')) {
      const targetCat = hash.replace('#cat-', '');
      applyFilter(targetCat);
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
      }
    }
  }

  // 6. MOBILE MENU TOGGLE (PILL NAVBAR)
  const openMenu = document.getElementById('openMenu');
  const closeMenu = document.getElementById('closeMenu');
  const menu = document.getElementById('menu');

  if (openMenu && menu) {
    openMenu.addEventListener('click', () => {
      menu.classList.remove('max-md:w-0');
      menu.classList.add('max-md:w-full');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeMenu && menu) {
    closeMenu.addEventListener('click', () => {
      menu.classList.remove('max-md:w-full');
      menu.classList.add('max-md:w-0');
      document.body.style.overflow = '';
    });
  }

  // Also close mobile menu if a nav link is clicked
  if (menu) {
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('max-md:w-full');
        menu.classList.add('max-md:w-0');
        document.body.style.overflow = '';
      });
    });
  }

  // 7. ABOUT PAGE: STICKY SCROLL TIMELINE CONTROLLER
  const timelineTrack = document.getElementById('timeline-scroll-track');
  const timelineVerticalFill = document.getElementById('timeline-vertical-fill');
  const timelineCards = document.querySelectorAll('.story-scroll-timeline .timeline-card');
  const focalYear = document.getElementById('focal-year');
  const focalPhase = document.getElementById('focal-phase-badge');
  const focalTitle = document.getElementById('focal-title');
  const focalDesc = document.getElementById('focal-desc');
  const focalStepCount = document.getElementById('focal-step-count');
  const focalProgressFill = document.getElementById('focal-progress-fill');

  if (timelineTrack && timelineCards.length > 0) {
    let currentActiveIndex = -1;

    function updateStickyTimeline() {
      const viewportHeight = window.innerHeight;
      const trackRect = timelineTrack.getBoundingClientRect();
      const triggerLine = viewportHeight * 0.45;

      // 1. Calculate Vertical Line Progress Fill
      const totalTrackHeight = trackRect.height;
      const scrolledPast = triggerLine - trackRect.top;
      let linePercent = 0;
      if (scrolledPast > 0 && totalTrackHeight > 0) {
        linePercent = Math.min(100, Math.max(0, (scrolledPast / totalTrackHeight) * 100));
      }
      if (timelineVerticalFill) {
        timelineVerticalFill.style.height = `${linePercent}%`;
      }

      // 2. Identify Active Milestone Card
      let bestIndex = 0;
      let minDistance = Infinity;

      timelineCards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const distance = Math.abs(cardCenter - triggerLine);

        // Card that passed trigger line or is closest to triggerLine
        if (cardRect.top <= triggerLine + 60) {
          bestIndex = index;
        }
      });

      if (bestIndex !== currentActiveIndex) {
        currentActiveIndex = bestIndex;

        // Update card classes
        timelineCards.forEach((c, idx) => {
          if (idx === currentActiveIndex) {
            c.classList.add('active');
          } else {
            c.classList.remove('active');
          }
        });

        // Update Focal Card with Smooth Micro-Animation
        const activeCard = timelineCards[currentActiveIndex];
        if (activeCard) {
          const year = activeCard.getAttribute('data-year');
          const phase = activeCard.getAttribute('data-phase');
          const title = activeCard.getAttribute('data-title');
          const desc = activeCard.getAttribute('data-desc');
          const totalSteps = timelineCards.length;
          const currentStepNum = String(currentActiveIndex + 1).padStart(2, '0');
          const totalStepNum = String(totalSteps).padStart(2, '0');

          if (focalStepCount) focalStepCount.textContent = `${currentStepNum} / ${totalStepNum}`;
          if (focalPhase) focalPhase.textContent = phase;
          if (focalTitle) focalTitle.innerHTML = title;
          if (focalDesc) focalDesc.textContent = desc;

          if (focalProgressFill) {
            const stepPercent = ((currentActiveIndex + 1) / totalSteps) * 100;
            focalProgressFill.style.width = `${stepPercent}%`;
          }

          if (focalYear && focalYear.textContent !== year) {
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(focalYear, 
                { opacity: 0.2, y: -10, scale: 0.95 }, 
                { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
              );
            }
            focalYear.textContent = year;
          }
        }
      }
    }

    // Attach scroll and resize listeners with requestAnimationFrame throttling
    let isTicking = false;
    function onScroll() {
      if (!isTicking) {
        requestAnimationFrame(() => {
          updateStickyTimeline();
          isTicking = false;
        });
        isTicking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Allow clicking on any milestone card to scroll to it smoothly
    timelineCards.forEach((card) => {
      card.addEventListener('click', () => {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });

    // Run initial update on page load
    updateStickyTimeline();
  }

});
