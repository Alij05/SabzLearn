import { getAndShowAllCategories, createNewCategory, deleteCategory } from "./funcs/categories.js";

// Bind
window.deleteCategory = deleteCategory

window.addEventListener('load', () => {
    const createCategoryBtn = document.querySelector('#create-category-btn')

    getAndShowAllCategories()

    createCategoryBtn.addEventListener('click', (event) => {
        event.preventDefault()
        createNewCategory()
    })
    
})