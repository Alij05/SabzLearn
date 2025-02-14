import { getToken, showSwal } from "../../funcs/utils.js"


let departmentID = null
let subDepartmentID = null
let ticketPriority = 2
let ticketCourse = undefined

const prepareSendTicketForm = async () => {
    const ticketDepartmentElem = document.querySelector('#ticket-department')
    const ticketSubDepartmentElem = document.querySelector('#ticket-sub-department')
    const ticketPriorityElem = document.querySelector('#ticket-priority')

    const res = await fetch('http://localhost:4000/v1/tickets/departments')
    const departments = await res.json()

    

    departments.forEach(department => {
        ticketDepartmentElem.insertAdjacentHTML('beforeend', `
            <option class="ticket-form__option" value="${department._id}">${department.title}.</option>
            `)
    })

    ticketDepartmentElem.addEventListener('change', async (event) => {
        departmentID = event.target.value

        const res = await fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
        const subDepartments = await res.json()
        subDepartments.forEach(subDepartment => {
            ticketSubDepartmentElem.insertAdjacentHTML('beforeend', `
                <option class="ticket-form__option" value="${subDepartment._id}">${subDepartment.title}.</option>
                `)
        })
    })

    ticketSubDepartmentElem.addEventListener('change', (event) => {
        subDepartmentID = event.target.value
    })

    ticketPriorityElem.addEventListener('change', (event) => {
        ticketPriority = event.target.value
    })

}


const sendTicket = async () => {
    const ticketTitle = document.querySelector('#ticket-title')
    const ticketTextInput = document.querySelector('#ticket-text-input')

    let sendTicketInfos = {
        departmentID: departmentID,
        departmentSubID: subDepartmentID,
        title: ticketTitle.value.trim(),
        priority: ticketPriority,
        body: ticketTextInput.value.trim(),
    }

    const res = await fetch(`http://localhsot:4000/v1/tickets`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendTicketInfos)

    })

    if (res.ok) {
        showSwal('تیکت شما با موفقیت ارسال شد', 'success', 'نمایش تیکت ها',
            () => {
                location.replace('../Tickets/index.html')
            })

    }

}

export {
    prepareSendTicketForm,
    sendTicket,
}