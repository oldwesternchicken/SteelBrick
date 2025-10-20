document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('current-year').textContent = new Date().getFullYear();

  const header = document.querySelector('.header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.main-nav');
  let activeSection = 'home';

  document.querySelectorAll('[data-section]').forEach(button => {
    button.addEventListener('click', (e) => {
      const sectionId = e.target.dataset.section;
      scrollToSection(sectionId);
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
      }
    });
  });

  mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        if (activeSection !== sectionId) {
          activeSection = sectionId;
          updateActiveNavButton(sectionId);
        }
      }
    });
  }

  function updateActiveNavButton(sectionId) {
    document.querySelectorAll('.main-nav button').forEach(button => {
      button.classList.remove('active');
      if (button.dataset.section === sectionId) {
        button.classList.add('active');
      }
    });
  }

  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });

      document.querySelectorAll('section').forEach(s => {
        s.classList.remove('active');
      });
      section.classList.add('active');

      activeSection = sectionId;
      updateActiveNavButton(sectionId);
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
  document.getElementById('home').classList.add('active');
});
