import { getAndShowAllCourses, activeMenu, createNewCourse, prepareCreateCourseForm, deleteCourse } from "./funcs/courses.js";

// Bind
window.deleteCourse = deleteCourse

window.addEventListener('load', () => {
    const createCourseBtn = document.querySelector('#create-course-btn')

    getAndShowAllCourses()
    activeMenu()
    prepareCreateCourseForm()

    createCourseBtn.addEventListener('click', (event) => {
        event.preventDefault()
        createNewCourse()
    })


})