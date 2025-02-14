import { getAndShowAllMenus, prepareCreateMenuForm, createNewMenu, deleteMenu } from "./funcs/menus.js";

// Bind
window.deleteMenu = deleteMenu

window.addEventListener('load', () => {
    const createNewMenuBtn = document.querySelector('#create-menu-btn')
    
    getAndShowAllMenus()
    prepareCreateMenuForm()

    createNewMenuBtn.addEventListener('click', (event) => {
        event.preventDefault()
        createNewMenu()
    })

})
