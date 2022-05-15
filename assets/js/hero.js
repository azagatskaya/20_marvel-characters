const heroesSet = new Set();
class Hero {
	constructor(el) {
		this.id = el.id;
		this.name = el.name;
		this.image = el.image;
		this.universe = el.universe;
		this.alterego = el.alterego;
		this.occupation = el.occupation;
		this.friends = el.friends;
		this.superpowers = el.superpowers;
		this.details = el.details;
		heroesSet.add(this);
	}

	render() {
		return `
				<div class="image-slider__slide swiper-slide">
					<div class="image-slider__image">
						<img class="popup-link" id="${this.id}" src="${this.image}" alt="${this.id}">
					</div>
				</div>`;
	}

	renderPopup(e) {
		heroesSet.forEach(hero => {
			if (hero.id === e.target.id) {
				rating.id = this.id;
				document.querySelector('.popup__title').innerHTML = this.name;
				document.querySelector('.popup__img img').src = this.image;
				document.querySelector('#universe').innerHTML = this.universe;
				document.querySelector('#alterego').innerHTML = this.alterego;
				document.querySelector('#occupation').innerHTML = this.occupation;
				document.querySelector('#friends').innerHTML = this.friends;
				document.querySelector('#superpowers').innerHTML = this.superpowers;
				document.querySelector('#details').innerHTML = this.details;
			}
		});
	}
}