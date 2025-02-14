import { getToken, showSwal } from "../../funcs/utils.js"

const getAndShowAllComments = async () => {
    const commentsWrapper = document.querySelector('#comments-wrapper')

    const res = await fetch(`http://localhost:4000/v1/comments`)
    const allComments = await res.json()

    commentsWrapper.innerHTML = ''
    allComments.forEach((comment, index) => {
        console.log(comment);

        commentsWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td id="id">${index + 1}</td>
                <td id="price">${comment.creator.name}</td>
                <td id="registers">${comment.course}</td>
                <td id="support">${comment.createdAt.slice(0, 10)}</td>
                <td id="support">${comment.score}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="show-btn" onclick="showComment('${comment.body}')">مشاهده</button>
                </td>
                ${comment.answerContent ?
                `<td>
                        <button class="btn btn-secondary">پاسخ داده شد</button>
                    </td>`
                :
                `<td>
                        <button type="button" class="btn btn-success" id="answer-btn" onclick="answerComment('${comment._id}')">پاسخ</button>
                    </td>`

            }
                <td>
                    <button type="button" class="btn btn-info" id="confirm-btn" onclick="confirmComment('${comment._id}')">تایید</button>
                </td>
                <td>
                    <button type="button" class="btn btn-warning" id="reject-btn" onclick="rejectComment('${comment._id}')">رد</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id="delete-btn" onclick="deleteComment('${comment._id}')">حذف</button>
                </td>
            </tr>
        `)
    })

}


const showComment = (commentBody) => {
    showSwal(`${commentBody}`, "", "پاسخ",
        (result) => { })
}


const answerComment = (commentID) => {
    swal({
        title: ':پاسخ',
        content: 'input',
        button: 'ثبت پاسخ'
    }).then(result => {
        // The Result is the Input Answer Text
        if (result) {
            let adminAnswerObject = {
                body: result
            }

            showSwal('آیا از ارسال پاسخ مطمئنی؟',
                'info',
                ['خیر', 'بلی'],
                async (result) => {
                    if (result) {
                        const res = await fetch(`http://localhost:4000/v1/comments/answer/${commentID}`, {
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(adminAnswerObject)
                        })

                        if (res.ok) {
                            showSwal('پاسخ شما با موفقیت ارسال شد', 'success', 'Ok', () => {
                                getAndShowAllComments()
                            })
                        }
                    }

                })
        }
    })
}


const confirmComment = (commentID) => {
    showSwal('آیا از تایید کامنت مطمئنی؟',
        'info',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/comments/accept/${commentID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                })

                if (res.ok) {
                    showSwal('کامنت با موفقیت تایید شد', 'success', 'Ok', () => {
                        getAndShowAllComments()
                    })
                }
            }

        })
}


const rejectComment = (commentID) => {
    showSwal('آیا از رد کردن کامنت مطمئنی؟',
        'error',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                })

                if (res.ok) {
                    showSwal('کامنت با موفقیت رد     شد', 'success', 'Ok', () => {
                        getAndShowAllComments()
                    })
                }
            }

        })
}

const deleteComment = (commentID) => {
    showSwal('آیا از حذف کامنت مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/comments/${commentID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                })

                if (res.ok) {
                    showSwal('کامنت با موفقیت حذف شد', 'success', 'Ok', () => {
                        getAndShowAllComments()
                    })
                }
            }

        })
}


export {
    getAndShowAllComments,
    showComment,
    answerComment,
    confirmComment,
    rejectComment,
    deleteComment,

}