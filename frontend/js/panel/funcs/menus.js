import { getToken, showSwal } from "../../funcs/utils.js";


const getAndShowAllMenus = async () => {
    const menusWrapper = document.querySelector('#menus-wrapper')

    const res = await fetch(`http://localhost:4000/v1/menus/all`)
    const allMenus = await res.json()

    menusWrapper.innerHTML = ''
    allMenus.forEach((menu, index) => {
        menusWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${index + 1}</td>
                <td>${menu.title}</td>
                <td><a href="#">${menu.href}</a></td>
                <td>${menu.parent ? menu.parent.title : '--'}</td>
                <td>
                    <button type='button' class='btn btn-primary edit-btn'>ویرایش</button>
                </td>
                <td>
                    <button type='button' id="delete-btn" onclick="deleteMenu('${menu._id}')" class='btn btn-danger delete-btn'>حذف</button>
                </td>
            </tr>
            `)
    })
}


let parentMenuID = null
const prepareCreateMenuForm = async () => {
    const menusWrapper = document.querySelector('#parent-menus')

    const res = await fetch(`http://localhost:4000/v1/menus`)
    const allmenus = await res.json()

    allmenus.forEach(menu => {
        menusWrapper.insertAdjacentHTML('beforeend', `
            <option value=${menu._id}>${menu.title}</option>
            `)
    })

    menusWrapper.addEventListener('change', (event) => {
        parentMenuID = event.target.value
    })


}


const createNewMenu = async () => {
    const menuTitle = document.querySelector('#menu-title')
    const menuHref = document.querySelector('#menu-href')

    let newMenuObject = {
        title: menuTitle.value.trim(),
        href: menuHref.value.trim(),
        parent: parentMenuID,
    }

    const res = await fetch(`http://localhost:4000/v1/menus`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMenuObject)
    })

    if (res.ok) {
        showSwal('منو با موفقیت ثبت شد', 'success', 'Ok', (result) => {
            getAndShowAllMenus()
        })
    }

}


const deleteMenu = (menuID) => {
    showSwal('آیا از حذف دوره مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        (result) => {
            // console.log(result);
            if (result) {
                confirmDeleteMenu(menuID)
            }
        })
}


const confirmDeleteMenu = async (menuID) => {

    const res = await fetch(`http://localhost:4000/v1/menus/${menuID}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })

    if (res.ok) {
        showSwal('منو با موفقیت حذف شد', 'success', 'Ok', () => {
            getAndShowAllMenus()
        })
    }


}



export {
    getAndShowAllMenus,
    prepareCreateMenuForm,
    createNewMenu,
    deleteMenu,
}