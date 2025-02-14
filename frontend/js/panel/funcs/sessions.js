import { getToken, showSwal } from "../../funcs/utils.js"

const getAndShowAllSessions = async () => {
    const courseSessionsWrapper = document.querySelector('#course-sessions-wrapper')

    const res = await fetch(`http://localhost:4000/v1/courses/sessions`)
    const allSessions = await res.json()

    courseSessionsWrapper.innerHTML = ''
    allSessions.forEach((session, index) => {
        courseSessionsWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td id="id">${index + 1}</td>
                <td id="price">${session.title}</td>
                <td id="registers">${session.time}</td>
                <td id="support">${session.createdAt.slice(0, 10)}</td>
                <td id="support">${session.course.name}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="delete-btn" onclick=editSession('${session._id}')>ویرایش</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id="edit-btn" onclick="deleteSession('${session._id}')">حذف</button>
                </td>
            </tr>
            `)

    })

}


let isSessionFree = 0
let sessionVideo = null
let courseID = null
const prepareCreateNewSessionForm = async () => {
    const courseNameWrapper = document.querySelector('#courses-select')
    const freeSession = document.querySelector('#free')
    const notFreeSession = document.querySelector('#not-free')
    const sessionVideElem = document.querySelector('#session-video')

    const res = await fetch(`http://localhost:4000/v1/courses`)
    const allCourses = await res.json()

    allCourses.forEach(course => {
        courseNameWrapper.insertAdjacentHTML('beforeend', `
            <option value=${course._id}>${course.name}</option>
            `)
    })

    courseNameWrapper.addEventListener('change', (event) => {
        courseID = event.target.value
    })

    freeSession.addEventListener('change', (event) => {
        isSessionFree = event.target.value
    })

    notFreeSession.addEventListener('change', (event) => {
        isSessionFree = event.target.value
    })

    sessionVideElem.addEventListener('change', (event) => {
        sessionVideo = event.target.files[0]
    })

}


const createNewSession = async () => {
    const sessionName = document.querySelector('#session-name')
    const sessionTime = document.querySelector('#session-time')

    let formData = new FormData()

    formData.append('title', sessionName.value.trim())
    formData.append('time', sessionTime.value.trim())
    formData.append('video', sessionVideo)
    formData.append('free', isSessionFree)

    const res = await fetch(`http://localhost:4000/v1/courses/${courseID}/sessions`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: formData
    })

    if (res.ok) {
        showSwal("جلسه مورد نظر با موفقیت ثبت شد", "success", "ok",
            (result) => { getAndShowAllSessions() })
    }

}


const deleteSession = async (sessionID) => {
    showSwal('آیا از حذف جلسه مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        async (result) => {
            if (result) {
                const res = await fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${getToken()}`
                    }
                })

                if (res.ok) {
                    showSwal('جلسه با موفقیت حذف شد', 'success', 'Ok', () => {
                        getAndShowAllSessions()
                    })
                }
            }

        })

}



export {
    getAndShowAllSessions,
    prepareCreateNewSessionForm,
    createNewSession,
    deleteSession,
}