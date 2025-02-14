import { getMe } from "../../funcs/auth.js"
import { getToken, showSwal } from "../../funcs/utils.js"


const getAndShowUserInfos = async () => {
    const editInputPhone = document.querySelector('#edit-input-phone')
    const editInputName = document.querySelector('#edit-input-name')
    const editInputUsername = document.querySelector('#edit-input-username')
    const editInputEmail = document.querySelector('#edit-input-email')
    const pastInputPassword = document.querySelector('#past-input-password')
    const editInputPassword = document.querySelector('#edit-input-password')
    const editInputPasswordRepeat = document.querySelector('#edit-input-password-repeat')


    getMe().then(userInfo => {
        editInputPhone.value = userInfo.phone
        editInputName.value = userInfo.name
        editInputUsername.value = userInfo.username
        editInputEmail.value = userInfo.email
    })

}


const editUserProfile = async () => {
    const editInputPhone = document.querySelector('#edit-input-phone')
    const editInputName = document.querySelector('#edit-input-name')
    const editInputUsername = document.querySelector('#edit-input-username')
    const editInputEmail = document.querySelector('#edit-input-email')
    const editInputPassword = document.querySelector('#edit-input-password')

    let editProfileInfos = {
        name: editInputName.value.trim(),
        username: editInputUsername.value.trim(),
        email: editInputEmail.value.trim(),
        password: editInputPassword.value.trim(),
        phone: editInputPhone.value.trim()
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
            getAndShowUserInfos()
            location.replace('../Account/index.html')
        })
    }

}



export {
    getAndShowUserInfos,
    editUserProfile,
}