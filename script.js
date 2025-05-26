document.addEventListener('DOMContentLoaded', function() {

  // Smooth scrolling for internal links
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60, // Adjust for fixed navbar height
          behavior: 'smooth'
        });
      }
      // Close navbar on mobile after click
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting on scroll
    let currentSection = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 70) { // 70 is navbar height + little offset
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });

  });

  // Scroll animations
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Optional: stop observing once animated
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is visible
  });

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Typewriter effect for main headline
  const headline = document.getElementById('main-headline');
  if (headline) {
    const text = headline.innerText;
    headline.innerText = '';
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        headline.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100); // Adjust speed here
      } else {
        headline.classList.add('finished-typing'); // Optional: for further styling
      }
    }
    // Start typing after a short delay to let page load
    setTimeout(typeWriter, 500);
  }

});