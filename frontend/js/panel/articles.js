import { getAndShowAllArticles, prepareCreateNewArticleForm, createNewArticle, deleteArticle } from "./funcs/articles.js";

// Bind 
window.deleteArticle = deleteArticle


window.addEventListener('load', () => {
    const createArticleBtn = document.querySelector('#create-article-btn')

    getAndShowAllArticles()
    prepareCreateNewArticleForm()

    createArticleBtn.addEventListener('click', event => {
        event.preventDefault()
        createNewArticle()
    })

})




