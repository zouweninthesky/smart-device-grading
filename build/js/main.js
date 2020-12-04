'use strict';

(function () {
  var orderButton = document.querySelector('.main-nav').querySelector('button');
  var popup = document.querySelector('.popup');
  var popupOverlay = popup.querySelector('.popup__overlay');
  var closeButton = popup.querySelector('.popup__close-button');
  var nameInput = popup.querySelector('#popup-name');
  var body = document.querySelector('body');
  var mainNav = document.querySelector('.main-nav');
  var ESC = 'Escape';

  var onEscPress = function (evt) {
    if (evt.key === ESC) {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    if (popup) {
      if (!popup.classList.contains('popup--hidden')) {
        if (popup) {
          popup.classList.add('popup--hidden');
          var form = popup.querySelector('form');
          if (form) {
            form.reset();
          }
        }
        if (popupOverlay) {
          popupOverlay.removeEventListener('click', closePopup);
        }
        if (closeButton) {
          closeButton.removeEventListener('click', closePopup);
        }
        if (document) {
          document.removeEventListener('keydown', onEscPress);
        }
        if (body) {
          body.classList.remove('scroll-disabled');
        }
        if (mainNav) {
          mainNav.classList.remove('main-nav--popup-opened');
        }
      }
    }
  };

  orderButton.addEventListener('click', function () {
    if (popup) {
      popup.classList.remove('popup--hidden');
    }
    if (popupOverlay) {
      popupOverlay.addEventListener('click', closePopup);
    }
    if (closeButton) {
      closeButton.addEventListener('click', closePopup);
    }
    if (document) {
      document.addEventListener('keydown', onEscPress);
    }
    if (nameInput) {
      nameInput.focus();
    }
    if (body) {
      body.classList.add('scroll-disabled');
    }
    if (mainNav) {
      mainNav.classList.add('main-nav--popup-opened');
    }
  });

  window.popup = {
    close: closePopup
  };
})();

(function () {
  var formQuestion = document.querySelector('.questions-form').querySelector('form');
  var formPopup = document.querySelector('.popup').querySelector('form');
  var phoneInput = formQuestion.querySelector('input[name="phone"]');
  var ERROR_MESSAGE = 'Введите номер полностью!';
  var REQUIRED_LENGTH = 18;

  var setLocalStorage = function (form) {
    var nameInput = form.querySelector('input[name="name"]');
    phoneInput = form.querySelector('input[name="phone"]');
    var questionInput = form.querySelector('input[name="question"]');
    if (nameInput) {
      localStorage.setItem('name', nameInput.value);
    }
    if (phoneInput) {
      localStorage.setItem('phone', phoneInput.value);
    }
    if (questionInput) {
      localStorage.setItem('question', questionInput.value);
    }
  };

  var checkPhone = function () {
    phoneInput.setCustomValidity(ERROR_MESSAGE);
    if (phoneInput.value.length === REQUIRED_LENGTH) {
      phoneInput.setCustomValidity('');
    } else {
      phoneInput.setCustomValidity(ERROR_MESSAGE);
    }
  };

  var onFormSubmit = function (form) {
    if (form) {
      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        phoneInput = form.querySelector('input[name="phone"]');
        if (phoneInput.value.length === REQUIRED_LENGTH) {
          setLocalStorage(form);
          if (form === formPopup) {
            window.popup.close();
          }
          form.reset();
        } else {
          phoneInput.setCustomValidity(ERROR_MESSAGE);
          phoneInput.addEventListener('change', checkPhone);
        }
      });
    }
  };

  onFormSubmit(formQuestion);
  onFormSubmit(formPopup);

})();

(function () {
  var phoneInputPopup = document.querySelector('#popup-phone');
  var phoneInputQuestion = document.querySelector('#question-phone');

  var initPhoneMask = function (thisPhoneInput) {
    if (thisPhoneInput) {
      $(thisPhoneInput).mask('+7 (000) 000-00-00');
    }
  };

  initPhoneMask(phoneInputQuestion);
  initPhoneMask(phoneInputPopup);
})();

(function () {
  var phoneInputPopup = document.querySelector('#popup-phone');
  var phoneInputQuestion = document.querySelector('#question-phone');
  var START_VALUE = '+7 (';

  var onPhoneFocus = function (phoneInput) {
    phoneInput.addEventListener('focus', function () {
      phoneInput.value = START_VALUE;
    });
  };

  onPhoneFocus(phoneInputPopup);
  onPhoneFocus(phoneInputQuestion);
})();

(function () {
  var nav = document.querySelector('.main-footer__nav');
  var address = document.querySelector('.main-footer__address');
  var tabs = document. querySelector('.main-footer__nav-and-address').querySelectorAll('div');
  var CLOSED_MODIFIER = '--closed';

  var initAccordeon = function () {
    if (nav) {
      nav.classList.add(nav.classList[0] + CLOSED_MODIFIER);
    }
    if (address) {
      address.classList.add(address.classList[0] + CLOSED_MODIFIER);
    }
  };

  var openList = function (list) {
    var button = list.querySelector('button');
    if (button) {
      button.addEventListener('click', function () {
        if (list.classList.contains(list.classList[0] + CLOSED_MODIFIER)) {
          if (tabs) {
            tabs.forEach(function (tab) {
              if (!tab.classList.contains(tab.classList[0] + CLOSED_MODIFIER)) {
                tab.classList.add(tab.classList[0] + CLOSED_MODIFIER);
              }
            });
          }
          list.classList.remove(list.classList[0] + CLOSED_MODIFIER);
        } else {
          list.classList.add(list.classList[0] + CLOSED_MODIFIER);
        }
      });
    }
  };

  initAccordeon();
  openList(nav);
  openList(address);
})();
