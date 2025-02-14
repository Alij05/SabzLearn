import { getMe } from "./auth.js"
import { isLogin, getURLParam, showSwal, getToken, paginateItems } from "./utils.js"

const getAndShowMainPageInfos = async () => {
    const topBarPhonenumber = document.querySelector('.top-bar__phonenumber span')
    const topBarEmail = document.querySelector('.top-bar__email a')

    const res = await fetch('http://localhost:4000/v1/infos/index')
    const mainInfos = await res.json()

    topBarPhonenumber.innerHTML = mainInfos.phone
    topBarEmail.innerHTML = mainInfos.email

    return mainInfos
}


const showUserNameInNavbar = () => {
    let userProfileName = document.querySelector('.navbar__profile a')
    const isUserLogin = isLogin()

    if (!isUserLogin) {
        userProfileName.innerHTML = 'ورود / ثبت نام'
        userProfileName.setAttribute('href', 'login.html')

    } else {
        const userInfos = getMe().then(data => {
            userProfileName.innerHTML = data.name
            userProfileName.setAttribute('href', 'my-account/Account/index.html')
        })

    }

}


const renderTopbarMenus = async () => {
    const topbarList = document.querySelector('.header__list')
    topbarList.innerHTML = ''

    const res = await fetch(`http://localhost:4000/v1/menus/topbar`, {
        method: 'GET',
    })

    const topbarMenus = await res.json();

    // Choose Random topbar menu from Array for Better SEO and Marketing
    const shuffledArray = topbarMenus.sort((a, b) => 0.5 - Math.random())
    shuffledArray.slice(0, 5).map(menu => {
        topbarList.innerHTML += `
            <li class="header__list--item">
               <a href="${menu.href}" class="header__list--link">${menu.title}</a>
            </li>
            `})

}


const getAndShowAllCourses = async () => {
    const newCoursesWrapper = document.querySelector('#new-course-wrapper')
    newCoursesWrapper.innerHTML = ''

    const res = await fetch(`http://localhost:4000/v1/courses`)
    const allCourses = await res.json()

    allCourses.slice(0, 8).map(course => {
        newCoursesWrapper.insertAdjacentHTML('beforeend', `
        <div class="course-box course-box-transform">
            ${course.discount ? `
                <div class="course-disocunt">
                    ${course.discount}%
                </div>`
                :
                ''
            }
            <a href="course.html?name=${course.shortName}">
                <img src=http://localhost:4000/courses/covers/${course.cover} alt="" class="course-image">
            </a>
            <div class="course-information__wrapper">
                <a href="course.html?name=${course.shortName}" class="course__name">${course.name}</a>
                <div class="course__teacher">
                    <a href="#" class="course__teacher-name">
                        <i class="fas fa-chalkboard-teacher"></i>
                        ${course.creator}
                    </a>
                    <div class="course__teacher-rate">
                        <span>${course.courseAverageScore}</span>
                        ${Array(5 - course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star.svg" alt="">').join('')
            }${Array(course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star_fill.svg" alt="">').join('')
            }
                        
                    </div>
                </div>
                <div class="course__information">
                    <p class="course__information-users">
                        <i class="fas fa-users"></i>
                        <span>${course.registers}</span>
                    </p>
                    ${course.discount ? `${course.price === 0 ? `<div><p class="course__information-price" style="text-decoration: line-through; font-size: 1.2rem;">0</p> <span class="course__information-price">رایگان</span></div>` : `<div><span class="course__information-price" style="text-decoration: line-through; font-size: 1.2rem;">${course.price.toLocaleString()}</span> <p class="course__information-price" style="font-weight: bold;">${(course.price - course.price * course.discount / 100).toLocaleString()} تومان</p></div>`}` : `<span class="course__information-price">${course.price === 0 ? 'رایگان !' : course.price.toLocaleString() + ' تومان'} </span>`}
                </div>
            </div>
            <div class="course__footer">
                <a href="#">مشاهده اطلاعات
                    <i class="fas fa-arrow-left"></i>
                </a>
            </div>
        </div>`)

    })

}


