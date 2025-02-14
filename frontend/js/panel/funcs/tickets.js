import { getToken, showSwal } from "./../../funcs/utils.js";

const getAndShowAllTickets = async () => {
    const ticketsListElem = document.querySelector(".table tbody");
    ticketsListElem.innerHTML = "";

    const res = await fetch(`http://localhost:4000/v1/tickets`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    const tickets = await res.json();

    tickets.forEach((ticket, index) => {
        ticketsListElem.insertAdjacentHTML(
            "beforeend",
            `
            <tr>
                <td class="${ticket.answer === 1 ? "answer-ticket" : "no-answer-ticket"
            }">${index + 1}</td>
                <td>${ticket.title}</td>
                <td>${ticket.user}</td>
                <td>${ticket.course ? ticket.course : "---"}</td>
                <td>
                    ${ticket.priority === 1 ? "بالا" : ""}
                    ${ticket.priority === 2 ? "متوسط" : ""}
                    ${ticket.priority === 3 ? "کم" : ""}
                </td>
                <td>${ticket.departmentID}</td>
                <td>${ticket.departmentSubID}</td>
                <td>${ticket.createdAt.slice(0, 10)}</td>
                <td>
                    <button type='button' onclick="showTicketBody('${ticket.body}')" class='btn btn-primary edit-btn'>مشاهده</button>
                </td>
                <td>
                    <button type='button' onclick="answerToTicket('${ticket._id}')" class='btn btn-primary edit-btn'>پاسخ</button>
                </td>
            </tr>
        `
        )
    })
}


const showTicketBody = (ticketBody) => {
    showSwal(ticketBody, undefined, "مشاهده کردم", () => { });
}


const answerToTicket = async (ticketID) => {
    swal({
        title: "متن پاسخ را وارد نمایید:",
        content: "input",
        buttons: "ثبت پاسخ",
    }).then((body) => {
        if (body) {
            fetch(`http://localhost:4000/v1/tickets/answer`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ticketID, body }),
            }).then((res) => {
                if (res.ok) {
                    showSwal(
                        "پاسخ مورد نظر با موفقیت ثبت شد",
                        "success",
                        "خیلی هم عالی",
                        () => {
                            getAndShowAllTickets();
                        }
                    );
                }
            });
        }
    })

}

export {
    getAndShowAllTickets,
    showTicketBody,
    answerToTicket
};
