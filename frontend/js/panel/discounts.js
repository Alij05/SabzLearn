import { getAndShowAllDiscounts, prepareCreateNewDiscountForm, createNewDiscountOffer, deleteDiscount } from "./funcs/discounts.js"

// Bind
window.deleteDiscount = deleteDiscount

window.addEventListener('load', () => {
    const addDiscountBtn = document.querySelector('#create-discount-btn')

    getAndShowAllDiscounts()
    prepareCreateNewDiscountForm()

    addDiscountBtn.addEventListener('click', (event) => {
        event.preventDefault()
        createNewDiscountOffer()
    })

})