// 1. Безопасная инициализация AOS (если вдруг кто-то использует)
if (window.AOS && typeof AOS.init === "function") {
  AOS.init({ once: true, duration: 700, offset: 60 });
}

// 2. Реализация Lightbox для галерей (универсально, современный fade)
document.querySelectorAll('.gallery-grid img, .build-steps-grid img').forEach(img => {
  img.addEventListener('click', function() {
    openLightbox(this.src, this.alt || "");
  });
});
function openLightbox(src, alt) {
  // Удаляем любой существующий лайтбокс
  document.querySelectorAll('.custom-lightbox').forEach(box => box.remove());
  // Создаём lightbox через шаблонную строку
  let lb = document.createElement('div');
  lb.className = 'custom-lightbox';
  lb.innerHTML = `
    <span class="lightbox-back"></span>
    <button class="lightbox-close" aria-label="Закрыть">&times;</button>
    <img src="${src}" alt="${alt}" class="lightbox-img" style="opacity:0;transition:opacity .38s;">
    <div class="lightbox-caption">${alt ? alt : ''}</div>
  `;
  document.body.appendChild(lb);
  setTimeout(() => lb.querySelector('img').style.opacity = 1, 40);
  lb.querySelector('.lightbox-back').onclick = closeLightbox;
  lb.querySelector('.lightbox-close').onclick = closeLightbox;
  function closeLightbox() { lb.remove(); }
}
// Закрытие лайтбокса по Escape
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') document.querySelectorAll('.custom-lightbox').forEach(box => box.remove());
});

// 3. Плавная прокрутка к якорям (#)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 4. Динамическая тень на меню при прокрутке (визуальный эффект)
const navBar = document.querySelector('nav');
if (navBar) {
  window.addEventListener('scroll', function() {
    navBar.style.boxShadow = (window.scrollY > 30)
      ? "0 4px 18px #24eafd24"
      : "none";
  });
}

// 5. Плавная анимация появления формы (универсально, не дублируем стили)
document.querySelectorAll('.feedback-form').forEach(form => {
  form.style.opacity = 0;
  form.style.transform = "translateY(48px)";
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      form.classList.add('loaded');
    }, 350);
  });
});

// 6. Подсветка полей input на фокус под бирюзовый акцент
document.querySelectorAll('.feedback-form input').forEach(input => {
  input.addEventListener('focus', function(){
    this.style.boxShadow = '0 0 8px #5ddff9cc, 0 2px 8px #18eafc77';
    this.style.border = '1.5px solid #5ddff9';
  });
  input.addEventListener('blur', function(){
    this.style.boxShadow = ''; this.style.border = '';
  });
});

// 7. Подсказка на кнопке "Сергей Прораб"
const sergey = document.querySelector('.sergey-fab-rect');
if (sergey) {
  sergey.addEventListener('mouseenter', () => {
    if (!document.querySelector('.pro-sergey-tip')) {
      const tip = document.createElement('div');
      tip.className = 'pro-sergey-tip';
      tip.innerText = 'Онлайн‑консультант: задайте вопрос!';
      document.body.appendChild(tip);
      // Умное позиционирование
      tip.style.display = 'block'; tip.style.right = '120px'; tip.style.bottom = '40px';
      sergey.addEventListener('mouseleave', () => { tip.remove(); }, { once: true });
    }
  });
}

// 8. Автоматическая подсветка активного пункта меню по URL (бирюзовый стиль)
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  // Если имя файла или root
  let href = link.getAttribute('href');
  let page = location.pathname.split('/').pop();
  if ((page === '' && href === 'index.html') || page === href) {
    link.classList.add('active');
  }
});
