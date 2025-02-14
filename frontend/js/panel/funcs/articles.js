import { getToken, showSwal } from "../../funcs/utils.js"

const getAndShowAllArticles = async () => {
    const articlesWrapper = document.querySelector('#articles-wrapper')

    const res = await fetch(`http://localhost:4000/v1/articles`)
    const allArticles = await res.json()

    articlesWrapper.innerHTML = ''
    allArticles.forEach((article, index) => {
        articlesWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td id="id">${index + 1}</td>
                <td id="price">${article.title}</td>
                <td id="registers">${article.publish ? 'منتشر شده' : 'در حال انتشار'}</td>
                <td id="support">${article.createdAt.slice(0, 10)}</td>
                <td id="support">${article.creator.name}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="delete-btn" onclick=editArticle('${article._id}')>ویرایش</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id="edit-btn" onclick="deleteArticle('${article._id}')">حذف</button>
                </td>
            </tr>
            `)
    })

}


let categoryID = null
let articleCover = null
let articleEditorBody = null
const prepareCreateNewArticleForm = async () => {
    const categoriesList = document.querySelector('#category-list')
    const articleCoverElem = document.querySelector('#article-cover')

    const res = await fetch(`http://localhost:4000/v1/category`)
    const allCategories = await res.json()

    allCategories.forEach(category => {
        categoriesList.insertAdjacentHTML('beforeend', `
            <option value=${category._id}>${category.title}</option>
            `)
    })

    categoriesList.addEventListener('change', (event) => {
        categoryID = event.target.value
    })

    articleCoverElem.addEventListener('change', (event) => {
        articleCover = event.target.files[0]
    })


    // Ck Text Editor
    ClassicEditor.create(document.querySelector('#editor'), {
        language: 'fa'
    }).then(editor => {
        articleEditorBody = editor
    })
        .catch((error) => {
            console.error(error)
        })


}


const createNewArticle = async () => {
    const articleTitle = document.querySelector('#article-title')
    const articleShortname = document.querySelector('#article-shortname')
    const articleDescription = document.querySelector('#article-description')

    let formData = new FormData()
    formData.append('title', articleTitle.value)
    formData.append('description', articleDescription.value)
    formData.append('body', articleEditorBody.getData())
    formData.append('shortName', articleShortname.value)
    formData.append('categoryID', categoryID)
    formData.append('cover', articleCover)

    const res = await fetch(`http://localhost:4000/v1/articles`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: formData
    })

    if (res.ok) {
        showSwal("مقاله مورد نظر با موفقیت ثبت شد", "success", "ok",
            (result) => { getAndShowAllArticles() })
    }

}


const deleteArticle = (articleID) => {
    showSwal('آیا از حذف مقاله مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/articles/${articleID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                })

                if (res.ok) {
                    showSwal('مقاله با موفقیت حذف شد', 'success', 'Ok', () => {
                        getAndShowAllArticles()
                    })
                }
            }

        })
}




export {
    getAndShowAllArticles,
    prepareCreateNewArticleForm,
    createNewArticle,
    deleteArticle,
}