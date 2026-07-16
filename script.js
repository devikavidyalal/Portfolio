document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 10) {
      navbar.style.boxShadow = '0 10px 30px -18px rgba(36, 27, 34, 0.35)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  const sections = document.querySelectorAll('.section');
  const sectionLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        sectionLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => {
    if (section.id) sectionObserver.observe(section);
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { root: null, threshold: 0.1, rootMargin: '0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => revealObserver.observe(el));
});

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'flex';
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = 'none';
}

window.addEventListener('click', (event) => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.style.display = 'none';
    });
  }
});