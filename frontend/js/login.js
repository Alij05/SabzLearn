import { login, getMe } from "./funcs/auth.js";

const loginBtn = document.querySelector('#login-btn')


loginBtn.addEventListener('click', event => {
    event.preventDefault()
    login()
})