import { getAndShowNavbarMenus, getAndShowUserInfos, userLogOut } from "./funcs/shared.js";


window.addEventListener('load', () => {
    const logoutUserBtn = document.querySelector('#logout-user')

    getAndShowNavbarMenus()
    getAndShowUserInfos()

    logoutUserBtn.addEventListener('click', () => {
        userLogOut()
    })

})