const getAndShowPopularCourses = async () => {
    const swiperWrapper = document.querySelector('#popular-courses-wrapper')

    const res = await fetch('http://localhost:4000/v1/courses/popular')
    const popularCourses = await res.json()

    popularCourses.forEach(course => {
        swiperWrapper.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                <div class="course-box">
                <a href="course.html?name=${course.shortName}">
                    <img src=http://localhost:4000/courses/covers/${course.cover} alt="" class="course-image">
                </a>
                    <div class="course-information__wrapper">
                        <a href="course.html?name=${course.shortName}" class="course__name">${course.name}</a>
                        <div class="course__teacher">
                            <a href="#" class="course__teacher-name">
                                <i class="fas fa-chalkboard-teacher"></i>
                                ${course.creator}
                            </a>
                            <div class="course__teacher-rate">
                                <span>${course.courseAverageScore}</span>
                                ${Array(5 - course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star.svg" alt="">').join('')
            }${Array(course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star_fill.svg" alt="">')
                .join('')
            }
                            </div>
                        </div>
                        <div class="course__information">
                            <p class="course__information-users">
                                <i class="fas fa-users"></i>
                                <span>${course.registers}</span>
                            </p>
                            <span class="course__information-price">${course.price === 0 ? 'رایگان !' : course.price.toLocaleString() + ' تومان'} </span>
                        </div>
                    </div>
                    <div class="course__footer">
                        <a href="#">مشاهده اطلاعات
                            <i class="fas fa-arrow-left"></i>
                        </a>
                    </div>
                </div>
            </div>
            `)
    })

}


const getAndShowPreSellCourses = async () => {
    const preSellCoursesWrapper = document.querySelector('#presale-courses-wrapper')

    const res = await fetch('http://localhost:4000/v1/courses/presell')
    const preSellCourses = await res.json()

    preSellCourses.slice(0, 8).map(course => {
        preSellCoursesWrapper.insertAdjacentHTML('beforeend', `
            <div class="course-box course-box-transform">
            <a href="course.html?name=${course.shortName}">
                <img src=http://localhost:4000/courses/covers/${course.cover} alt="" class="course-image">
            </a>
            <div class="course-information__wrapper">
                <a href="course.html?name=${course.shortName}" class="course__name">${course.name}</a>
                <div class="course__teacher">
                    <a href="#" class="course__teacher-name">
                        <i class="fas fa-chalkboard-teacher"></i>
                        ${course.creator}
                    </a>
                    <div class="course__teacher-rate">
                        <span>${course.courseAverageScore}</span>
                        ${Array(5 - course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star.svg" alt="">').join('')
            }${Array(course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star_fill.svg" alt="">').join('')
            }
                    </div>
                </div>
                <div class="course__information">
                    <p class="course__information-users">
                        <i class="fas fa-users"></i>
                        <span>${course.registers}</span>
                    </p>
                    <span class="course__information-price">${course.price === 0 ? 'رایگان !' : course.price.toLocaleString() + ' تومان'} </span>
                </div>
            </div>
            <div class="course__footer">
                <a href="#">مشاهده اطلاعات
                    <i class="fas fa-arrow-left"></i>
                </a>
            </div>
        </div>
        `)
    })

}


const getAndShowArticles = async () => {
    const articlesWrapper = document.querySelector('#articles-wrapper')

    const res = await fetch(`http://localhost:4000/v1/articles`)
    const articles = await res.json()

    articles.forEach(article => {
        articlesWrapper.insertAdjacentHTML('beforeend', `
            <div class="article-box product-box-transform">
                <a href="#">
                    <img src=http://localhost:4000/courses/covers/${article.cover} alt="Blog" class="article__img">
                </a>
                <a class="article__title">${article.title}</a>
                <p class="article__text">${article.description}</p>
                <a href="#" class="article__btn">بیشتر بخوانید</a>
            </div>
            `)
    })

}


const getAndShowNavbarMenus = async () => {
    const navbarList = document.querySelector('#navbar-list')

    const res = await fetch('http://localhost:4000/v1/menus')
    const navbarMenus = await res.json()

    navbarMenus.forEach(menu => {
        navbarList.insertAdjacentHTML('beforeend', `
            <li class="navbar__item">
                <a href=category.html?cat=${menu.href}&page=1 class="navbar__link">${menu.title}</a>
                ${menu.submenus.length ? `
                    <i class="fas fa-angle-down angle__icon"></i>
                    <ul class="navbar__link--list">
                        ${menu.submenus.map(submenu => {
            return `
                            <li class="navbar__link--item">
                                <a href="" class="navbar__link--link">${submenu.title}</a>
                            </li>`
        }).join('')}
                    </ul>    
                    ` : ''}
            </li>
            `)
    })
}

// Change the href of the Navbar Menus after CMS 
const getAndShowCategoryCourses = async () => {
    const categoryName = getURLParam('cat').split('/')[2]
    console.log(categoryName);


    const res = await fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
    const categoryCourses = await res.json()

    return categoryCourses
}


const showCoursesByUserCategorySelection = (categoryCourses, showType, categoryCoursesWrapper) => {
    if (categoryCourses.length === 0) {
        categoryCoursesWrapper.innerHTML = ''
        categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
            <div class="alert alert-danger" style="text-align: center;">متاسفانه فعلا هیچ دوره ای برای این دسته بندی وجود ندارد :(</div>
            `)
    }

    else {
        if (showType == 'row') {
            categoryCoursesWrapper.innerHTML = ''
            categoryCourses.forEach(course => {
                categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
                        <div class="course-box course-box-transform">
                                <a href=course.html?name=${course.shortName}>
                                    <img src=http://localhost:4000/courses/covers/${course.cover} alt="" class="course-image">
                                </a>
                                <div class="course-information__wrapper">
                                    <a href=course.html?name=${course.shortName} class="course__name">${course.name}</a>
                                    <div class="course__teacher">
                                        <a href="#" class="course__teacher-name">
                                            <i class="fas fa-chalkboard-teacher"></i>
                                            ${course.creator}
                                        </a>
                                        <div class="course__teacher-rate">
                                            <span>${course.courseAverageScore}</span>
                                            ${Array(5 - course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star.svg" alt="">').join('')
                    }${Array(course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star_fill.svg" alt="">').join('')
                    }
                                        </div>
                                    </div>
                                    <div class="course__information">
                                        <p class="course__information-users">
                                            <i class="fas fa-users"></i>
                                            <span>${course.registers}</span>
                                        </p>
                                        <span class="course__information-price">${course.price === 0 ? 'رایگان !' : course.price.toLocaleString() + ' تومان'}</span>
                                    </div>
                                </div>
                                <div class="course__footer">
                                    <a href="#">مشاهده اطلاعات
                                        <i class="fas fa-arrow-left"></i>
                                    </a>
                                </div>
                            </div>
                        `)
            })

        } else if (showType == 'column') {
            categoryCoursesWrapper.innerHTML = ''
            categoryCourses.forEach(course => {
                categoryCoursesWrapper.insertAdjacentHTML('beforeend', `
                        <div class="course-box course-box-transform course-box--column">
                                <a href=course.html?name=${course.shortName}>
                                    <img src=http://localhost:4000/courses/covers/${course.cover} alt="" class="course-image--column">
                                </a>
                                <div class="course-information__wrapper course-information__wrapper--column">
                                    <a href=course.html?name=${course.shortName} class="course__name">${course.name}</a>
                                    <div class="course__teacher">
                                        <a href="#" class="course__teacher-name">
                                            <i class="fas fa-chalkboard-teacher"></i>
                                            ${course.creator}
                                        </a>
                                        <div class="course__teacher-rate">
                                            <span>${course.courseAverageScore}</span>
                                            ${Array(5 - course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star.svg" alt="">').join('')
                    }${Array(course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star_fill.svg" alt="">').join('')
                    }
                                        </div>
                                    </div>
                                    <div class="course__description">${course.description}</div>
                                    <div class="course__information">
                                        <p class="course__information-users">
                                            <i class="fas fa-users"></i>
                                            <span>${course.registers}</span>
                                        </p>
                                        <span class="course__information-price">${course.price === 0 ? 'رایگان !' : course.price.toLocaleString() + ' تومان'}</span>
                                    </div>
                                </div>
                            </div>
                        `)
            })
        }
    }

}


const coursesFiltering = (array, filterMethod) => {
    let outputArray = [...array]
    switch (filterMethod) {
        case 'default': {
            outputArray = array
            break
        }
        case 'popular': {
            outputArray = array.filter(course => course.courseAverageScore === 5)
            break
        }
        case 'free': {
            outputArray = array.filter(course => course.price === 0)
            break
        }
        case 'expensive': {
            outputArray = array.filter(course => course.price > 1_000_000)
            break
        }
        case 'cheap': {
            outputArray = array.filter(course => course.price > 0 && course.price < 1_000_000)
            break
        }
        case 'most-sell': {
            outputArray = array.filter(course => course.registers > 0)
            break
        }
        case 'new': {
            outputArray = array.filter(course => course.createdAt.split('-')[0] >= 2022)
            break
        }
        default: {
            outputArray = array
        }
    }

    return outputArray
}


const searchInArray = (array, arrayProperty, searchValue) => {
    let outputArray = array.filter(course => course[arrayProperty].toLowerCase().includes(searchValue.toLowerCase()))

    return outputArray
}


const getCourseDetails = () => {
    const courseShortName = getURLParam('name')

    const courseBreadCrumbWrapper = document.querySelector('.breadcrumb__wrapper')
    const courseInfoWrapper = document.querySelector('.course-info__wrapper')
    const courseFeaturesWrapper = document.querySelector('.course-features')
    const courseLeftWrapper = document.querySelector('.course-status__left')
    const courseTopicWrapper = document.querySelector('.accordion-collapse')
    const commentsWrapper = document.querySelector('#show-comments__wrapper')
    courseBreadCrumbWrapper.innerHTML = ''
    courseInfoWrapper.innerHTML = ''
    courseFeaturesWrapper.innerHTML = ''
    courseLeftWrapper.innerHTML = ''
    courseTopicWrapper.innerHTML = ''
    commentsWrapper.innerHTML = ''

    fetch(`http://localhost:4000/v1/courses/${courseShortName}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }

    }).then(res => res.json())
        .then(course => {
            // console.log(course.comments);
            let courseTimeMinutes = 0
            let courseTimeSeconds = 0
            course.sessions.forEach(session => {
                courseTimeMinutes += Number(session.time.split(':')[0])
                courseTimeSeconds += Number(session.time.split(':')[1])
            })
            while (courseTimeSeconds > 60) {
                courseTimeMinutes += 1
                courseTimeSeconds -= 60
            }

            courseBreadCrumbWrapper.insertAdjacentHTML('beforeend', `
                <div class="course__category">
                    <a href="#">${course.categoryID.title}</a>
                    <i class="fas fa-angle-left"></i>
                </div>
                <div class="course__name">
                    <a href="#">${course.name}</a>
                </div>
                `)

            courseInfoWrapper.insertAdjacentHTML('beforeend', `
                <div class="course-info__details">
                    <div class="course-info__category">
                        <a href=category.html?cat=/category-info//${course.categoryID.name}>${course.categoryID.title}</a>
                    </div>
                    <div class="course-info__content">
                        <h1 class="course-info__title">${course.name}</h1>
                        <p class="course-info__description">${course.description}</p>
                        <div class="course-info__social-media">
                            <a href="#" class="course-info__social-media-item">
                                <svg class="svg-inline--fa fa-telegram course-info__icon" aria-hidden="true"
                                    focusable="false" data-prefix="fab" data-icon="telegram" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg="">
                                    <path fill="currentColor"
                                        d="M248 8C111 8 0 119 0 256S111 504 248 504 496 392.1 496 256 384.1 8 248 8zM362.1 176.7c-3.732 39.22-19.88 134.4-28.1 178.3-3.476 18.58-10.32 24.82-16.95 25.42-14.4 1.326-25.34-9.517-39.29-18.66-21.83-14.31-34.16-23.22-55.35-37.18-24.49-16.14-8.612-25 5.342-39.5 3.652-3.793 67.11-61.51 68.33-66.75 .153-.655 .3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283 .746-104.6 69.14-14.85 10.19-26.89 9.934c-8.855-.191-25.89-5.006-38.55-9.123-15.53-5.048-27.88-7.717-26.8-16.29q.84-6.7 18.45-13.7 108.4-47.25 144.6-62.3c68.87-28.65 83.18-33.62 92.51-33.79 2.052-.034 6.639 .474 9.61 2.885a10.45 10.45 0 0 1 3.53 6.716A43.76 43.76 0 0 1 362.1 176.7z">
                                    </path>
                                </svg><!-- <i class="fab fa-telegram-plane course-info__icon"></i> Font Awesome fontawesome.com -->
                            </a>
                            <a href="#" class="course-info__social-media-item">
                                <svg class="svg-inline--fa fa-twitter course-info__icon" aria-hidden="true"
                                    focusable="false" data-prefix="fab" data-icon="twitter" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                    <path fill="currentColor"
                                        d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z">
                                    </path>
                                </svg><!-- <i class="fab fa-twitter course-info__icon"></i> Font Awesome fontawesome.com -->
                            </a>
                            <a href="#" class="course-info__social-media-item">
                                <svg class="svg-inline--fa fa-facebook-f course-info__icon" aria-hidden="true"
                                    focusable="false" data-prefix="fab" data-icon="facebook-f" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="">
                                    <path fill="currentColor"
                                        d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z">
                                    </path>
                                </svg><!-- <i class="fab fa-facebook-f course-info__icon"></i> Font Awesome fontawesome.com -->
                            </a>
                        </div>
                    </div>
                </div>
                <div class="course-info__video">
                    <!-- <video src=""></video> -->
                    <img src="http://localhost:4000/courses/covers/${course.cover}" alt="">
                </div>

                `)

            courseFeaturesWrapper.insertAdjacentHTML('beforeend', `
                <div class="course-features__box">
                            <svg class="svg-inline--fa fa-graduation-cap course-boxes__box-right-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="graduation-cap" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M623.1 136.9l-282.7-101.2c-13.73-4.91-28.7-4.91-42.43 0L16.05 136.9C6.438 140.4 0 149.6 0 160s6.438 19.65 16.05 23.09L76.07 204.6c-11.89 15.8-20.26 34.16-24.55 53.95C40.05 263.4 32 274.8 32 288c0 9.953 4.814 18.49 11.94 24.36l-24.83 149C17.48 471.1 25 480 34.89 480H93.11c9.887 0 17.41-8.879 15.78-18.63l-24.83-149C91.19 306.5 96 297.1 96 288c0-10.29-5.174-19.03-12.72-24.89c4.252-17.76 12.88-33.82 24.94-47.03l190.6 68.23c13.73 4.91 28.7 4.91 42.43 0l282.7-101.2C633.6 179.6 640 170.4 640 160S633.6 140.4 623.1 136.9zM351.1 314.4C341.7 318.1 330.9 320 320 320c-10.92 0-21.69-1.867-32-5.555L142.8 262.5L128 405.3C128 446.6 213.1 480 320 480c105.1 0 192-33.4 192-74.67l-14.78-142.9L351.1 314.4z"></path></svg>
                            <div class="course-feature__description">
                                <h3 class="course-feature__title">وضعیت دوره:</h3>
                                <span class="course-feature__text">${course.isComplete ? 'به اتمام رسیده' : 'در حال تولید'}</span>
                            </div>
                        </div>
                        <div class="course-features__box">
                            <svg class="svg-inline--fa fa-clock course-boxes__box-right-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512zM232 256C232 264 236 271.5 242.7 275.1L338.7 339.1C349.7 347.3 364.6 344.3 371.1 333.3C379.3 322.3 376.3 307.4 365.3 300L280 243.2V120C280 106.7 269.3 96 255.1 96C242.7 96 231.1 106.7 231.1 120L232 256z"></path></svg>
                            <div class="course-feature__description">
                                <h3 class="course-feature__title">مدت زمان دوره:</h3>
                                <span class="course-feature__text">${Math.round(courseTimeMinutes / 60)} ساعت</span>
                            </div>
                        </div>
                        <div class="course-features__box">
                            <svg class="svg-inline--fa fa-calendar-days course-boxes__box-right-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="calendar-days" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z"></path></svg>
                            <div class="course-feature__description">
                                <h3 class="course-feature__title">آخرین بروزرسانی:</h3>
                                <span class="course-feature__text">${course.updatedAt.slice(0, 10)}</span>
                            </div>
                        </div>
                        <div class="course-features__box">
                            <i class="fas fa-user"></i>
                            <div class="course-feature__description">
                                <h3 class="course-feature__title">روش پشتیبانی</h3>
                                <span class="course-feature__text">${course.support}</span>
                            </div>
                        </div>
                        <div class="course-features__box">
                            <svg class="svg-inline--fa fa-circle-info course-boxes__box-right-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-info" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"></path></svg>
                            <div class="course-feature__description">
                                <h3 class="course-feature__title">پیش نیاز:</h3>
                                <span class="course-feature__text">HTML,CSS</span>
                            </div>
                        </div>
                        <div class="course-features__box">
                            <svg class="svg-inline--fa fa-play course-boxes__box-right-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" data-fa-i2svg=""><path fill="currentColor" d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"></path></svg>
                            <div class="course-feature__description">
                                <h3 class="course-feature__title">نوع مشاهده:</h3>
                                <span class="course-feature__text">ضبط شده / آنلاین</span>
                            </div>
                        </div>
                `)

            courseLeftWrapper.insertAdjacentHTML('afterbegin', `
                <div class="course-student-box">
                    <a href="#" id="register-btn" onclick="registerCourse('${course._id}', ${course.price}, ${course.isUserRegisteredToThisCourse})">
                        <i class="fas fa-graduation-cap"></i>
                        ${course.isUserRegisteredToThisCourse ? 'شما دانشجوی دوره هستید' : 'ثبت نام در دوره '}
                    </a>
                </div>

                <div class="course-info-box">
                    <span class="course-info-box-users">
                        <i class="fas fa-users"></i>
                        تعدا دانشجو <b>${course.courseStudentsCount}</b>
                    </span>
                    <div class="course-status__comments">
                        <span class="course-status__comments-count">
                            <i class="fas fa-comment"></i>
                            ${course.comments.length} دیدگاه
                        </span>
                        |
                        <span class="course-status__comments-view">
                            <i class="fas fa-eye"></i>
                            14370 بازدید
                        </span>
                    </div>
                </div>

                <div class="course-links-box">
                    <p class="course-links-box__header">
                        <i class="fas fa-link"></i>
                        لینک کوتاه
                    </p>
                    <a class="course-links-box__link">https://Sabzlearn.ir/?p=117472</a>
                </div>
                    
                <div class="course-seasons-box">
                    <h2 class="seasons-box__title">سرفصل های دوره</h2>
                    <p class="seasons-box__text">برای مشاهده یا دانلود دوره روی کلمه <a href="#" style="color: var(--primary-color);">لینک</a> کلیک کنید</p>
                </div>

                

                `)


            // show Course Sessions
            if (course.sessions.length) {
                course.sessions.forEach((session, index) => {
                    courseTopicWrapper.insertAdjacentHTML('beforeend', `
                            <div class="accordion-body accordion__content">
                                <div class="accordion__content-right">
                                    <span class="accordion__content-count">${index + 1}</span>
                                    <i class="fab fa-youtube accordion__content-icon"></i>
                                    ${session.free || course.isUserRegisteredToThisCourse ?
                            `<a href=episode.html?name=${course.shortName}&id=${session._id} class="accordion__content-link">${session.title}</a>`
                            :
                            `<span class="accordion__content-link">${session.title}</span>
                                             `}
                                </div>
                                <div class="accordion__content-left">
                                    <span class="accordion__content-time">${session.time}</span>
                                    ${session.free || course.isUserRegisteredToThisCourse ? '' : '<i class="fas fa-lock accordion__content-icon"></i>'}
                                </div>
                            </div>
                            `)
                })

            } else {
                courseTopicWrapper.insertAdjacentHTML('beforeend', `
                    <div class="accordion-body accordion__content">
                        <div class="accordion__content-right">
                            <span class="accordion__content-count"> -- </span>
                            <a class="accordion__content-link">هنوز جلسه ای آپلود نشده :(</a>
                        </div>
                        <div class="accordion__content-left">
                            <span class="accordion__content-time">00:00</span>
                        </div>
                    </div>
                    `)
            }

            // show Course Comments
            if (course.comments.length) {
                course.comments.forEach(comment => {
                    commentsWrapper.insertAdjacentHTML('beforeend', `
                        <div class="user-comment">
                            <div class="user-info-comment">
                                <div class="user-info-comment__right">
                                    <h2 class="user-comment__name">${comment.creator.name}</h2>
                                    <span class="user-comment__role">{ ${comment.creator.role === 'USER' ? 'دانشجو' : 'مدرس'} }</span>
                                    <span class="user-comment__date">${comment.createdAt.slice(0, 10)}</span>
                                </div>
                                <button type="submit" class="user-comment__btn">پاسخ</button>
                            </div>
                            <p class="user-comment__text">${comment.body}</p>
                            ${comment.answerContent ? `
                                <div class="admin-response__comment">
                                    <div div class= "user-info-comment__right" >
                                        <h2 class="user-comment__name">${comment.answerContent.creator.name}</h2>
                                        <span class="user-comment__role">{ ${comment.answerContent.creator.role === 'ADMIN' ? 'مدرس' : 'دانشجو'} }</span>
                                        <span class="user-comment__date">${comment.answerContent.creator.createdAt.slice(0, 10)}</span>
                                    </div >
                                    <p class="user-comment__text">${comment.answerContent.body}</p>
                                </div > 
                            ` : ''}
                            
                        </div >
                    `)

                })
            } else {
                commentsWrapper.insertAdjacentHTML('beforeend', `
                     <div class="alert alert-danger" style="margin-bottom: 0; text-align: center;">هنوز کامنتی برای این دوره ثبت نشده</div>
                    `)
            }

        })

}


const registerCourse = (courseID, coursePrice, isRegistered) => {
    if (!isRegistered) {
        if (coursePrice) {
            registerNotFreeCourse(courseID, coursePrice)
        } else {
            registerFreeCourse(courseID, coursePrice)
        }
    }

}


const registerFreeCourse = async (courseID, coursePrice) => {
    showSwal('آیا از ثبت نام در دوره مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/courses/${courseID}/register`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ price: coursePrice })
                })

                console.log(res);
                if (res.ok) {
                    showSwal('شما با موفقیت ثبت نام شدید', 'success', 'Ok', () => {
                        getCourseDetails()
                    })
                }
            }
        })

}


