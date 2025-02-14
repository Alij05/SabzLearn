import { getAndShowCategoryCourses, showCoursesByUserCategorySelection, coursesFiltering, searchInArray, getAndShowAllCourses } from "./funcs/shared.js";
import { paginateItems, getURLParam, addParamToURL } from "./funcs/utils.js";

window.addParamToURL = addParamToURL

window.addEventListener('load', () => {
    getAndShowCategoryCourses().then(responseCourses => {
        console.log(responseCourses);
        
        let categoryCourses = [...responseCourses]
        let filteredCoursesArray = [...categoryCourses]
        let searchedCourseArray = []
        let userFilteringSelection = ''
        let showType = 'row'

        const categoryRowBtn = document.querySelector('.courses-top-bar__row-btn')
        const categoryColumnBtn = document.querySelector('.courses-top-bar__column-btn')
        const categorySearchInput = document.querySelector('.category-search-input')
        const categoryCoursesWrapper = document.querySelector('#category-courses-wrapper')
        const coursesFilteringSelections = document.querySelectorAll('.category__selection-item') // <li></li>
        const selectionTitleElem = document.querySelector('.category__selection--title-text')

        //  Show Courses By Category Selection
        showCoursesByUserCategorySelection(categoryCourses, showType, categoryCoursesWrapper)

        categoryRowBtn.addEventListener('click', () => {
            showType = 'column'
            categorySearchInput.value = ''
            document.querySelector('#category-courses-wrapper').style.gridTemplateColumns = 'auto'
            categoryColumnBtn.classList.remove('courses-top-bar__icon--active')
            categoryRowBtn.classList.add('courses-top-bar__icon--active')
            // showCoursesByUserCategorySelection(filteredCoursesArray, showType, categoryCoursesWrapper)
            showCoursesByUserCategorySelection(filteredCoursesArray, showType, categoryCoursesWrapper)
        })

        categoryColumnBtn.addEventListener('click', () => {
            showType = 'row'
            categorySearchInput.value = ''
            document.querySelector('#category-courses-wrapper').style.gridTemplateColumns = 'repeat(4, 1fr)'
            categoryRowBtn.classList.remove('courses-top-bar__icon--active')
            categoryColumnBtn.classList.add('courses-top-bar__icon--active')
            // showCoursesByUserCategorySelection(filteredCoursesArray, showType, categoryCoursesWrapper)
            showCoursesByUserCategorySelection(filteredCoursesArray, showType, categoryCoursesWrapper)
        })


        //  Show Courses By Filtering Category User Selection
        coursesFilteringSelections.forEach(coursesFilteringSelection => {
            coursesFilteringSelection.addEventListener('click', event => {
                categorySearchInput.value = ''
                selectionTitleElem.innerHTML = event.target.innerHTML
                userFilteringSelection = event.target.dataset.key
                filteredCoursesArray = coursesFiltering([...categoryCourses], userFilteringSelection)
                showCoursesByUserCategorySelection(filteredCoursesArray, showType, categoryCoursesWrapper)
            })
        })


        // Search the Course
        categorySearchInput.addEventListener('keyup', (event) => {
            searchedCourseArray = searchInArray([...filteredCoursesArray], 'name', event.target.value)
            showCoursesByUserCategorySelection(searchedCourseArray, showType, categoryCoursesWrapper)
        })

        // Pagination
        const categoryPaginationWrapper = document.querySelector('.category-pagination__wrapper')

        const currentPage = getURLParam('page')
        let paginatedArray = paginateItems(filteredCoursesArray, 4, categoryPaginationWrapper, currentPage)
        showCoursesByUserCategorySelection([...paginatedArray], showType, categoryCoursesWrapper)

        // Show All Courses
        const allCourseBtn = document.querySelector('.new-courses__header--left')
        allCourseBtn.addEventListener('click', (event) => {
            getAndShowAllCourses()
        })


    })
})

