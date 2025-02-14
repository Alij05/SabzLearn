import { getToken, showSwal } from "../../funcs/utils.js"

const getAndShowAllDiscounts = async () => {
    const discountWrapper = document.querySelector('#discount-wrapper')

    const res = await fetch(`http://localhost:4000/v1/offs`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })

    const allDiscounts = await res.json()

    discountWrapper.innerHTML = ''
    allDiscounts.forEach((discount, index) => {
        discountWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td id="id">${index + 1}</td>
                <td id="price">${discount.code}</td>
                <td id="registers">${discount.creator}</td>
                <td id="support">${discount.percent}</td>
                <td id="support">${discount.max}</td>
                <td id="support">${discount.uses}</td>
                <td id="support">${discount.createdAt.slice(0, 10)}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="delete-btn" onclick=editDiscount('${discount._id}')>ویرایش</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id="edit-btn" onclick="deleteDiscount('${discount._id}')">حذف</button>
                </td>
            </tr>
            `)
    })

}


let courseID = null
const prepareCreateNewDiscountForm = async () => {
    const coursesSelectionDiscountElem = document.querySelector('#courses-select')

    const res = await fetch(`http://localhost:4000/v1/courses`)
    const courses = await res.json()

    courses.forEach(course => {
        coursesSelectionDiscountElem.insertAdjacentHTML('beforeend', `
            ${course.price ? `<option value=${course._id}>${course.name}</option>` : ''}
            `
            )
    })

    coursesSelectionDiscountElem.addEventListener('change', (event) => {
        courseID = event.target.value
    })

}


const createNewDiscountOffer = async () => {
    const codeDiscountElem = document.querySelector('#code')
    const percentDiscountElem = document.querySelector('#percent')
    const timeDiscountElem = document.querySelector('#time')

    let newDicountObject = {
        code: codeDiscountElem.value.trim(),
        percent: percentDiscountElem.value.trim(),
        max: timeDiscountElem.value.trim(),
        course: courseID,
    }

    const res = await fetch(`http://localhost:4000/v1/offs`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newDicountObject)
    })

    if (res.ok) {
        showSwal('کد تخفیف با موفقیت ثبت شد', 'success', 'Ok', () => {
            getAndShowAllDiscounts()
        })
    }

}


const deleteDiscount = (discountID) => {
    showSwal('آیا از حذف کد تخفیف مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/offs/${discountID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                })

                if (res.ok) {
                    showSwal('کد تخفیف با موفقیت حذف شد', 'success', 'Ok', () => {
                        getAndShowAllDiscounts()
                    })
                }
            }

        })
}



export {
    getAndShowAllDiscounts,
    prepareCreateNewDiscountForm,
    createNewDiscountOffer,
    deleteDiscount,
}