const burger = document.querySelector('[data-burger]');
const overlayMenu = document.querySelector('.overlay');
const nav = document.querySelector('[data-nav]');
const navItems = nav.querySelectorAll('a');
const body = document.body;
const header = document.querySelector('.header');
const inputs = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');
const headerHeight = header.offsetHeight;

const manaoLink = document.querySelector('.manao-link');
const modalOverlay = document.querySelector('.modal-overlay');
const modal = document.querySelector('.modal');

// validate
const form = document.querySelector('#form');




document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);
// burder open/close
burger.addEventListener('click', (e) => {
   body.classList.toggle('stop-scroll');
   burger.classList.toggle('burger--active');
   nav.classList.toggle('nav--visible');
});

// click item menu -> no-scroll + close menu
navItems.forEach(el => {
   el.addEventListener('click', () => {
      body.classList.remove('stop-scroll');
      burger.classList.remove('burger--active');
      nav.classList.remove('nav--visible');
   });
});

// click overlay - burder close
overlayMenu.addEventListener('click', (e) => {
   if (e.target == overlayMenu) {
      body.classList.remove('stop-scroll');
      burger.classList.remove('burger--active');
      nav.classList.remove('nav--visible');
   }
});

// scroll into block class link-button
document.querySelectorAll('a.link-button[href^="#"').forEach(link => {
   link.addEventListener('click', function (e) {
      e.preventDefault();

      let href = this.getAttribute('href').substring(1);

      const scrollTarget = document.getElementById(href);
      const topOffsetHeader = document.querySelector('.header').offsetHeight;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition;

      window.scrollBy({
         top: offsetPosition,
         behavior: 'smooth'
      });
   });
});

// posts slider
const postsSlider = new Swiper('.posts__slider', {
   speed: 500,
   breakpoints: {
      320: {
         slidesPerView: 1,
         spaceBetween: 10,
         pagination: {
            el: '.swiper-pagination',
         },
      },
      480: {
         slidesPerView: 1.5,
         spaceBetween: 20
      },
      578: {
         slidesPerView: 2,
         spaceBetween: 20,
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         },
      },
      768: {
         slidesPerView: 2.5,
         spaceBetween: 30
      },
      992: {
         slidesPerView: 3,
         spaceBetween: 30
      }
   }
});


// animate input
inputs.forEach(input => {
   input.addEventListener('keyup', (e) => {
      input.classList.add('empty');
   });
})

textarea.addEventListener('keyup', (e) => {
   textarea.classList.add('empty');
});


// вывод с введенными данными в консоль
function formResults() {
   const validateBtn = form.querySelector('.btn-form');

   validateBtn.addEventListener('click', (e) => {
      const nameUser = form.querySelector('.input-name')
      const emailUser = form.querySelector('.input-email')
      const messageUser = form.querySelector('.input-message');
      // const fields = form.querySelectorAll('.inputText input');

      if (messageUser.value && emailUser.value && nameUser.value) {
         let path = e.currentTarget.getAttribute('data-path');
         e.preventDefault();
         modal.classList.remove('modal--visible');

         document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
         modalOverlay.classList.add('modal-overlay--visible');
         body.classList.toggle('stop-scroll');

         console.log('Данные клиента')
         console.log('Имя: ', nameUser.value)
         console.log('email: ', emailUser.value)
         console.log('Описание задачи: ', messageUser.value)
         form.reset();
      } else {
         validateBtn.disabled = true;
      }
   });
}

formResults();

modalOverlay.addEventListener('click', (e) => {
   if (e.target == modalOverlay) {
      modalOverlay.classList.remove('modal-overlay--visible');
      modal.classList.remove('modal--visible');
      body.classList.toggle('stop-scroll');
   }
});







