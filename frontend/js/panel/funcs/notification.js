import { getToken } from "../../funcs/utils.js";

const insertNotificationHtmlTemplate = (notifications) => {
    const homeNotificationModalList = document.querySelector('.home-notification-modal-list')

    homeNotificationModalList.innerHTML = ''
    if (notifications.length) {
        notifications.forEach(notif => {
            homeNotificationModalList.insertAdjacentHTML('beforeend', `
                <li class="home-notification-modal-item">
                    <span class="home-notification-modal-text">${notif.msg}</span>
                    <a onclick='seenNotification(${JSON.stringify(notifications)}, ${JSON.stringify(notif._id)})'>دیدم</a>
                </li>
                `)
        })
    } else {
        homeNotificationModalList.insertAdjacentHTML('beforeend', `
            <li class="home-notification-modal-item">
                <span class="home-notification-modal-text">برای شما هنوز پیغامی وجود ندارد</span>
            </li>
            `)
    }
}


const seenNotification = async (notifications, notficationID) => {
    const res = await fetch(`http://localhost:4000/v1/notifications/see/${notficationID}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })

    const result = await res.json()

    removeNotifications(notifications, notficationID)

}

// Remove Notification from ModalBox Real TIme
const removeNotifications = (notifications, notficationID) => {
    const filteredNotifications = notifications.filter(notif => {
        return notif._id !== notficationID
    })

    insertNotificationHtmlTemplate(filteredNotifications)
}





export {
    insertNotificationHtmlTemplate,
    seenNotification,
    removeNotifications
}