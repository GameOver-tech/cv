const STORAGE_KEY = 'ai_portfolio_admin_state';

const DEFAULT_STATE = {
  heroName: 'Ali Hassan',
  heroRole: 'AI Developer | Web Developer | Ethical Hacker',
  heroProfileImage: '1.png',
  aboutText: 'A motivated and disciplined AI developer with strong skills in cybersecurity, web development, and digital innovation. I build intelligent systems, secure applications, and AI-driven experiences that deliver measurable results.',
  phone: '+92 310 2850365',
  email: 'alihassansoftware0786@gmail.com',
  whatsapp: 'https://wa.me/923102850365',
  skills: [
    { id: 'skill-1', name: 'Web Development', description: 'Responsive, blazing-fast frontends and scalable stacks built for production.' },
    { id: 'skill-2', name: 'AI Tools', description: 'GPT integration, automation, and custom intelligence for intelligent workflows.' },
    { id: 'skill-3', name: 'WordPress', description: 'Modern WordPress experiences with custom themes, motion, and plugin automation.' },
    { id: 'skill-4', name: 'Digital Marketing', description: 'Conversion-first campaigns, performance branding, and automation-driven growth.' },
    { id: 'skill-5', name: 'Ethical Hacking', description: 'Security-aware solutions and robust delivery for trusted digital platforms.' },
  ],
  projects: [
    { id: 'project-1', title: 'Neon AI Lab', description: 'A futuristic portfolio experience with glass surfaces, motion, and intelligent AI guidance.', image: '2.jpg', demoLink: '#contact' },
    { id: 'project-2', title: 'AI Dashboard', description: 'Design system for powerful analytics, user-focused interactions, and modern visuals.', image: '2.jpg', demoLink: '#contact' },
  ],
};

const state = { ...DEFAULT_STATE };
const dom = {};

window.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  bindEvents();
  loadState();
  renderAll();
  initCanvas();
  initParticles();
  animateParticles();
  initTextAnimation();
  initTypingText();
  initStatsCounter();
  initScrollReveal();
  initCursor();
});

function cacheElements() {
  dom.heroName = document.getElementById('typed-name');
  dom.heroRole = document.getElementById('typed-role');
  dom.heroImage = document.getElementById('hero-profile-image');
  dom.aboutTyping = document.getElementById('about-typing');
  dom.skillsGrid = document.getElementById('skills-grid');
  dom.projectsGrid = document.getElementById('projects-grid');
  dom.contactPhone = document.getElementById('contact-phone');
  dom.contactEmail = document.getElementById('contact-email');
  dom.contactWhatsapp = document.getElementById('contact-whatsapp');
  dom.contactForm = document.getElementById('contact-form');
  dom.heroSection = document.getElementById('hero');
  dom.heroFrame = document.querySelector('.hero-frame');
  dom.customCursor = document.getElementById('custom-cursor');
  dom.adminTrigger = document.getElementById('admin-trigger');
  dom.loginModal = document.getElementById('login-modal');
  dom.loginForm = document.getElementById('login-form');
  dom.loginClose = document.getElementById('login-close');
  dom.adminPassword = document.getElementById('admin-password');
  dom.adminDashboard = document.getElementById('admin-dashboard');
  dom.closeDashboard = document.getElementById('close-dashboard');
  dom.logoutBtn = document.getElementById('logout-btn');
  dom.siteForm = document.getElementById('site-form');
  dom.adminHeroName = document.getElementById('admin-hero-name');
  dom.adminHeroRole = document.getElementById('admin-hero-role');
  dom.adminProfileImage = document.getElementById('admin-profile-image');
  dom.adminAboutText = document.getElementById('admin-about-text');
  dom.adminPhone = document.getElementById('admin-phone');
  dom.adminEmail = document.getElementById('admin-email');
  dom.adminWhatsapp = document.getElementById('admin-whatsapp');
  dom.skillForm = document.getElementById('skill-form');
  dom.adminSkillName = document.getElementById('admin-skill-name');
  dom.adminSkillDesc = document.getElementById('admin-skill-desc');
  dom.adminSkillId = document.getElementById('admin-skill-id');
  dom.skillResetBtn = document.getElementById('skill-reset-btn');
  dom.skillsList = document.getElementById('skills-list');
  dom.projectForm = document.getElementById('project-form');
  dom.adminProjectTitle = document.getElementById('admin-project-title');
  dom.adminProjectDesc = document.getElementById('admin-project-desc');
  dom.adminProjectImage = document.getElementById('admin-project-image');
  dom.adminProjectLink = document.getElementById('admin-project-link');
  dom.adminProjectId = document.getElementById('admin-project-id');
  dom.projectResetBtn = document.getElementById('project-reset-btn');
  dom.projectsList = document.getElementById('projects-list');
  dom.heroCanvas = document.getElementById('hero-canvas');
}

