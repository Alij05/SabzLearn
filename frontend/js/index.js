import { getAndShowMainPageInfos, getAndShowAllCourses, getAndShowPopularCourses, getAndShowPreSellCourses, getAndShowArticles, getAndShowGlobalSearchResult } from "./funcs/shared.js";

let $ = document


// Counter
const usersCount = $.querySelector('#users-count')
const coursesCount = $.querySelector('#courses-count')
const minutesCount = $.querySelector('#minutes-count')


window.addEventListener('load', () => {

  // Main Infos
  getAndShowMainPageInfos().then(mainInfos => {
    statusCounter(mainInfos.usersCount, usersCount)
    statusCounter(mainInfos.coursesCount, coursesCount)
    statusCounter(mainInfos.totalTime, minutesCount)
  })


  getAndShowAllCourses()
  getAndShowPopularCourses()
  getAndShowPreSellCourses()
  getAndShowArticles()


  // Global Search 
  const landingSearchInput = document.querySelector('.landing__search')
  const landingSearchResult = document.querySelector('.landing__searchbar--result')
  landingSearchInput.value = ''
  landingSearchInput.addEventListener('keyup', (event) => {
    if (event.target.value.length === 0) {
      landingSearchResult.classList.add('hidden')
    } else {
      landingSearchResult.classList.remove('hidden')
      let inputString = event.target.value.trim()
      getAndShowGlobalSearchResult(inputString)
    }
  })

 


})

function statusCounter(max, elem) {
  let counter = 0
  const interval = setInterval(() => {
    elem.innerHTML = counter
    counter++
    if (counter > max) {
      clearInterval(interval)
    }
  }, 0.2)
}






const swiper = new Swiper('.swiper', {

  slidesPerView: 4,
  spaceBetween: 25,

  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  autoplay: {
    delay: 5000,
  },

  // Responsive
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    // when window width is >= 480px
    576: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    992: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 25
    }
  }

});


// Type Writer

let landingTitle = document.getElementById('landing__content');

let typewriter = new Typewriter(landingTitle, {
  loop: true
});

typewriter.typeString('ما به هر قیمتی دوره آموزشی تولید نمیکنیم')
  .pauseFor(1500)
  .deleteAll()
  .start();


