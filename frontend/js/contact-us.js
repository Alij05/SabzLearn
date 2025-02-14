import { submitContactUsMessage } from "./funcs/shared.js";

window.addEventListener('load', () => {
    const submitBtn = document.querySelector('#contact-us__btn')
    submitBtn.addEventListener('click', (event) => {
        event.preventDefault()
        submitContactUsMessage()
    })

    
})