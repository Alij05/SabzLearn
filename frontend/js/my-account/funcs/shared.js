import { showSwal } from "../../funcs/utils.js"
import { getMe } from "../../funcs/auth.js"

const getAndShowNavbarMenus = async () => {
    const navbarList = document.querySelector('#navbar-list')

    const res = await fetch('http://localhost:4000/v1/menus')
    const navbarMenus = await res.json()

    navbarList.innerHTML = `<li class="navbar__item"><a href="#" class="navbar__link">صفحه اصلی</a></li>`
    navbarMenus.forEach(menu => {
        navbarList.insertAdjacentHTML('beforeend', `
            <li class="navbar__item">
                <a href=../../category.html?cat=${menu.href}&page=1 class="navbar__link">${menu.title}</a>
                ${menu.submenus.length ? `
                    <i class="fas fa-angle-down angle__icon"></i>
                    <ul class="navbar__link--list">
                        ${menu.submenus.map(submenu => {
            return `
                            <li class="navbar__link--item">
                                <a href="" class="navbar__link--link">${submenu.title}</a>
                            </li>`
        }).join('')}
                    </ul>    
                    ` : ''}
            </li>
            `)
    })
}


const getAndShowUserInfos = () => {
    const accountName = document.querySelector('#sidebar__name')

    getMe().then (userInfo => {
        accountName.innerHTML = userInfo.name
    })    
}


const userLogOut = () => {
    showSwal('آیا از خروج از حساب کاربری مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                localStorage.removeItem('user')
                location.replace('../../index.html')
            }
        })

}


export {
    getAndShowNavbarMenus,
    getAndShowUserInfos,
    userLogOut,
}