const registerNotFreeCourse = (courseID, coursePrice) => {
    showSwal('آیا از ثبت نام در دوره مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                showSwal('آیا کد تخفیف داری؟',
                    'warning',
                    ['خیر', 'بلی'],
                    async (result) => {
                        if (result) {
                            swal({
                                title: 'کد تخفیف را وارد کنید',
                                content: 'input',
                                button: 'ارسال'
                            }).then(discountCode => {
                                fetch(`http://localhost:4000/v1/offs/${discountCode}`, {
                                    method: 'POST',
                                    headers: {
                                        Authorization: `Bearer ${getToken()}`,
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ course: courseID })

                                }).then(res => {
                                    if (res.status === 404) {
                                        showSwal('کد تخفیف وارد شده معتبر نیست', 'error', 'دوباره امتحان کن', () => { }
                                        )

                                    } else if (res.status === 409) {
                                        showSwal('این کد تخفیف منقضی شده', 'error', ':(', () => { }
                                        )
                                    } else if (res.status === 200) {
                                        return res.json()
                                    }

                                }).then(code => {
                                    let discount = Number(code.percent)
                                    fetch(`http://localhost:4000/v1/courses/${courseID}/register`, {
                                        method: 'POST',
                                        headers: {
                                            Authorization: `Bearer ${getToken()}`,
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({ price: coursePrice - coursePrice * (discount / 100) })
                                    }).then(res => {
                                        if (res.ok) {
                                            showSwal('شما با موفقیت ثبت نام شدید', 'success', 'Ok', () => {
                                                location.reload()
                                            })
                                        }
                                    })


                                })

                            })

                        } else {
                            const res = await fetch(`http://localhost:4000/v1/courses/${courseID}/register`, {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${getToken()}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ price: coursePrice })
                            })

                            if (res.ok) {
                                showSwal('شما با موفقیت ثبت نام شدید', 'success', 'Ok', () => {
                                    getCourseDetails()
                                })
                            }

                        }
                    })
            }
        })

}


