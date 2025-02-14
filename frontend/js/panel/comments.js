import {getAndShowAllComments, showComment, answerComment, confirmComment, rejectComment, deleteComment } from "./funcs/comments.js";

// Bind
window.deleteComment = deleteComment
window.showComment = showComment
window.answerComment = answerComment
window.confirmComment = confirmComment
window.rejectComment = rejectComment


window.addEventListener('load', () => {
    getAndShowAllComments()
})

