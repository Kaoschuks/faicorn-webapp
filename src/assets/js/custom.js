
function sessionShare() {
  if (!sessionStorage.length) {
      // Ask other tabs for session storage
      localStorage.setItem('getSessionStorage', Date.now());
  };
  window.addEventListener('storage', function(event) {
      if (event.key == 'getSessionStorage') {
          localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
          localStorage.removeItem('sessionStorage');

      } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
          var data = JSON.parse(event.newValue),
                      value;

          for (key in data) {
              sessionStorage.setItem(key, data[key]);
          }
      }
  });
  window.onbeforeunload = function() {
      //sessionStorage.clear();
  };
}

function themeInit() {
  // INITIALIZATION OF HEADER
  // =======================================================
  new HSHeader('#header').init()


  // INITIALIZATION OF MEGA MENU
  // =======================================================
  new HSMegaMenu('.js-mega-menu', {
      desktop: {
        position: 'left'
      }
    })


  // INITIALIZATION OF SHOW ANIMATIONS
  // =======================================================
  new HSShowAnimation('.js-animation-link')


  // INITIALIZATION OF BOOTSTRAP VALIDATION
  // =======================================================
  HSBsValidation.init('.js-validate', {
    onSubmit: data => {
      data.event.preventDefault()
      alert('Submited')
    }
  })


  // INITIALIZATION OF BOOTSTRAP DROPDOWN
  // =======================================================
  HSBsDropdown.init()


  // INITIALIZATION OF GO TO
  // =======================================================
  new HSGoTo('.js-go-to')


  // INITIALIZATION OF AOS
  // =======================================================
  AOS.init({
    duration: 650,
    once: true
  });


  // INITIALIZATION OF TEXT ANIMATION (TYPING)
  // =======================================================
  HSCore.components.HSTyped.init('.js-typedjs')


  // INITIALIZATION OF SWIPER
  // =======================================================
  var sliderThumbs = new Swiper('.js-swiper-thumbs', {
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    history: false,
    breakpoints: {
      480: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
    },
    on: {
      'afterInit': function (swiper) {
        swiper.el.querySelectorAll('.js-swiper-pagination-progress-body-helper')
        .forEach($progress => $progress.style.transitionDuration = `${swiper.params.autoplay.delay}ms`)
      }
    }
  });

  var sliderMain = new Swiper('.js-swiper-main', {
    effect: 'fade',
    autoplay: true,
    loop: true,
    thumbs: {
      swiper: sliderThumbs
    }
  })
}

document.addEventListener('DOMContentLoaded', (event) => {
  sessionShare();
  themeInit();
});