const getAndShowRelatedCourses = async () => {
    const courseShortName = getURLParam('name')
    const productsBoxWrapper = document.querySelector('.products-box__wrapper')

    const res = await fetch(`http://localhost:4000/v1/courses/related/${courseShortName}`)
    const relatedCourses = await res.json()
    relatedCourses.forEach(course => {
        console.log(course);
        
        productsBoxWrapper.insertAdjacentHTML('beforeend', `
            <div class="product-box">
                <img src="http://localhost:4000/courses/covers/${course.cover}" alt="" class="product-box__image">
                <a class="product-box__name" href="course.html?name=${course.shortName}">${course.name}</a>
            </div>
            `)
    })


}


const getSessionDetails = () => {
    const courseShortName = getURLParam('name')
    const sessionID = getURLParam('id')

    const episodeHeader = document.querySelector('.episode-header__left-text')
    const sidebarList = document.querySelector('.sidebar-topics__list')
    const sessionVideo = document.querySelector('.episode-content__video')

    fetch(`http://localhost:4000/v1/courses/${courseShortName}/${sessionID}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    }).then(res => res.json())
        .then(data => {
            // console.log(data);
            episodeHeader.innerHTML = data.session.title
            sessionVideo.setAttribute('src', `http://localhost:4000/courses/covers/${data.session.video}`)

            data.sessions.forEach(otherSession => {
                sidebarList.insertAdjacentHTML('beforeend', `
                    <li class="sidebar-topics__list-item">
                        <div class="sidebar-topics__list-right">
                          <i class="sidebar-topics__list-item-icon fa fa-play-circle"></i>
                          ${otherSession.free ?
                        `<a href="episode.html?name=${courseShortName}&id=${otherSession._id}" class="sidebar-topics__list-item-link">${otherSession.title}</a>`
                        :
                        `<span class="sidebar-topics__list-item-link">${otherSession.title}</span>`}
                        </div>
                        <div class="sidebar-topics__list-left">
                        <span class="sidebar-topics__list-item-time">${otherSession.time}</span>
                        ${otherSession.free ? '' : '<i class="fas fa-lock accordion__content-icon"></i>'}
                        </div>
                  </li>
                    `)
            })
        })
}


