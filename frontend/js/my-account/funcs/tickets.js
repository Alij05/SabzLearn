import { getToken } from "../../funcs/utils.js"


const getAndShowUserTickets = async () => {
    const ticketsWrapper = document.querySelector('#tickets-wrapper')
    const ticketsCountTitle = document.querySelector('.ticket-content__title')

    const res = await fetch('http://localhost:4000/v1/tickets/user', {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })

    const tickets = await res.json()

    ticketsCountTitle.innerHTML = `نمایش ${tickets.length} تیکت`
    console.log(tickets);

    if (tickets.length) {
        tickets.forEach(ticket => {
            ticketsWrapper.insertAdjacentHTML('beforeend', `
                <div class="ticket-content__box">
                    <div class="ticket-content__right">
                        <div class="ticket-content__right-right">
                            <a class="ticket-content__link" href="../Ansewr-Ticket/index.html?id=${ticket._id}">${ticket.title}</a>
                            <span class="ticket-content__category">
                                <i class="fa fa-ellipsis-v ticket-content__icon"></i>
                               ${ticket.departmentSubID}</span>
                        </div>
                        <div class="ticket-content__right-left">
                            <span class="ticket-content__name">${ticket.user}</span>
                        </div>
                    </div>
                    <div class="ticket-content__left">
                        <div class="ticket-content__left-right">
                            <div class="ticket-content__condition">
                                <span class="ticket-content__condition-text">${ticket.answer ? `پاسخ داده شده` : `در انتظار پاسخ`}</span>
                            </div>
                        </div>
                        <div class="ticket-content__left-left">
                            <span class="ticket-content__time">${ticket.createdAt.slice(0, 10)}</span>
                        </div>
                    </div>
                </div>
                `)

        })

    } else {
        ticketsWrapper.insertAdjacentHTML('beforeend', `
            <div class="alert alert-danger">هنوز تیکتی ارسال نکردید :(</div>
            `)
    }


}






export {
    getAndShowUserTickets,
}