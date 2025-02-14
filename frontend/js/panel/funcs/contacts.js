import { getToken, showSwal } from "../../funcs/utils.js"

const getAndShowAllContacts = async () => {
    const contactsWrapper = document.querySelector('#contacts-wrapper')

    const res = await fetch(`http://localhost:4000/v1/contact`)
    const allContacts = await res.json()

    contactsWrapper.innerHTML = ''
    allContacts.forEach((contact, index) => {
        contactsWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td id="id">${index + 1}</td>
                <td id="price">${contact.name}</td>
                <td id="registers">${contact.email}</td>
                <td id="support">${contact.phone}</td>
                <td id="categoryID">${contact.createdAt.slice(0, 10)}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="see-btn" onclick="showContactMessage('${contact.body}')">مشاهده</button>
                </td>
                <td>
                    ${contact.answer ?
                `<span class="btn btn-secondary" >پاسخ داده شده</span>`
                :
                `<button type="button" class="btn btn-success" id="answer-btn" onclick=answerContact('${contact.email}')>پاسخ</button>`}
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id="delete-btn" onclick=deleteContact('${contact._id}')>حذف</button>
                </td>
            </tr>
            `)
    })


}


const showContactMessage = (messageBody) => {
    showSwal(`${messageBody}`, "", "پاسخ",
        (result) => { })
}


const answerContact = (userEmail) => {

    swal({
        title: 'پاسخ خود را وارد کنید:',
        content: 'input',
        button: 'ثبت پاسخ'
    }).then(result => {
        // The Result is the Input Answer Text

        if (result) {
            let adminAnswerObject = {
                email: userEmail,
                answer: result
            }

            showSwal('آیا از ارسال پاسخ مطمئنی؟',
                'info',
                ['خیر', 'بلی'],
                async (result) => {
                    if (result) {
                        const res = await fetch(`http://localhost:4000/v1/contact/answer`, {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(adminAnswerObject)
                        })

                        if (res.ok) {
                            showSwal('پاسخ شما با موفقیت ارسال شد', 'success', 'Ok', () => {
                                getAndShowAllContacts()
                            })
                        }
                    }

                })
        }

    })

}


const deleteContact = (contactID) => {
    showSwal('آیا از حذف پیغام مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/contact/${contactID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                })

                if (res.ok) {
                    showSwal('پیغام با موفقیت حذف شد', 'success', 'Ok', () => {
                        getAndShowAllContacts()
                    })
                }
            }

        })
}


export {
    getAndShowAllContacts,
    showContactMessage,
    answerContact,
    deleteContact
}