const submitContactUsMessage = async () => {
    const username = document.querySelector('#identifier')
    const email = document.querySelector('#email')
    const phonenumber = document.querySelector('#phonenumber')
    const message = document.querySelector('#contact-us__textarea')
    const submitBtn = document.querySelector('#contact-us__btn')

    let newContactUsInfos = {
        name: username.value.trim(),
        email: email.value.trim(),
        phone: phonenumber.value.trim(),
        body: message.value.trim()
    }

    const res = await fetch(`http://localhost:4000/v1/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newContactUsInfos)

    })

    const result = await res.json()

    if (res.status === 201) {
        showSwal('نظر شما ثبت شد', 'success', 'رفتن به صفحه اصلی',
            (result) => {
                location.href = 'index.html'
            })
    } else {
        showSwal('نظر شما ثبت نشد و با مشکل روبرو است', 'error', 'دوباره امتحان کن', () => { })
    }


    console.log(res);
    console.log(result);


}


const createNewsLetter = async () => {
    const newsLetterInput = document.querySelector('.footer__news-input')

    const newsLetterEmail = {
        email: newsLetterInput.value.trim()
    }

    const res = await fetch(`http://localhost:4000/v1/newsletters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newsLetterEmail)
    })
    const result = await res.json()

    if (res.ok) {
        showSwal('در خبرنامه عضو شدید', 'success', 'تایید',
            (result) => { })
    } else {
        showSwal('مشکلی بوجود آمد و عضو خبرنامه نشدید :(', 'error', 'دوباره امتحان کن', () => { })
    }

}