function bindEvents() {
  dom.adminTrigger.addEventListener('click', () => showModal(true));
  dom.loginClose.addEventListener('click', () => showModal(false));
  dom.loginForm.addEventListener('submit', handleLogin);
  dom.closeDashboard.addEventListener('click', () => toggleDashboard(false));
  dom.logoutBtn.addEventListener('click', handleLogout);
  dom.siteForm.addEventListener('submit', handleSiteSave);
  dom.skillForm.addEventListener('submit', handleSkillSave);
  dom.projectForm.addEventListener('submit', handleProjectSave);
  dom.skillResetBtn.addEventListener('click', resetSkillForm);
  dom.projectResetBtn.addEventListener('click', resetProjectForm);
  dom.heroSection?.addEventListener('mousemove', handleHeroParallax);
  dom.heroSection?.addEventListener('mouseleave', resetHeroParallax);
}

function getSkillIcon(name) {
  const term = name.toLowerCase();
  if (term.includes('ai') || term.includes('machine')) return '🤖';
  if (term.includes('web') || term.includes('frontend')) return '🌐';
  if (term.includes('word') || term.includes('wp')) return '🟦';
  if (term.includes('digital') || term.includes('marketing')) return '📈';
  if (term.includes('ethical') || term.includes('security') || term.includes('cyber')) return '🔒';
  return '⚡';
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.assign(state, parsed);
      state.skills = parsed.skills || DEFAULT_STATE.skills;
      state.projects = parsed.projects || DEFAULT_STATE.projects;
      delete state.supabase;
    }
  } catch (error) {
    console.warn('Could not load saved state:', error);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}


function renderAll() {
  renderHero();
  renderAbout();
  renderSkills();
  renderProjects();
  renderContact();
  renderAdminLists();
  fillAdminForms();
}

function renderHero() {
  dom.heroName.textContent = state.heroName;
  dom.heroRole.textContent = state.heroRole;
  dom.heroImage.src = state.heroProfileImage;
}

function renderAbout() {
  dom.aboutTyping.textContent = state.aboutText;
}

function renderSkills() {
  dom.skillsGrid.innerHTML = state.skills
    .map((skill) => `
      <article class="skill-card reveal">
        <div class="skill-icon">${getSkillIcon(skill.name)}</div>
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
      </article>`)
    .join('');
  initCardTilt();
}

function renderProjects() {
  dom.projectsGrid.innerHTML = state.projects
    .map((project) => `
      <article class="project-card reveal">
        <div class="project-image" style="background-image:url('${project.image}')"></div>
        <div class="project-copy">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <a class="btn btn-outline" href="${project.demoLink}">Live Demo</a>
        </div>
      </article>`)
    .join('');
}

function renderContact() {
  dom.contactPhone.textContent = state.phone;
  dom.contactEmail.textContent = state.email;
  dom.contactEmail.href = `mailto:${state.email}`;
  dom.contactWhatsapp.href = state.whatsapp;
}

function renderAdminLists() {
  dom.skillsList.innerHTML = state.skills
    .map((skill) => `
      <div class="admin-list-item">
        <h5>${skill.name}</h5>
        <p>${skill.description}</p>
        <div class="item-actions">
          <button class="mini-btn edit" data-action="edit-skill" data-id="${skill.id}">Edit</button>
          <button class="mini-btn delete" data-action="delete-skill" data-id="${skill.id}">Delete</button>
        </div>
      </div>`)
    .join('');

  dom.projectsList.innerHTML = state.projects
    .map((project) => `
      <div class="admin-list-item">
        <h5>${project.title}</h5>
        <p>${project.description}</p>
        <div class="item-actions">
          <button class="mini-btn edit" data-action="edit-project" data-id="${project.id}">Edit</button>
          <button class="mini-btn delete" data-action="delete-project" data-id="${project.id}">Delete</button>
        </div>
      </div>`)
    .join('');

  bindAdminListActions();
}

function bindAdminListActions() {
  document.querySelectorAll('.admin-list-item button').forEach((button) => {
    button.addEventListener('click', handleAdminListClick);
  });
}

function handleAdminListClick(event) {
  const action = event.target.dataset.action;
  const id = event.target.dataset.id;
  if (!action || !id) return;

  switch (action) {
    case 'edit-skill':
      populateSkillForm(id);
      break;
    case 'delete-skill':
      deleteSkill(id);
      break;
    case 'edit-project':
      populateProjectForm(id);
      break;
    case 'delete-project':
      deleteProject(id);
      break;
    default:
      break;
  }
}

