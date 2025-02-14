import { prepareSendTicketForm, sendTicket } from "./funcs/send-ticket.js";



window.addEventListener('load', () => {
    const sendTicketBtn = document.querySelector('#send-ticket-btn')

    prepareSendTicketForm()

    sendTicketBtn.addEventListener('click', (event) => {
        event.preventDefault()
        sendTicket()
    })

})