const getAndShowGlobalSearchResult = (input) => {
    const landingSearchResultList = document.querySelector('.landing__searchbar--result-list')

    landingSearchResultList.innerHTML = ''
    if (input.length >= 3) {
        fetch(`http://localhost:4000/v1/search/${input}`)
            .then(res => res.json())
            .then(result => {
                console.log(result);

                if (result.allResultCourses.length) {
                    console.log(result.allResultCourses);
                    result.allResultCourses.forEach(course => {
                        landingSearchResultList.insertAdjacentHTML('beforeend', `
                            <li class="landing__searchbar--result-item">
                                <a href=course.html?name=${course.shortName} class="landing__searchbar--result-link">${course.name}</a>
                                <i class="fas fa-angle-left" style="color: black;"></i>
                            </li>
                                        `)

                    })
                } else {
                    landingSearchResultList.insertAdjacentHTML('beforeend', `
                        <li class="landing__searchbar--result-item">
                            <span href="#" class="landing__searchbar--result-link">دوره ای با جست و جوی شما وجود ندارد</span>
                        </li>
                            `)
                }

            })

    } else {
        landingSearchResultList.innerHTML = `<li class="landing__searchbar--result-item">حداقل باید 3 حرف وارد شود</li>`
    }

}


const sendComment = async () => {
    const commentRate = document.querySelector('#comment-score')
    const commentBody = document.querySelector('.comments__score-input-respond')
    const courseShortName = getURLParam('name')

    const newCommentsInfos = {
        body: commentBody.value.trim(),
        courseShortName: courseShortName,
        score: Number(commentRate.value),
    }


    const res = await fetch(`http://localhost:4000/v1/comments`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCommentsInfos)
    })

    const result = await res.json()

    if (res.status === 201) {
        showSwal('نظر شما با موفقیت ثیت شد', 'success', 'با تشکر از شما',
            (result) => { })
    } else {
        showSwal('کامنت شما ثبت نشد :(', 'error', 'دوباره امتحان کن', () => { })
    }

    console.log(res);
    console.log(result);
}


