import { getAndShowAllUsers,changeRoleUser, deleteUser, banUser, createNewUSerByAdmin } from "./funcs/users.js";

// Bind
window.changeRoleUser = changeRoleUser
window.deleteUser = deleteUser
window.banUser = banUser

window.addEventListener('load', () => {
    const addUserBtn = document.querySelector('#add-user-btn')

    getAndShowAllUsers()

    addUserBtn.addEventListener('click', (event) => {
        event.preventDefault()
        createNewUSerByAdmin()
    })

})