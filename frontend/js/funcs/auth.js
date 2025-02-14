import { showSwal, saveIntoLocalStorage, getToken } from "./utils.js"

const register = () => {
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
                showSwal("شما با موفقیت ثبت نام شدید", "success", "ورود به پنل کاربری",
                    (result) => { location.href = 'index.html' })

            } else if (res.status === 409) {
                showSwal("نام کاربری یا ایمیل قبلا استفاده شده است", "error", "تصحیح اطلاعات",
                    () => { }
                )
            } else if(res.status === 403) {
                showSwal("این شماره قبلا بن شده است", "error", "متاسفم",
                    () => { }
                )
            }
            
            return res.json()
        })
        .then(result => {
            // result = access Token
            saveIntoLocalStorage('user', { token: result.accessToken })
        })

}

const login = () => {
    const identifierInput = document.querySelector('#identifier')
    const passwordInput = document.querySelector('#password')

    const userInfos = {
        identifier: identifierInput.value.trim(),
        password: passwordInput.value.trim()
    }

    fetch(`http://localhost:4000/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfos)

    })
        .then(res => {
            if (res.status === 401) {
                showSwal('کاربری با این اطلاعات یافت نشد', 'info', 'تصحیح اطلاعات',
                    () => { }
                )
            } else if (res.status === 200) {
                location.href = 'index.html'
            }

            return res.json()

        }).then(result => {
            // result = access Token
            saveIntoLocalStorage('user', { token: result.accessToken })
        })

}

const getMe = async () => {
    const token = getToken()

    if (!token) {
        return false
    }

    const res = await fetch('http://localhost:4000/v1/auth/me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const data = await res.json()

    return data 
}



export { register, login, getMe }
