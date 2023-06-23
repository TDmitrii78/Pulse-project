'use strict';
//slider
$(document).ready(function(){
    $('.slider__box').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></button>',
    });
});

//item content toggle information
document.querySelectorAll('.catalog-item__link').forEach((el) => {
    el.onclick = (event) => {
        const more = event.target.parentElement;
        more.classList.toggle('catalog-item__block-content_active');
        more.nextElementSibling.classList.toggle('catalog-item__block-information_active');
        return false;
    }
});

//item information toggle content
document.querySelectorAll('.catalog-item__link-back').forEach((el) => {
    el.onclick = (event) => {
        const back = event.target.parentElement;
        back.classList.toggle('catalog-item__block-information_active');
        back.previousElementSibling.classList.toggle('catalog-item__block-content_active');
        return false;
    }
});

// catalog tab menu
document.querySelectorAll('.catalog__tab').forEach((el, i, arr) => {
    el.onclick = (event) => {
        arr.forEach(el => {
            el.classList.remove('catalog__tab_active');
        })
        event.target.tagName === 'LI' ? 
        event.target.classList.add('catalog__tab_active'):
        event.target.parentElement.classList.add('catalog__tab_active');

        document.querySelectorAll('.catalog__content').forEach((el, index) => {
            el.classList.remove('catalog__content_active');
            if (i === index) el.classList.add('catalog__content_active');
        })
    }
});

//scroll up
window.onscroll = (event) => {
    let currentY = window.pageYOffset;
    (currentY > 1600) ?
        document.querySelector('.chevron-up').classList.add('chevron-up_activite'):
        document.querySelector('.chevron-up').classList.remove('chevron-up_activite');
}

new WOW().init();

//overlay
const overlay = document.querySelector('.overlay');

//open modal consultation
document.querySelectorAll('.button').forEach(el => {
    if (el.dataset.modal === 'consult') {
        el.onclick = () => {
            overlay.style.display = 'block';
            document.querySelector('#consultation').style.display = 'block';
        }
    }
});

//open modal bay
document.querySelectorAll('.button_bay').forEach(el => {
    el.onclick = (event) => {
        const bayModal = document.querySelector('#bay');
        const targetButton = event.target;

        const textName = targetButton
            .parentElement
            .parentElement
            .querySelector('.catalog-item__subtitle')
            .innerText;

        bayModal.querySelector('.modal__description').innerText = textName;
        overlay.style.display = 'block';
        bayModal.style.display = 'block';
    }
})

//modal exit
document.querySelectorAll('.modal__exit').forEach(el => {
    el.onclick = () => {
        overlay.style.display = 'none';
        document.querySelector('#consultation').style.display = 'none';
        document.querySelector('#bay').style.display = 'none';
    }
})

// phone mask
jQuery(function($){
    $("input[name=phone]").mask("+7 (999) 999-9999");
 });

// validate form
function validateForm(formName) {
    $(formName).validate({
        rules: {
          name: "required",
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
            name: "Please specify your name",
            phone: "Please specify your phone",
            email: {
              required: "We need your email address to contact you",
              email: "Your email address must be in the format of name@domain.com"
            }
          }
    });
}
validateForm('.feedback-form');
validateForm('#consultation form');
validateForm('#bay form');