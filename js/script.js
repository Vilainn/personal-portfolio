/* ===================================================
   PORTFOLIO WEBSITE - COMPLETE JAVASCRIPT
   With all improvements: Mobile menu, Progress bars, Dark mode, etc.
=================================================== */

console.log("🚀 Portfolio website loaded successfully!");

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM fully loaded and parsed");

  /* =========================================
        1. LOADING ANIMATION
    ========================================= */
  function initLoadingAnimation() {
    const loadingOverlay = document.getElementById("loading-overlay");

    if (!loadingOverlay) return;

    window.addEventListener("load", function () {
      setTimeout(function () {
        loadingOverlay.classList.add("hidden");

        setTimeout(function () {
          loadingOverlay.style.display = "none";
        }, 500);
      }, 500);
    });
  }

  /* =========================================
        2. MOBILE NAVIGATION MENU
    ========================================= */
  function initMobileNavigation() {
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    if (!hamburger || !navLinks) return;

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);

    // Toggle menu
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = navLinks.classList.contains("active")
        ? "hidden"
        : "";
    });

    // Close menu when clicking overlay
    overlay.addEventListener("click", function () {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });

    // Close menu when clicking a link (for mobile)
    const links = navLinks.querySelectorAll(".nav-link");
    links.forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove("active");
          hamburger.classList.remove("active");
          overlay.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener("click", function (event) {
      if (
        window.innerWidth <= 768 &&
        !event.target.closest(".nav-links") &&
        !event.target.closest(".hamburger")
      ) {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  /* =========================================
        3. ACTIVE NAVIGATION LINK HIGHLIGHTING
    ========================================= */
  function setActiveNavLink() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      link.classList.remove("active");

      const linkHref = link.getAttribute("href");

      if (
        linkHref === currentPage ||
        (currentPage === "" && linkHref === "index.html") ||
        (currentPage === "/" && linkHref === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  }

  /* =========================================
        4. CONTACT FORM VALIDATION
    ========================================= */
  function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    const alertBox = document.getElementById("alertBox");

    if (!contactForm || !alertBox) return;

    console.log("✅ Setting up contact form validation");

    // FORM SUBMIT EVENT
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Clear previous errors
      clearErrors();

      // Validate form
      if (validateForm(name, email, message)) {
        showSuccessMessage(name);
        contactForm.reset();
        updateCharCounter();
      }
    });

    // Clear all error messages
    function clearErrors() {
      const errorElements = document.querySelectorAll(".error-message");
      errorElements.forEach((error) => {
        error.textContent = "";
        error.style.display = "none";
      });

      const inputs = contactForm.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.style.borderColor = "#e0e0e0";
      });
    }

    // Validate the form
    function validateForm(name, email, message) {
      let isValid = true;

      // Validate name
      if (name === "") {
        showError("nameError", "Please enter your name");
        document.getElementById("name").style.borderColor = "#e74c3c";
        isValid = false;
      } else if (name.length < 2) {
        showError("nameError", "Name must be at least 2 characters");
        document.getElementById("name").style.borderColor = "#e74c3c";
        isValid = false;
      }

      // Validate email
      if (email === "") {
        showError("emailError", "Please enter your email");
        document.getElementById("email").style.borderColor = "#e74c3c";
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError("emailError", "Please enter a valid email address");
        document.getElementById("email").style.borderColor = "#e74c3c";
        isValid = false;
      }

      // Validate message
      if (message === "") {
        showError("messageError", "Please enter your message");
        document.getElementById("message").style.borderColor = "#e74c3c";
        isValid = false;
      } else if (message.length < 10) {
        showError("messageError", "Message should be at least 10 characters");
        document.getElementById("message").style.borderColor = "#e74c3c";
        isValid = false;
      }

      return isValid;
    }

    // Check if email is valid
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Show error message
    function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
        errorElement.style.color = "#e74c3c";
        errorElement.style.marginTop = "5px";
      }
    }

    // Show success message
    function showSuccessMessage(userName) {
      alertBox.innerHTML = `
                <div class="success-message">
                    <div class="success-icon">✓</div>
                    <div class="success-content">
                        <h3>Message Sent Successfully!</h3>
                        <p>Thank you ${userName}, I'll get back to you soon.</p>
                        <small>You can also reach me at: infor.masai.org@gmail.com</small>
                    </div>
                </div>
            `;

      alertBox.style.display = "block";
      alertBox.style.backgroundColor = "#2ecc71";
      alertBox.style.color = "white";
      alertBox.style.padding = "20px";
      alertBox.style.borderRadius = "8px";
      alertBox.style.margin = "20px 0";
      alertBox.style.borderLeft = "5px solid #27ae60";
      alertBox.style.animation = "fadeIn 0.5s ease";

      setTimeout(function () {
        alertBox.style.opacity = "0";
        alertBox.style.transform = "translateY(-10px)";
        alertBox.style.transition = "opacity 0.5s, transform 0.5s";

        setTimeout(function () {
          alertBox.style.display = "none";
          alertBox.style.opacity = "1";
          alertBox.style.transform = "translateY(0)";
        }, 500);
      }, 5000);
    }

    // Clear errors when user starts typing
    const formInputs = contactForm.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("input", function () {
        const errorId = this.id + "Error";
        const errorElement = document.getElementById(errorId);

        if (errorElement) {
          errorElement.textContent = "";
          errorElement.style.display = "none";
        }

        this.style.borderColor = "#e0e0e0";
      });
    });

    // Add focus effects
    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.style.borderColor = "#3498db";
        this.style.boxShadow = "0 0 0 3px rgba(52, 152, 219, 0.2)";
      });

      input.addEventListener("blur", function () {
        this.style.boxShadow = "none";
      });
    });
  }

  /* =========================================
        5. CHARACTER COUNTER FOR CONTACT FORM
    ========================================= */
  function initCharacterCounter() {
    const messageField = document.getElementById("message");
    const charCount = document.getElementById("char-count");
    const charCounter = document.querySelector(".char-counter");

    if (!messageField || !charCount || !charCounter) return;

    function updateCharCounter() {
      const length = messageField.value.length;
      charCount.textContent = length;

      if (length > 450) {
        charCounter.classList.add("error");
        charCounter.classList.remove("warning");
      } else if (length > 400) {
        charCounter.classList.add("warning");
        charCounter.classList.remove("error");
      } else {
        charCounter.classList.remove("warning", "error");
      }
    }

    messageField.addEventListener("input", updateCharCounter);
    updateCharCounter(); // Initial update
  }

  /* =========================================
        6. PROGRESS BARS ANIMATION
    ========================================= */
  function animateProgressBars() {
    const progressBars = document.querySelectorAll(".progress-fill");

    if (progressBars.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const width = entry.target.getAttribute("data-width") || "0";
            entry.target.style.width = width + "%";
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    progressBars.forEach((bar) => {
      observer.observe(bar);
    });
  }

  /* =========================================
        7. BACK TO TOP BUTTON
    ========================================= */
  function initBackToTop() {
    const backToTopBtn = document.getElementById("back-to-top");

    if (!backToTopBtn) return;

    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================================
        8. DARK/LIGHT MODE TOGGLE
    ========================================= */
  function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle-btn");
    const themeIcon = toggleBtn?.querySelector(".theme-icon");
    const themeText = toggleBtn?.querySelector(".theme-text");

    if (!toggleBtn) return;

    // Check for saved theme or prefer-color-scheme
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.body.classList.add("dark-mode");
      if (themeIcon) themeIcon.textContent = "☀️";
      if (themeText) themeText.textContent = "Light Mode";
    }

    // Toggle theme
    toggleBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        if (themeIcon) themeIcon.textContent = "☀️";
        if (themeText) themeText.textContent = "Light Mode";
      } else {
        localStorage.setItem("theme", "light");
        if (themeIcon) themeIcon.textContent = "🌙";
        if (themeText) themeText.textContent = "Dark Mode";
      }
    });
  }

  /* =========================================
        9. SCROLL ANIMATIONS
    ========================================= */
  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      "main section, .card, .page-link",
    );

    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    animatedElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(element);
    });
  }

  /* =========================================
        INITIALIZE EVERYTHING
    ========================================= */
  initLoadingAnimation();
  initMobileNavigation();
  setActiveNavLink();
  initContactForm();
  initCharacterCounter();
  animateProgressBars();
  initBackToTop();
  initThemeToggle();
  initScrollAnimations();

  /* =========================================
        CONSOLE GREETING
    ========================================= */
  console.log(
    "%c👋 Hello! Thanks for checking out my portfolio.",
    "color: #3498db; font-size: 14px; font-weight: bold;",
  );
  console.log(
    "%cThis website is part of my university web development assessment.",
    "color: #2c3e50; font-size: 12px;",
  );
  console.log(
    "%c— Dejohn (John Masai Musyoki)",
    "color: #e74c3c; font-size: 12px; font-style: italic;",
  );
});

/* =========================================
    WINDOW LOAD EVENT FOR FINAL TOUCHES
========================================= */
window.addEventListener("load", function () {
  console.log("✅ All page resources loaded");

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });
});