const showAllCoursesInCoursesPage = async () => {
    const allCoursesWrapper = document.querySelector('.course-box__container')

    const res = await fetch('http://localhost:4000/v1/courses')
    const allCourses = await res.json()


    const paginationWrapper = document.querySelector('#courses-pagination__wrapper')
    const allCoursesPaginated = paginateItems([...allCourses], 3, paginationWrapper, getURLParam('page'))

    allCoursesPaginated.forEach(course => {
        allCoursesWrapper.insertAdjacentHTML('beforeend', `
        <div class="course-box course-box-transform">
            ${course.discount ? `
                <div class="course-disocunt">
                    ${course.discount}%
                </div>`
                :
                ''
            }
            <a href="course.html?name=${course.shortName}">
                <img src=http://localhost:4000/courses/covers/${course.cover} alt="" class="course-image">
            </a>
            <div class="course-information__wrapper">
                <a href="course.html?name=${course.shortName}" class="course__name">${course.name}</a>
                <div class="course__teacher">
                    <a href="#" class="course__teacher-name">
                        <i class="fas fa-chalkboard-teacher"></i>
                        ${course.creator}
                    </a>
                    <div class="course__teacher-rate">
                        <span>${course.courseAverageScore}</span>
                        ${Array(5 - course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star.svg" alt="">').join('')
            }${Array(course.courseAverageScore).fill(0).map(score => '<img src="./images/svg/star_fill.svg" alt="">').join('')
            }
                        
                    </div>
                </div>
                <div class="course__information">
                    <p class="course__information-users">
                        <i class="fas fa-users"></i>
                        <span>${course.registers}</span>
                    </p>
                    ${course.discount ? `<div><span class="course__information-price" style="text-decoration: line-through; font-size: 1.2rem;">${course.price.toLocaleString()}</span> <p class="course__information-price" style="font-weight: bold;">${(course.price - course.price * course.discount / 100).toLocaleString()} تومان</p></div>` : `<span class="course__information-price">${course.price === 0 ? 'رایگان !' : course.price.toLocaleString() + ' تومان'} </span>`}
                </div>
            </div>
            <div class="course__footer">
                <a href="#">مشاهده اطلاعات
                    <i class="fas fa-arrow-left"></i>
                </a>
            </div>
        </div>
            `)
    })



}


