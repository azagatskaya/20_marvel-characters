new Swiper('.image-slider', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},
	scrollbar: {
		el: '.swiper-scrollbar',
		draggable: true,
		sensitivity: 0.6
	},
	mousewheel: {
		sensitivity: 1,
		eventTarget: '.image-slide'
	},
	slidesPerView: 1,
	spaceBetween: -55,
	// Responsive breakpoints
	breakpoints: {
		// // when window width is >= 540px
		520: {
			slidesPerView: 2,
			spaceBetween: -50
		},
		// when window width is >= 700px
		700: {
			slidesPerView: 3,
			spaceBetween: -40
		},
		1100: {
			slidesPerView: 4,
			spaceBetween: -40
		}
	}
});

const heroes = JSON.parse(data);

renderSlides();

const currentPopup = document.querySelector('.popup');
const popupCloseIcon = document.querySelector('.close-popup');
popupCloseIcon.addEventListener('click', popupClose);

function popupOpen(e) {
	renderPopup(e);
	currentPopup.classList.add('open');
	currentPopup.addEventListener('click', outOfPopupClick);
}

function outOfPopupClick(e) {
	const popupBody = document.querySelector('.popup__body');
	if (e.target === popupBody) {
		popupClose(e);
	}
}

function popupClose(e) {
	document.querySelector('.popup').classList.remove('open');
	e.preventDefault();
}

function renderSlides() {
	const slider = document.querySelector('.image-slider__wrapper');
	heroes.forEach(el => {
		let slide = `
				<div class="image-slider__slide swiper-slide">
					<div class="image-slider__image">
						<img class="popup-link" id="${el.id}" src="${el.image}" alt="${el.id}">
					</div>
				</div>`;
		slider.innerHTML += slide;
	});
	addSlideListeners();
}

// <div class="image-slider__hero-name">${el.name}</div>

function renderPopup(e) {
	heroes.forEach(el => {
		if (el.id === e.target.id) {
			document.querySelector('.popup__title').innerHTML = el.name;
			document.querySelector('.popup__img img').src = el.image;
			document.querySelector('#universe').innerHTML = el.universe;
			document.querySelector('#alterego').innerHTML = el.alterego;
			document.querySelector('#occupation').innerHTML = el.occupation;
			document.querySelector('#friends').innerHTML = el.friends;
			document.querySelector('#superpowers').innerHTML = el.superpowers;
			document.querySelector('#details').innerHTML = el.details;
		}
	});
}

function addSlideListeners() {
	const popupLinks = document.querySelectorAll('.popup-link');
	if (popupLinks.length > 0) {
		popupLinks.forEach(el => {
			el.addEventListener('click', popupOpen);
		});
		// 	e.preventDefault();
	}
}