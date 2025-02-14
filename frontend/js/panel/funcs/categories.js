import { getToken, showSwal } from "../../funcs/utils.js"


const getAndShowAllCategories = async () => {
    const categoriesWrapper = document.querySelector('#categories-wrapper')

    const res = await fetch(`http://localhost:4000/v1/category`)
    const allCategories = await res.json()

    categoriesWrapper.innerHTML = ''
    allCategories.forEach((category, index) => {
        categoriesWrapper.insertAdjacentHTML('beforeend', `
            <tr>
              
                <td id="id">${index + 1}</td>
                <td id="category-title">${category.title}</td>
                <td id="category-name">${category.name}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id="delete-btn" onclick=deleteCategory('${category._id}')>حذف</button>
                </td>
            </tr>
            `)
    })
}


const createNewCategory = async () => {
    const categoryTitle = document.querySelector('#title')
    const categoryName = document.querySelector('#name')

    let newCategoryObject = {
        title: categoryTitle.value.trim(),
        name: categoryName.value.trim()
    }

    const res = await fetch(`http://localhost:4000/v1/category`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategoryObject)
    })

    if (res.ok) {
        showSwal("دسته بندی مورد نظر با موفقیت ثبت شد", "success", "ok",
            (result) => {
                getAndShowAllCategories()
                categoryTitle.value = ''
                categoryName.value = ''
            })
    }

}


const deleteCategory = async (categoryID) => {
    showSwal('آیا از حذف دسته بندی مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/category/${categoryID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                })

                if (res.ok) {
                    showSwal('دسته بندی با موفقیت حذف شد', 'success', 'Ok', () => {
                        getAndShowAllCategories()
                    })
                }
            }

        })
}





export {
    getAndShowAllCategories,
    createNewCategory,
    deleteCategory,
}