const showAllArticlesInCArticlesPage = async () => {
    const allArticlesWrapper = document.querySelector('#articles__wrapper')

    const res = await fetch('http://localhost:4000/v1/articles')
    const allArticles = await res.json()


    const paginationWrapper = document.querySelector('#articles-pagination__wrapper')
    const allArticlesPaginated = paginateItems([...allArticles], 3, paginationWrapper, getURLParam('page'))

    allArticlesPaginated.forEach(article => {
        allArticlesWrapper.insertAdjacentHTML('beforeend', `
            <div class= "article-box product-box-transform" >
                <a href="#">
                    <img src=http://localhost:4000/courses/covers/${article.cover} alt="Blog" class="article__img">
                </a>
                <a class="article__title">${article.title}</a>
                <p class="article__text">${article.description}</p>
                <a href="#" class="article__btn">بیشتر بخوانید</a>
            </div>
    `)
    })



}




export {
    getAndShowMainPageInfos,
    showUserNameInNavbar,
    renderTopbarMenus,
    getAndShowAllCourses,
    getAndShowPopularCourses,
    getAndShowPreSellCourses,
    getAndShowArticles,
    getAndShowNavbarMenus,
    getAndShowCategoryCourses,
    showCoursesByUserCategorySelection,
    coursesFiltering,
    searchInArray,
    getCourseDetails,
    registerCourse,
    getAndShowRelatedCourses,
    getSessionDetails,
    submitContactUsMessage,
    createNewsLetter,
    getAndShowGlobalSearchResult,
    sendComment,
    showAllCoursesInCoursesPage,
    showAllArticlesInCArticlesPage,

}