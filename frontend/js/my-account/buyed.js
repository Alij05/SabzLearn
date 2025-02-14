import { getBuyedCourseDetails, showBuyedCoursesByUserFilterSelection, filterCourses } from "./funcs/buyed.js";


window.addEventListener('load', () => {

    getBuyedCourseDetails().then(responseCourses => {
        let allCourses = [...responseCourses]
        let filteredCourses = [...allCourses]

        const buyedCoursesFilterLinks = document.querySelectorAll('.courses-header__link')

        showBuyedCoursesByUserFilterSelection(allCourses)

        // Handling User Filter Selection
        buyedCoursesFilterLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                document.querySelector('.courses-header__link-active').classList.remove('courses-header__link-active')
                event.target.classList.add('courses-header__link-active')

                filteredCourses = filterCourses(allCourses, event.target.dataset.key)
                showBuyedCoursesByUserFilterSelection(filteredCourses)

            })
        })


    })


})