import { getToken, getURLParam } from "../../funcs/utils.js";

const getAndShowTicketAnswer = async () => {
    const ticketID = getURLParam("id");
    const userTicketChatBox = document.querySelector(".ticket-send__answer-text");
    const ticketAnswerChatBox = document.querySelector(".ticket-send__answer-user-text");

    const res = await fetch(
        `http://localhost:4000/v1/tickets/answer/${ticketID}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    }
    );
    const ticketAnswer = await res.json();

    console.log(ticketAnswer);
    

    userTicketChatBox.innerHTML = ticketAnswer.ticket;
    ticketAnswerChatBox.innerHTML = ticketAnswer.answer;

    console.log(ticketAnswer);
};

export { getAndShowTicketAnswer };
