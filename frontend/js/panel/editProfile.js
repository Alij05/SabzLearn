import { prepareEditAdminProfileForm, editAdminProfile } from "./funcs/editProfile.js";

window.addEventListener('load', () => {
    prepareEditAdminProfileForm()
    
    const editProfileBtn = document.querySelector('#edit-profile-btn')
    editProfileBtn.addEventListener('click', (event) => {
        event.preventDefault()
        editAdminProfile()

    })
    
})