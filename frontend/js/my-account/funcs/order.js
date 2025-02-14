import { getToken } from "../../funcs/utils.js"

const getAndShowAllOrders = async () => {
    const ordersHeaderWrapper = document.querySelector('#orders-header-wrapper')
    const ordersBodyWrapper = document.querySelector('#orders-body-wrapper')
    const orderDetailsWrapper = document.querySelector('#order-details-wrapper')
    orderDetailsWrapper.innerHTML = ''


    ordersHeaderWrapper.insertAdjacentHTML('beforeend', `
        <tr class="order__table-header-list">
            <th class="order__table-header-item">سفارش</th>
            <th class="order__table-header-item">تاریخ</th>
            <th class="order__table-header-item">مبلغ</th>
            <th class="order__table-header-item">جزئیات</th>
        </tr>
        `)


    const res = await fetch('http://localhost:4000/v1/orders', {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })

    const orders = await res.json()

    if (orders.length) {
        orders.forEach(order => {
            ordersBodyWrapper.insertAdjacentHTML('beforeend', `
                <tr class="order__table-body-list">
                    <th class="order__table-body-item">
                        <a href="#" class="order__table-body-link">${order.course.name}</a>
                    </th>
                    <th class="order__table-body-item">${order.createdAt.slice(0, 10)}</th>
                    <th class="order__table-body-item">${order.course.price === 0 ? 'رایگان' : (order.price).toLocaleString()}</th>
                    <th class="order__table-body-item">
                        <a class="order__table-body-btn" onclick="showOrderDetailsFunction('${order._id}')">جزئیات</a>
                    </th>
                </tr>
                `)
        })

    } else {
        ordersBodyWrapper.insertAdjacentHTML('beforeend', `
            <div class="alert alert-danger" style ="width: 100%;">هنوز سفارشی ثبت نکردید</div>
            `)
    }


}


const showOrderDetailsFunction = async (orderID) => {
    const orderDetailsWrapper = document.querySelector('#order-details-wrapper')
    const ordersHeaderWrapper = document.querySelector('#orders-header-wrapper')
    ordersHeaderWrapper.innerHTML = ''
    const ordersBodyWrapper = document.querySelector('#orders-body-wrapper')
    ordersBodyWrapper.innerHTML = ''

    const res = await fetch(`http://localhost:4000/v1/orders/${orderID}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })

    const orderDetails = await res.json()

    orderDetailsWrapper.innerHTML = ''
    orderDetails.forEach(orderDetail => {
        orderDetailsWrapper.insertAdjacentHTML('beforeend', `
            <div>
                <p>سفارش "${orderDetail.course.name}" با وضعیت "${orderDetail.course.status === 'start' ? 'در حال پیگیری' : 'تحویل داده شده'}" در تاریخ "${orderDetail.createdAt.slice(0, 10)}" ثبت شد</p>
                <div>
                    <h2 style="margin: 3rem 0 2rem; font-weight:Bold; font-size: 2rem;">مشخصات سفارش:</h2>
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <p>${orderDetail.course.name}</p>
                        <p>${orderDetail.course.price === 0 ? 'رایگان' : orderDetail.price.toLocaleString()}</p>
                    </div>
                </div>
            </div>
            `)

    })
    

}





export {
    getAndShowAllOrders,
    showOrderDetailsFunction,
}