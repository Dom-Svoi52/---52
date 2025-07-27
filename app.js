// Navigation Toggle
const navbarToggle = document.querySelector('.navbar__toggle');
const navbarMenu = document.querySelector('.navbar__menu');

if (navbarToggle && navbarMenu) {
  navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
  });
}

// Smooth scrolling for internal links
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu after click
      if (navbarMenu.classList.contains('active')) {
        navbarToggle.click();
      }
    }
  });
});

// AOS initialisation (анимации при скролле, если библиотека подключена)
if (typeof AOS !== 'undefined') {
  AOS.init({ once: true, duration: 700, offset: 80 });
}

/* Calculator Logic */
const calculatorPrices = {
  base: {
    'Семейный 40': 4000000,
    'МиниДом 36': 3200000,
    'Дом Куб 30': 2900000
  },
  foundation: {
    'Свайно-винтовой': 0,
    'МЗЛФ': 150000,
    'Плита': 350000
  },
  options: {
    'Терраса': 250000,
    'Кровля металло-черепица': 120000,
    'Панорамные окна': 200000
  }
};

const houseType = document.getElementById('houseType');
const foundationType = document.getElementById('foundationType');
const optionCheckboxes = document.querySelectorAll('.options__grid input[type="checkbox"]');
const totalPriceEl = document.getElementById('totalPrice');

function formatPrice(num) {
  return new Intl.NumberFormat('ru-RU').format(num) + ' ₽';
}

function calculateTotal() {
  const base = calculatorPrices.base[houseType.value] || 0;
  const foundation = calculatorPrices.foundation[foundationType.value] || 0;
  const optionsSum = Array.from(optionCheckboxes)
    .filter(cb => cb.checked)
    .reduce((acc, cb) => acc + (calculatorPrices.options[cb.value] || 0), 0);

  const total = base + foundation + optionsSum;
  animatePrice(total);
  return total;
}

function animatePrice(value) {
  totalPriceEl.classList.add('animate');
  totalPriceEl.textContent = formatPrice(value);
  setTimeout(() => totalPriceEl.classList.remove('animate'), 500);
}

if (houseType && foundationType && totalPriceEl) {
  [houseType, foundationType].forEach(select => {
    select.addEventListener('change', calculateTotal);
  });
  optionCheckboxes.forEach(cb => cb.addEventListener('change', calculateTotal));
  calculateTotal();
}

/* Project Modal Logic */
const projectsData = {
  'semeiny-40': {
    title: 'Семейный 40',
    gallery: [
      'https://i.postimg.cc/Wz2s1pkQ/photo-5467925983140117215-y-1.jpg',
      'https://i.postimg.cc/NjVGkw3H/photo-5467372104157624624-y.jpg',
      'https://i.postimg.cc/7hmwGv1b/photo-5467925983140117216-y.jpg',
      // ... другие ссылки на фото
    ]
  },
  // ... другие проекты
};

// Здесь может быть логика для модальных окон проектов
