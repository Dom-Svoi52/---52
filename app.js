// 1. Безопасная инициализация AOS (только если он есть)
if (window.AOS && typeof AOS.init === "function") {
  AOS.init({ once: true, duration: 700, offset: 60 });
}

// 2. Lightbox (для галерей) с fade‑анимацией
document.querySelectorAll('.gallery-grid img, .build-steps-grid img').forEach(img => {
  img.addEventListener('click', function() {
    openLightbox(this.src, this.alt || "");
  });
});

function openLightbox(src, alt) {
  document.querySelectorAll('.custom-lightbox').forEach(box => box.remove());
  let lb = document.createElement('div');
  lb.className = 'custom-lightbox';
  lb.innerHTML = 
    <div class="lightbox-back"></div>
    <img src="${src}" alt="${alt}" class="lightbox-img" style="opacity:0; transition:opacity .38s;">
    <button class="lightbox-close" aria-label="Закрыть">&times;</button>
    <div class="lightbox-caption">${alt}</div>
  ;
  document.body.appendChild(lb);
  setTimeout(() => lb.querySelector('.lightbox-img').style.opacity = 1, 40);
  lb.querySelector('.lightbox-back').onclick =
  lb.querySelector('.lightbox-close').onclick = () => lb.remove();
}
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    document.querySelectorAll('.custom-lightbox').forEach(box => box.remove());
  }
});

// 3. Фокусация на форме, если есть якорь #form
if (location.hash === '#form' && document.querySelector('.feedback-form input[name="name"]')) {
  document.querySelector('.feedback-form input[name="name"]').focus();
}

// 4. Tooltip-подсказка на кнопке Сергей (можно отключить, если не нужно)
const sergey = document.querySelector('.sergey-fab-rect');
if (sergey) {
  sergey.addEventListener('mouseenter', () => {
    if (!document.querySelector('.pro-sergey-tip')) {
      const tip = document.createElement('div');
      tip.className = 'pro-sergey-tip';
      tip.innerText = 'Онлайн‑консультант: задайте вопрос!';
      tip.style.position = 'fixed'; tip.style.right = '120px'; tip.style.bottom = '40px';
      tip.style.background = '#212b37'; tip.style.color = '#fff'; tip.style.padding = '8px 16px';
      tip.style.borderRadius = '8px'; tip.style.boxShadow = '0 2px 18px #FF6F6190';
      tip.style.zIndex = '9999'; tip.style.fontSize = '1rem'; tip.style.pointerEvents = 'none';
      document.body.appendChild(tip);
      sergey.onmouseleave = () => { tip.remove(); };
    }
  });
}

// 5. Добавим плавную прокрутку к якорям (если есть ссылки вида #)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 6. Динамическая тень на меню при прокрутке (визуальный эффект-модерн)
const navBar = document.querySelector('nav');
if (navBar) {
  window.addEventListener('scroll', function() {
    if (window.scrollY > 30) navBar.style.boxShadow = "0 4px 12px #18253230";
    else navBar.style.boxShadow = "none";
  });
}

// 7. Анимация появления формы обратной связи (визуальное улучшение)
const form = document.querySelector('.feedback-form');
if(form){
  form.style.opacity = 0;
  form.style.transform = "translateY(48px)";
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      form.style.transition = "opacity .7s, transform .5s";
      form.style.opacity = 1;
      form.style.transform = "translateY(0)";
    }, 350);
  });
}

// 8. Подсветка поля формы при фокусе
document.querySelectorAll('.feedback-form input').forEach(input => {
  input.addEventListener('focus', function(){
    this.style.boxShadow = '0 0 8px #FF6F61cc';
    this.style.border = '1.5px solid #FF6F61';
  });
  input.addEventListener('blur', function(){
    this.style.boxShadow = '';
    this.style.border = '';
  });
});

// 9. Автоматически подсвечивать активный пункт меню (если ссылки ведут на внутренние страницы)
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  if(location.pathname.endsWith(link.getAttribute('href'))) link.style.color = '#FF6F61';
});
