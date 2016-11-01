var popup,
    popupFade,
    popupScrollPosition,
    popupModClasses;

function initPopup() {
    popup = document.querySelector('.popup');
    if(!popup) {
        return;
    }
    popupFade = document.querySelector('.popupFade');

    var closes = document.querySelectorAll('.popupFade, .popup__close, .-js-closePopup');

    for (var i = closes.length - 1; i >= 0; i--) {
        closes[i].addEventListener('click', function () {
            closePopup();
        });
    }

    var opens = document.querySelectorAll('.-js-openPopup');

    for (var i = opens.length - 1; i >= 0; i--) {
        opens[i].addEventListener('click', function (e) {
            e = e || window.event;

            if (e.preventDefault) { // если метод существует
                e.preventDefault(); // то вызвать его
            } else { // иначе вариант IE8-:
                e.returnValue = false;
            }

            openPopup(document.querySelector(this.dataset.popup));
        });
    }
}

function openPopup(content, mod, callback) {
    popupScrollPosition = window.pageYOffset;

    popupModClasses = '';

    popup.className = 'popup';

    if(mod) {
        if(Array.isArray(mod)) {
            for(key in mod) {
                popup.classList.add('popup_' + mod[key]);
            }
        } else {
            popup.classList.add('popup_' + mod);
        }
    }

    popupFade.classList.add('popupFade_active');

    popup.querySelector('.popupContent').innerHTML = content;

    popup.style.top = (popupScrollPosition + 100) + 'px';

    popup.classList.add('popup_active');

    if (callback && typeof(callback) === 'function') {
        callback(popup);
    }
} 

function closePopup(scrollBack) {
    popupFade.classList.remove('popupFade_active');
    
    popup.classList.remove('popup_active');

    if(scrollBack) {
        smoothScroll(popupScrollPosition);
    }
}

document.addEventListener('DOMContentLoaded', initPopup);
