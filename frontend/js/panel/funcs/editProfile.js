import { getToken, showSwal } from "../../funcs/utils.js"

let adminProfile = null
const prepareEditAdminProfileForm = () => {
    const newProfilePhoto = document.querySelector('#new-profile-photo')
    newProfilePhoto.addEventListener('change', (event) => {
        adminProfile = event.target.files[0]

    })

}


const editAdminProfile = async () => {
    const newName = document.querySelector('#new-name')
    const newUsername = document.querySelector('#new-username')
    const newEmail = document.querySelector('#new-email')
    const newPassword = document.querySelector('#new-password')
    const newPhone = document.querySelector('#new-phone')

    let editProfileInfos = {
        name: newName.value.trim(),
        username: newUsername.value.trim(),
        email: newEmail.value.trim(),
        password: newPassword.value.trim(),
        phone: newPhone.value.trim()
    }

    const res = await fetch(`http://localhost:4000/v1/users`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editProfileInfos)
    })

    if (res.ok) {
        showSwal('پروفایل شما با موفقیت تغییر پیدا کرد', 'success', 'Ok', () => {
            newName.value = ''
            newUsername.value = ''
            newEmail.value = ''
            newPassword.value = ''
            newPhone.value = ''
        })
    }

}



export {
    prepareEditAdminProfileForm,
    editAdminProfile,
}