function fillAdminForms() {
  dom.adminHeroName.value = state.heroName;
  dom.adminHeroRole.value = state.heroRole;
  dom.adminProfileImage.value = state.heroProfileImage;
  dom.adminAboutText.value = state.aboutText;
  dom.adminPhone.value = state.phone;
  dom.adminEmail.value = state.email;
  dom.adminWhatsapp.value = state.whatsapp;
}

function showModal(show) {
  dom.loginModal.classList.toggle('hidden', !show);
  if (show) {
    dom.adminPassword.value = '';
    dom.adminPassword.focus();
  }
}

function toggleDashboard(open) {
  dom.adminDashboard.classList.toggle('hidden', !open);
  dom.loginModal.classList.add('hidden');
}

function handleLogin(event) {
  event.preventDefault();
  if (dom.adminPassword.value.trim() === 'admin123') {
    toggleDashboard(true);
    renderAdminLists();
    fillAdminForms();
  } else {
    alert('Invalid password. Try admin123.');
  }
}

function handleLogout() {
  toggleDashboard(false);
  alert('Logged out.');
}

function handleSiteSave(event) {
  event.preventDefault();
  state.heroName = dom.adminHeroName.value.trim() || DEFAULT_STATE.heroName;
  state.heroRole = dom.adminHeroRole.value.trim() || DEFAULT_STATE.heroRole;
  state.heroProfileImage = dom.adminProfileImage.value.trim() || DEFAULT_STATE.heroProfileImage;
  state.aboutText = dom.adminAboutText.value.trim() || DEFAULT_STATE.aboutText;
  state.phone = dom.adminPhone.value.trim() || DEFAULT_STATE.phone;
  state.email = dom.adminEmail.value.trim() || DEFAULT_STATE.email;
  state.whatsapp = dom.adminWhatsapp.value.trim() || DEFAULT_STATE.whatsapp;

  saveState();
  renderAll();
  alert('Site content updated.');
}

function handleSkillSave(event) {
  event.preventDefault();
  const id = dom.adminSkillId.value;
  const skill = {
    id: id || `skill-${Date.now()}`,
    name: dom.adminSkillName.value.trim(),
    description: dom.adminSkillDesc.value.trim(),
  };
  if (!skill.name || !skill.description) {
    alert('Please enter a skill name and description.');
    return;
  }
  if (id) {
    state.skills = state.skills.map((item) => (item.id === id ? skill : item));
    alert('Skill updated.');
  } else {
    state.skills.push(skill);
    alert('Skill added.');
  }
  saveState();
  renderAll();
  resetSkillForm();
}

function handleProjectSave(event) {
  event.preventDefault();
  const id = dom.adminProjectId.value;
  const project = {
    id: id || `project-${Date.now()}`,
    title: dom.adminProjectTitle.value.trim(),
    description: dom.adminProjectDesc.value.trim(),
    image: dom.adminProjectImage.value.trim() || DEFAULT_STATE.projects[0].image,
    demoLink: dom.adminProjectLink.value.trim() || '#contact',
  };

  if (!project.title || !project.description || !project.image || !project.demoLink) {
    alert('Please fill all project fields.');
    return;
  }
  if (id) {
    state.projects = state.projects.map((item) => (item.id === id ? project : item));
    alert('Project updated.');
  } else {
    state.projects.push(project);
    alert('Project added.');
  }
  saveState();
  renderAll();
  resetProjectForm();
}

function populateSkillForm(id) {
  const skill = state.skills.find((item) => item.id === id);
  if (!skill) return;
  dom.adminSkillId.value = skill.id;
  dom.adminSkillName.value = skill.name;
  dom.adminSkillDesc.value = skill.description;
}

function populateProjectForm(id) {
  const project = state.projects.find((item) => item.id === id);
  if (!project) return;
  dom.adminProjectId.value = project.id;
  dom.adminProjectTitle.value = project.title;
  dom.adminProjectDesc.value = project.description;
  dom.adminProjectImage.value = project.image;
  dom.adminProjectLink.value = project.demoLink;
}

function deleteSkill(id) {
  if (!confirm('Delete this skill?')) return;
  state.skills = state.skills.filter((item) => item.id !== id);
  saveState();
  renderAll();
}

function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  state.projects = state.projects.filter((item) => item.id !== id);
  saveState();
  renderAll();
}

function resetSkillForm() {
  dom.adminSkillId.value = '';
  dom.adminSkillName.value = '';
  dom.adminSkillDesc.value = '';
}

function resetProjectForm() {
  dom.adminProjectId.value = '';
  dom.adminProjectTitle.value = '';
  dom.adminProjectDesc.value = '';
  dom.adminProjectImage.value = '';
  dom.adminProjectLink.value = '';
}

function updateCursorPosition(event) {
  if (!dom.customCursor) return;
  dom.customCursor.style.left = `${event.clientX}px`;
  dom.customCursor.style.top = `${event.clientY}px`;
}

