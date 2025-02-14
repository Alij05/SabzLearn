import { getToken, showSwal } from "../../funcs/utils.js";

const getAdminInfos = async () => {
    const res = await fetch(`http://localhost:4000/v1/auth/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    const adminData = await res.json()

    return adminData
}


const logOut = () => {
    showSwal('آیا میخواهید از حساب کاربری خارج شوید؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                localStorage.removeItem('user')
                showSwal('با موفقیت خارج شدید', 'success', 'رفتن به صفحه اصلی', () => {
                    location.href = '../../index.html'
                })
                
            }

        })
}


export {
    getAdminInfos,
    logOut,

}
