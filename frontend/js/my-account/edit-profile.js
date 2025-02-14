import { getAndShowUserInfos, editUserProfile } from "./funcs/edit-profile.js";


window.addEventListener('load', () => {
    const editInfoBtn = document.querySelector('#edit-info-btn')
    
    getAndShowUserInfos()

    editInfoBtn.addEventListener('click', (event) => {
        event.preventDefault()
        editUserProfile()
    })


})