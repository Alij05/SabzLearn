import { getAndShowAllOrders, showOrderDetailsFunction } from "./funcs/order.js";

// Bind
window.showOrderDetailsFunction = showOrderDetailsFunction


window.addEventListener('load', () => {
    getAndShowAllOrders()
})