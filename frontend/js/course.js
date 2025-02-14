import { getCourseDetails, getAndShowRelatedCourses, sendComment, registerCourse } from "./funcs/shared.js";

// Bind
window.registerCourse = registerCourse


window.addEventListener('load', () => {
    getCourseDetails()
    getAndShowRelatedCourses()
    // Handling Sending COmment
    const sendCommentBtn = document.querySelector('#send-comment-btn')
    sendCommentBtn.addEventListener('click', (event) => {
        event.preventDefault()
        sendComment()
    })


})

