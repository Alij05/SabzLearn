import { getToken, showSwal } from "../../funcs/utils.js"


const getAndShowAllUsers = async () => {
    const usersWrapper = document.querySelector('#users-wrapper')

    const res = await fetch(`http://localhost:4000/v1/users`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    const allUsers = await res.json()

    usersWrapper.innerHTML = ''
    allUsers.forEach((user, index) => {
        usersWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td id="id">${index + 1}</td>
                <td id="name">
                  <a href="file:///D:/Project/Admin_Panel/Product/index.html?id=${user._id}">${user.name}</a>
                </td>
                <td id="price">${user.username}</td>
                <td id="registers">${user.phone}</td>
                <td id="support">${user.email}</td>
                <td id="categoryID">${user.role === 'ADMIN' ? 'مدیر' : 'کاربر عادی'}</td>
                <td>
                    <button type="button" class="btn btn-success" id="change-role-btn" onclick="changeRoleUser('${user._id}')">تغییر نقش</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id="delete-btn" onclick="deleteUser('${user._id}')">حذف</button>
                </td>
                <td>
                    <button type="button" class="btn btn-primary" id="edit-btn" onclick="banUser('${user._id}')">بن</button>
                </td>
            </tr>
            `)
    })


}


const changeRoleUser = async (userID) => {

    showSwal('آیا از تغییر نقش کاربر مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                swal({
                    title: 'نقش جدید:',
                    content: 'input',
                    button: 'تغییر'
                }).then(newRole => {
                    fetch(`http://localhost:4000/v1/users/role`, {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            role: newRole,
                            id: userID
                        })
                        
                    }).then(res => {
                        if (res.ok) {
                            showSwal('نقش کاربر تغییر داده شد', 'success', 'Ok', () => {
                                getAndShowAllUsers()
                            })
                        }

                    })

                })

            }

        })


}


const deleteUser = async (userID) => {
    showSwal('آیا از حذف کاربر مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/users/${userID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                })

                if (res.ok) {
                    showSwal('کاربر با موفقیت حذف شد', 'success', 'Ok', () => {
                        getAndShowAllUsers()
                    })
                }
            }

        })

}


const banUser = async (userID) => {
    showSwal('آیا از بن کردن کاربر مطمئنی؟',
        'error',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/users/ban/${userID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                })

                if (res.ok) {
                    showSwal('کاربر با موفقیت بن شد', 'success', 'Ok', () => {
                        getAndShowAllUsers()
                    })
                }
            }

        })
}


const createNewUSerByAdmin = async () => {
    const nameInput = document.querySelector('#name')
    const usernameInput = document.querySelector('#username')
    const emailInput = document.querySelector('#email')
    const phonenumberInput = document.querySelector('#phonenumber')
    const passwordInput = document.querySelector('#password')

    const newUserInfos = {
        name: nameInput.value.trim(),
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phonenumberInput.value.trim(),
        password: passwordInput.value.trim(),
        confirmPassword: passwordInput.value.trim(),
    }

    fetch(`http://localhost:4000/v1/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUserInfos)
    })
        .then(res => {
            if (res.status === 201) {
                showSwal("کاربر مورد نظر با موفقیت ثبت شد", "success", "ok",
                    (result) => { getAndShowAllUsers() })

            } else if (res.status === 409) {
                showSwal("نام کاربری یا ایمیل قبلا استفاده شده است", "error", "تصحیح اطلاعات",
                    () => { }
                )
            } else if (res.status === 403) {
                showSwal("این شماره قبلا بن شده است", "error", "متاسفم",
                    () => { }
                )
            }
        })

}


export {
    getAndShowAllUsers,
    changeRoleUser,
    deleteUser,
    banUser,
    createNewUSerByAdmin,
}