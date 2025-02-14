import { login } from "./auth.js"
import { showCoursesByUserCategorySelection } from "./shared.js"

const showSwal = (title, icon, buttons, callback) => {
    swal({
        title,
        icon,
        buttons  // if the user click in Swal Button -> result = true | false
    }).then(result => callback(result))
}

const saveIntoLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const getToken = () => {
    const userInfos = JSON.parse(localStorage.getItem('user'))
    return userInfos ? userInfos.token : null
}

const isLogin = () => {
    const userInfos = localStorage.getItem('user')
    return userInfos ? true : false
}

const getURLParam = (key) => {
    let urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(key)
}

const addParamToURL = (param, value) => {
    let url = new URL(window.location.href)
    let searchParams = url.searchParams

    searchParams.set(param, value)
    url.search = searchParams.toString()
    // console.log(url.toString());

    location.href = url.toString()
}

const paginateItems = (array, itemsPerPage, paginateParentElem, currentPage) => {

    let endIndex = currentPage * itemsPerPage
    let startIndex = endIndex - itemsPerPage
    let paginatedItems = array.slice(startIndex, endIndex)
    let paginatedCount = (Math.ceil(array.length / itemsPerPage))

    // Handling Number of Page Should Shown
    paginateParentElem.insertAdjacentHTML('beforeend', `
        <li class="category-pagination__item">
            <a href="#" class="category-pagination__link">
                <i class="fas fa-long-arrow-right"></i>
            </a>
        </li>
    `)
    for (let i = 1; i <= paginatedCount; i++) {
        paginateParentElem.insertAdjacentHTML('beforeend', `
            <li class="category-pagination__item ${currentPage == i ? 'category-pagination__item--active' : ''}">
                <a onclick="addParamToURL('page', ${i})" class="category-pagination__link">${i}</a>
            </li>            
            `)
    }
    paginateParentElem.insertAdjacentHTML('beforeend', `
        <li class="category-pagination__item">
            <a href="#" class="category-pagination__link">
                <i class="fas fa-long-arrow-left"></i>
            </a>
        </li>
    `)


    return paginatedItems
    
}



export {
    showSwal,
    saveIntoLocalStorage,
    getFromLocalStorage,
    getToken,
    isLogin,
    getURLParam,
    paginateItems,
    addParamToURL,
}
