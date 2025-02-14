import { getToken } from "../../funcs/utils.js"

const getAndShowMainPageInfos = async () => {
    const homeBoxRegisters = document.querySelector('#home-box-registers')

    const lastUsersWrapper = document.querySelector('#last-users-wrapper')
    const homeBoxCourses = document.querySelector('#home-box-courses')
    const homeBoxSessions = document.querySelector('#home-box-sessions')
    
    const homeBoxRegistersSpan = document.querySelector('#home-box-registers-span')
    const homeBoxCoursesSpan = document.querySelector('#home-box-courses-span')
    const homeBoxSessionsSpan = document.querySelector('#home-box-sessions-span')

    const res = await fetch('http://localhost:4000/v1/infos/p-admin', {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })

    const mainInfos = await res.json()

    homeBoxRegisters.innerHTML = mainInfos.infos[0].title
    homeBoxCourses.innerHTML = mainInfos.infos[1].title
    homeBoxSessions.innerHTML = mainInfos.infos[2].title
    
    homeBoxRegistersSpan.innerHTML = mainInfos.infos[0].count
    homeBoxCoursesSpan.innerHTML = mainInfos.infos[1].count
    homeBoxSessionsSpan.innerHTML = mainInfos.infos[2].count

    mainInfos.lastUsers.forEach((lastUser, index) => {
        lastUsersWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td id="id">${index + 1}</td>
                <td id="price">${lastUser.name}</td>
                <td id="registers">${lastUser.username}</td>
                <td id="support">${lastUser.phone}</td>
                <td id="categoryID">${lastUser.email}</td>
            </tr>
            `)
    })

}


export {
    getAndShowMainPageInfos,
}