function initCanvas() {
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  if (!dom.heroCanvas) return;
  dom.heroCanvas.width = window.innerWidth;
  dom.heroCanvas.height = window.innerHeight;
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

const particles = [];
const config = { quantity: 60, speed: 0.32, lineDistance: 120 };

function initParticles() {
  particles.length = 0;
  if (!dom.heroCanvas) return;
  for (let i = 0; i < config.quantity; i += 1) {
    particles.push({
      x: randomRange(0, dom.heroCanvas.width),
      y: randomRange(0, dom.heroCanvas.height),
      vx: randomRange(-config.speed, config.speed),
      vy: randomRange(-config.speed, config.speed),
      radius: randomRange(1.2, 3.5),
      alpha: randomRange(0.25, 0.9),
    });
  }
}

function animateParticles() {
  if (!dom.heroCanvas) return;
  const ctx = dom.heroCanvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, dom.heroCanvas.width, dom.heroCanvas.height);
  particles.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    if (particle.x < 0) particle.x = dom.heroCanvas.width;
    if (particle.x > dom.heroCanvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = dom.heroCanvas.height;
    if (particle.y > dom.heroCanvas.height) particle.y = 0;
    ctx.beginPath();
    ctx.fillStyle = `rgba(51, 229, 255, ${particle.alpha})`;
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  drawParticleConnections(ctx);
  requestAnimationFrame(animateParticles);
}

function drawParticleConnections(ctx) {
  particles.forEach((p1, index) => {
    for (let i = index + 1; i < particles.length; i += 1) {
      const p2 = particles[i];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < config.lineDistance) {
        ctx.strokeStyle = `rgba(51, 229, 255, ${0.14 - distance / 1200})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }
  });
}

function initTextAnimation() {
  if (!dom.heroName || !dom.heroRole) return;
  const heroText = [`I'm ${state.heroName}`, state.heroRole];
  dom.heroName.textContent = heroText[0];
  let index = 1;
  setInterval(() => {
    const nextText = heroText[index % heroText.length];
    const target = index % 2 === 0 ? dom.heroName : dom.heroRole;
    fadeText(target, nextText);
    index += 1;
  }, 4200);
}

function fadeText(element, text) {
  element.style.opacity = '0';
  setTimeout(() => {
    element.textContent = text;
    element.style.opacity = '1';
  }, 300);
}

function initTypingText() {
  if (!dom.aboutTyping) return;
  let cursor = 0;
  dom.aboutTyping.textContent = '';
  const text = state.aboutText;
  const interval = setInterval(() => {
    dom.aboutTyping.textContent += text[cursor];
    cursor += 1;
    if (cursor >= text.length) clearInterval(interval);
  }, 35);
}

function initStatsCounter() {
  const observers = document.querySelectorAll('.stat-value');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  observers.forEach((target) => observer.observe(target));
}

function animateCounter(element) {
  const target = Number(element.dataset.target) || 0;
  let current = 0;
  const step = Math.max(1, Math.round(target / 30));
  const ticker = setInterval(() => {
    current += step;
    element.textContent = current;
    if (current >= target) {
      element.textContent = target;
      clearInterval(ticker);
    }
  }, 40);
}

function initScrollReveal() {
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  revealItems.forEach((item) => observer.observe(item));
}

function initCursor() {
  if (!dom.customCursor) return;
  document.addEventListener('mousemove', updateCursorPosition);
  document.querySelectorAll('a, button, .skill-card, .project-card').forEach((element) => {
    element.addEventListener('mouseenter', () => dom.customCursor.classList.add('active'));
    element.addEventListener('mouseleave', () => dom.customCursor.classList.remove('active'));
  });
}

function handleHeroParallax(event) {
  if (!dom.heroFrame || !dom.heroImage) return;
  const rect = dom.heroSection.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  dom.heroFrame.style.transform = `translate(${x * 16}px, ${y * 14}px)`;
  dom.heroImage.style.transform = `translate(${x * 14}px, ${y * 12}px) rotate(${x * 5}deg)`;
}

function resetHeroParallax() {
  if (!dom.heroFrame || !dom.heroImage) return;
  dom.heroFrame.style.transform = 'translate(0, 0)';
  dom.heroImage.style.transform = 'translate(0, 0) rotate(0deg)';
}

function initCardTilt() {
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = (x / rect.width - 0.5) * 18;
      const py = (y / rect.height - 0.5) * 18;
      card.style.transform = `perspective(900px) rotateX(${ -py }deg) rotateY(${ px }deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) perspective(900px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

function initContactForm() {
  if (!dom.contactForm) return;
  dom.contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email-input').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    if (!name || !email || !message) {
      alert('Please complete the form.');
      return;
    }
    alert(`Thanks, ${name}! Your message has been noted. I will reach out via email soon.`);
    dom.contactForm.reset();
  });
}
