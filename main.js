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

  // 2.7 FLAGSHIP 5-PRODUCT SHOWCASE & SPECIFICATION LAB
  const featTitle = document.getElementById('feat-title');
  const featWhat = document.getElementById('feat-what');
  const featWhy = document.getElementById('feat-why');
  const featUsecases = document.getElementById('feat-usecases');
  const featImg = document.getElementById('feat-main-img');
  const featTag = document.getElementById('feat-tag');
  const featCounter = document.getElementById('feat-counter');
  const featViewBtn = document.getElementById('feat-view-btn');
  const featRfqBtn = document.getElementById('feat-rfq-btn');
  const featPrevBtn = document.getElementById('feat-prev');
  const featNextBtn = document.getElementById('feat-next');
  const thumbSwitchBtns = document.querySelectorAll('.thumb-switch-btn');
  const hotspotTop = document.querySelector('.featured-visual-stage .hotspot-top');
  const hotspotBottom = document.querySelector('.featured-visual-stage .hotspot-bottom');
  const hotspotRight = document.querySelector('.featured-visual-stage .hotspot-right');

  const flagshipProducts = [
    {
      title: "Hydraulic Cylinders",
      tag: "Flagship Vertical 01",
      whatIsIt: "The primary linear actuator of heavy industry. It converts pressurized hydraulic fluid into immense directional mechanical force to push, pull, lift, press, or hold heavy payloads up to hundreds of tons.",
      whyNeedIt: "Electric motors cannot generate multi-ton linear thrust in compact spaces without massive gearboxes and motor burnout. Hydraulic cylinders deliver unmatched power density, smooth speed regulation, zero slippage under load, and extreme shock resistance.",
      useCases: [
        "Stamping & Forging Presses",
        "Scissor Lifts & Elevators",
        "Automotive Assembly Jigs",
        "Earthmoving & Crane Booms",
        "Dam Floodgates & Steering"
      ],
      img: "assets/images/featured.jpg",
      link: "products.html#cat-cylinders",
      categoryKey: "cylinders",
      btnText: "View Cylinders Catalogue →",
      h1: { pin: "Hard Chrome Rod", title: "Piston Rod Finish", desc: "EN8/EN9 induction-hardened alloy with 25µm hard chrome plating. Ra < 0.2µm." },
      h2: { pin: "Precision Honed Barrel", title: "Honed Cylinder Tube", desc: "St52 / E355 micro-honed steel barrel, ISO H8 bore tolerance, 450 Bar burst rating." },
      h3: { pin: "Forged Clevis End", title: "Heavy Mount Clevis", desc: "Forged carbon steel pivot mounting with spherical bearing for high-shock cyclic loading." }
    },
    {
      title: "Hydraulic Power Packs",
      tag: "Flagship Vertical 02",
      whatIsIt: "The centralized 'heart' of any hydraulic circuit. An integrated assembly comprising an oil reservoir, high-pressure pump, electric motor, fluid filtration system, and directional valve manifolds.",
      whyNeedIt: "Industrial automation requires a steady, filtered, and pressure-regulated source of fluid power to drive multiple cylinders and hydraulic motors simultaneously without heat buildup, fluid contamination, or pressure drops.",
      useCases: [
        "CNC Machine Clamping Systems",
        "Recycling Balers & Compactors",
        "Steel Mill Roll Stands",
        "Automated Production Lines",
        "Heavy Marine Cranes & Winches"
      ],
      img: "assets/images/prod_power_pack.jpg",
      link: "products.html#cat-power-packs",
      categoryKey: "power-packs",
      btnText: "View Power Packs →",
      h1: { pin: "Submerged Pump Motor", title: "Submerged Drive", desc: "Heavy-duty electric motor with quiet submerged high-pressure piston/vane pump." },
      h2: { pin: "Integrated Manifold", title: "CNC Manifold Block", desc: "Precision steel manifold with cartridge relief valves and multi-station solenoid control." },
      h3: { pin: "Fluid Filtration", title: "10-Micron Filtration", desc: "High-efficiency return line filtration with visual contamination clogging gauge." }
    },
    {
      title: "Hydraulic Industrial Presses",
      tag: "Flagship Vertical 03",
      whatIsIt: "Rigid heavy-duty machine frames (Four-Column or H-Frame) utilizing concentrated hydraulic force to shape, stamp, pierce, bend, mould, or compress metals, plastics, and composites.",
      whyNeedIt: "Mechanical flywheel presses deliver fixed tonnage only at bottom dead center and cannot hold dwell pressure. Hydraulic presses deliver full rated tonnage throughout the entire stroke with adjustable pressing speed, pressure-hold timers, and complete overload safety.",
      useCases: [
        "Automotive Sheet Body Stamping",
        "Rubber & Composite Moulding",
        "Shaft & Bearing Straightening",
        "Deep Drawing & Coining",
        "Powder Metallurgy Compaction"
      ],
      img: "assets/images/prod_press.jpg",
      link: "products.html#cat-presses",
      categoryKey: "presses",
      btnText: "View Presses Catalogue →",
      h1: { pin: "Solid Steel Monolith", title: "Heavy Rigid Frame", desc: "Stress-relieved monolithic steel structure designed for zero bed deflection under tonnage." },
      h2: { pin: "Forged Main Ram", title: "Cylinder Assembly", desc: "Forged alloy hydraulic ram cylinder with dual bronze guide bushings." },
      h3: { pin: "PLC Console Control", title: "Digital Automation", desc: "Programmable stroke positioning, pressure hold timers, and safety light curtain interlocks." }
    },
    {
      title: "Hydraulic Scissor & Goods Lifts",
      tag: "Flagship Vertical 04",
      whatIsIt: "Heavy-duty vertical elevation platforms engineered with criss-cross mechanical pantograph arms actuated by synchronized hydraulic cylinders to move freight and personnel across elevations.",
      whyNeedIt: "Eliminates dangerous manual pallet lifting and severe ergonomic spinal injuries. Far more cost-effective and flexible than permanent civil building elevators, requiring minimal or zero pit excavation while lifting up to 20 Tons safely.",
      useCases: [
        "Mezzanine Floor Pallet Transfer",
        "Automotive Assembly Line Ergonomics",
        "Warehouse Loading Dock Transfers",
        "Heavy Machinery Maintenance Pits",
        "Inter-Floor Industrial Freight"
      ],
      img: "assets/images/prod_lifts.jpg",
      link: "products.html#cat-lifts",
      categoryKey: "lifts",
      btnText: "View Scissor Lifts →",
      h1: { pin: "Heavy Scissor Linkage", title: "Structural Scissors", desc: "High-tensile plate steel scissor arms with greasable hardened pivot bushings." },
      h2: { pin: "Twin Lift Cylinders", title: "Synchronized Hoists", desc: "Dual hydraulic lifting cylinders equipped with velocity fuse safety valves." },
      h3: { pin: "Safety Interlock Base", title: "Perimeter Safety", desc: "Anti-pinch safety skirt, overload relief, and mechanical maintenance prop struts." }
    },
    {
      title: "Dock Levelers & Material Handling",
      tag: "Flagship Vertical 05",
      whatIsIt: "Hydraulic loading bay bridges that span the gap and height differential between factory loading docks and variable truck or container beds (Model A 7810 FH).",
      whyNeedIt: "Allows forklifts, pallet trucks, and motorized hand trucks to roll directly into shipping containers without ramps. Reduces truck loading/unloading turn-around time by 75%, protects cargo from drops, and eliminates dock edge drop-off hazards.",
      useCases: [
        "FMCG Logistics & Cold Stores",
        "Automotive Parts Receiving Bays",
        "Export Container Cargo Stuffing",
        "Heavy Machinery Dispatch Terminals",
        "E-Commerce Distribution Centers"
      ],
      img: "assets/images/prod_material_handling.jpg",
      link: "products.html#cat-material-handling",
      categoryKey: "material-handling",
      btnText: "View Dock Equipment →",
      h1: { pin: "15-Ton Tear Plate", title: "Reinforced Deck", desc: "Anti-slip chequered steel platform supported by heavy longitudinal structural I-beams." },
      h2: { pin: "Automatic Lip Cylinder", title: "Telescopic Lip Drive", desc: "Independent hydraulic lip cylinder for smooth transition onto truck cargo beds." },
      h3: { pin: "Safety Velocity Fuse", title: "Emergency Lock", desc: "Automatic hydraulic lock prevents platform freefall if truck departs prematurely." }
    }
  ];

  let currentFlagshipIndex = 0;

  function renderFlagship(index) {
    const item = flagshipProducts[index];
    if (!item) return;

    currentFlagshipIndex = index;

    if (featCounter) featCounter.textContent = `0${index + 1} / 05`;
    if (featTag) featTag.textContent = item.tag;

    // Smooth transition
    if (featImg) {
      featImg.style.opacity = '0';
      featImg.style.transform = 'scale(0.96)';
    }

    setTimeout(() => {
      if (featTitle) featTitle.textContent = item.title;
      if (featWhat) featWhat.textContent = item.whatIsIt;
      if (featWhy) featWhy.textContent = item.whyNeedIt;
      if (featUsecases && Array.isArray(item.useCases)) {
        featUsecases.innerHTML = item.useCases.map(uc => `<span class="use-case-pill">${uc}</span>`).join('');
      }
      if (featImg) {
        featImg.src = item.img;
        featImg.style.opacity = '1';
        featImg.style.transform = 'scale(1)';
      }
      if (featViewBtn) {
        featViewBtn.href = item.link;
        featViewBtn.innerHTML = `${item.btnText}`;
      }
      if (featRfqBtn && item.categoryKey) {
        featRfqBtn.setAttribute('data-prefill', item.categoryKey);
      }

      // Update Hotspots
      if (hotspotTop) {
        hotspotTop.querySelector('.hotspot-pin').textContent = item.h1.pin;
        hotspotTop.querySelector('.hotspot-popover strong').textContent = item.h1.title;
        hotspotTop.querySelector('.hotspot-popover').childNodes[2].nodeValue = " " + item.h1.desc;
      }
      if (hotspotBottom) {
        hotspotBottom.querySelector('.hotspot-pin').textContent = item.h2.pin;
        hotspotBottom.querySelector('.hotspot-popover strong').textContent = item.h2.title;
        hotspotBottom.querySelector('.hotspot-popover').childNodes[2].nodeValue = " " + item.h2.desc;
      }
      if (hotspotRight) {
        hotspotRight.querySelector('.hotspot-pin').textContent = item.h3.pin;
        hotspotRight.querySelector('.hotspot-popover strong').textContent = item.h3.title;
        hotspotRight.querySelector('.hotspot-popover').childNodes[2].nodeValue = " " + item.h3.desc;
      }

      // Update button highlights
      thumbSwitchBtns.forEach((btn, bIdx) => {
        btn.classList.toggle('active', bIdx === index);
      });
    }, 180);
  }

  if (featPrevBtn) {
    featPrevBtn.addEventListener('click', () => {
      const newIdx = (currentFlagshipIndex - 1 + flagshipProducts.length) % flagshipProducts.length;
      renderFlagship(newIdx);
    });
  }

  if (featNextBtn) {
    featNextBtn.addEventListener('click', () => {
      const newIdx = (currentFlagshipIndex + 1) % flagshipProducts.length;
      renderFlagship(newIdx);
    });
  }

  thumbSwitchBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      renderFlagship(idx);
    });
  });

  // 2.8 INTERACTIVE HYDRAULIC TONNAGE & FORCE CALCULATOR
  const inputBore = document.getElementById('input-bore');
  const inputPressure = document.getElementById('input-pressure');
  const inputStroke = document.getElementById('input-stroke');

  const valBore = document.getElementById('val-bore');
  const valPressure = document.getElementById('val-pressure');
  const valStroke = document.getElementById('val-stroke');

  const outForce = document.getElementById('calc-force-out');
  const outVolume = document.getElementById('calc-volume-out');
  const outKn = document.getElementById('calc-kn-out');
  const calcQuoteBtn = document.getElementById('calc-quote-btn');

  function calculateHydraulics() {
    if (!inputBore || !inputPressure || !inputStroke) return;

    const bore = parseFloat(inputBore.value); // mm
    const pressure = parseFloat(inputPressure.value); // bar
    const stroke = parseFloat(inputStroke.value); // mm

    if (valBore) valBore.textContent = `${bore} mm`;
    if (valPressure) valPressure.textContent = `${pressure} Bar`;
    if (valStroke) valStroke.textContent = `${stroke} mm`;

    // Area in mm² = π * (D / 2)²
    const areaMm2 = Math.PI * Math.pow(bore / 2, 2);

    // Force in Newtons: 1 Bar = 0.1 N/mm² -> Force = Area * (Pressure * 0.1)
    const forceNewtons = areaMm2 * (pressure * 0.1);

    // Metric Tons: 1 Metric Ton = 9,806.65 N
    const forceTons = forceNewtons / 9806.65;

    // kN: Force in kN
    const forceKn = forceNewtons / 1000;

    // Volume in Litres: (Area in mm² * Stroke in mm) / 1,000,000
    const volumeLitres = (areaMm2 * stroke) / 1000000;

    if (outForce) outForce.textContent = `${forceTons.toFixed(1)} MT`;
    if (outVolume) outVolume.textContent = `${volumeLitres.toFixed(1)} L`;
    if (outKn) outKn.textContent = `${forceKn.toFixed(1)} kN`;
  }

  if (inputBore && inputPressure && inputStroke) {
    [inputBore, inputPressure, inputStroke].forEach(input => {
      input.addEventListener('input', calculateHydraulics);
    });
    calculateHydraulics(); // initial calculation
  }

  if (calcQuoteBtn) {
    calcQuoteBtn.addEventListener('click', () => {
      const bore = inputBore.value;
      const pressure = inputPressure.value;
      const stroke = inputStroke.value;
      const tons = outForce ? outForce.textContent : '';
      const specs = `Sized Cylinder Inquiry: Bore ${bore}mm, Stroke ${stroke}mm, Working Pressure ${pressure} Bar (Calculated Thrust: ${tons})`;
      openModal('cylinders', specs);
    });
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

});
