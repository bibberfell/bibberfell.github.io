/* global smoothScroll */

let popup,
    popupFade,
    popupScrollPosition;


function closePopup(scrollBack) {
    popupFade.classList.remove('popupFade_active');
    popup.classList.remove('popup_active');

    if (scrollBack) {
        smoothScroll(popupScrollPosition);
    }
}

function openPopup(content, mod, callback) {
    popupScrollPosition = window.pageYOffset;


    popup.className = 'popup';

    if (mod) {
        if (Array.isArray(mod)) {
            for (let key in mod) {
                if ({}.hasOwnProperty.call(mod, key)) {
                    popup.classList.add('popup_' + mod[key]);
                }
            }
        } else {
            popup.classList.add('popup_' + mod);
        }
    }

    popupFade.classList.add('popupFade_active');

    popup.querySelector('.popupContent').innerHTML = content;

    popup.style.top = (popupScrollPosition + 100) + 'px';

    popup.classList.add('popup_active');

    if (callback && typeof (callback) === 'function') {
        callback(popup);
    }
}

function initPopup() {
    popup = document.querySelector('.popup');
    if (!popup) {
        return;
    }
    popupFade = document.querySelector('.popupFade');

    let closes = document.querySelectorAll('.popupFade, .popup__close, .-js-closePopup');

    for (let close in closes) {
        if ({}.hasOwnProperty.call(closes, close)) {
            close.addEventListener('click', function () {
                closePopup();
            });
        }
    }

    let opens = document.querySelectorAll('.-js-openPopup');

    for (let open in opens) {
        if ({}.hasOwnProperty.call(opens, open)) {
            open.addEventListener('click', function (e) {
                e = e || window.event;

                e.preventDefault();

                openPopup(document.querySelector(self.dataset.popup));
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', initPopup);
