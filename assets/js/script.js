new Swiper(".image-slider", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
    sensitivity: 0.6,
  },
  mousewheel: {
    sensitivity: 1,
    eventTarget: ".image-slide",
  },
  slidesPerView: 1,
  spaceBetween: -55,
  // Responsive breakpoints
  breakpoints: {
    // // when window width is >= 540px
    520: {
      slidesPerView: 2,
      spaceBetween: -50,
    },
    // when window width is >= 700px
    700: {
      slidesPerView: 3,
      spaceBetween: -40,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: -40,
    },
    1600: {
      slidesPerView: 5,
      spaceBetween: -40,
    },
    2400: {
      slidesPerView: 6,
      spaceBetween: -40,
    },
  },
});

const heroes = JSON.parse(data);

renderSlides();

const currentPopup = document.querySelector(".popup");
const popupCloseIcon = document.querySelector(".close-popup");
popupCloseIcon.addEventListener("click", popupClose);

function getHeroById(id) {
  let res = null;
  if (heroesSet.size > 0) {
    heroesSet.forEach((hero) => {
      if (hero.id == id) {
        res = hero;
      }
    });
  }
  return res;
}

function popupOpen(e) {
  getHeroById(e.target.id).renderPopup(e);
  currentPopup.classList.add("open");
  currentPopup.addEventListener("click", outOfPopupClick);
  checkRatingInLs(e);
}

function outOfPopupClick(e) {
  const popupBody = document.querySelector(".popup__body");
  if (e.target === popupBody) {
    popupClose(e);
  }
}

function popupClose(e) {
  document.querySelector(".popup").classList.remove("open");
  emptyRating();
  e.preventDefault();
}

function renderSlides() {
  const slider = document.querySelector(".image-slider__wrapper");
  heroes.forEach((el) => {
    let newHero = new Hero(el);
    slider.innerHTML += newHero.render();
  });
  addSlideListeners();
}

function addSlideListeners() {
  const popupLinks = document.querySelectorAll(".popup-link");
  if (popupLinks.length > 0) {
    popupLinks.forEach((el) => {
      el.addEventListener("click", popupOpen);
    });
  }
}

// rating

const stars = document.querySelectorAll(".rating__star");
const rating = document.querySelector(".popup__rating");

function checkRatingInLs(e) {
  isRatingInLS(e.target.id)
    ? setRating(localStorage.getItem(e.target.id))
    : setRating(0);
  addRatingListeners();
}

function isRatingInLS(id) {
  return localStorage.getItem(id) ? true : false;
}

function addRatingListeners() {
  stars.forEach((star) => {
    star.addEventListener("mouseover", handleStarMouseover);
    star.addEventListener("click", handleStarClick);
  });
}

function handleStarMouseover(e) {
  console.log("star mouseover");
  setStars(e.target.id);
  rating.addEventListener("mouseout", handleRatingMouseout);
}

function setStars(starId) {
  console.log("starId", starId);
  for (let i = 0; i <= 10; i++) {
    if (i <= starId) {
      setStarFilled(stars[i]);
    } else {
      setStarOutlined(stars[i]);
    }
  }
}
const setStarFilled = (elem) => {
  elem.innerHTML = "star";
  elem.classList.remove("material-symbols-outlined");
  elem.classList.add("material-symbols-rounded");
};

const setStarOutlined = (elem) => {
  elem.innerHTML = "grade";
  elem.classList.remove("material-symbols-rounded");
  elem.classList.add("material-symbols-outlined");
};

function handleStarClick(e) {
  localStorage.setItem(rating.id, e.target.id);
  setRating(e.target.id);
}

function setRating(starId) {
  setStars(starId);
  rating.removeEventListener("mouseout", handleRatingMouseout);
}

function emptyRating() {
  stars.forEach((el) => {
    setStarOutlined(el);
  });
}

function handleRatingMouseout(e) {
  const popupContent = document.querySelector(".popup__content");
  e.relatedTarget === popupContent && isRatingInLS(rating.id)
    ? setRating(localStorage.getItem(rating.id))
    : emptyRating();
}
