import { getToken, getURLParam } from "../../funcs/utils.js"


const getAndShowTicketAnswer = async () => {
    const ticketID = getURLParam('id')

    const res = await fetch(`http://localhsot:4000/v1/tickets/asnwer/${ticketID}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    const ticketAnswer = await res.json()

}