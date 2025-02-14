import { getAndShowMainPageInfos, showUserNameInNavbar, renderTopbarMenus, getAndShowNavbarMenus, createNewsLetter } from "./funcs/shared.js";

window.addEventListener('load', () => {
    const footerNewsLetterBtn = document.querySelector('.footer__news-btn')

    showUserNameInNavbar()
    renderTopbarMenus()
    getAndShowNavbarMenus()
    getAndShowMainPageInfos()
    footerNewsLetterBtn.addEventListener('click', (event) => {
        event.preventDefault()
        createNewsLetter()
    })

})
