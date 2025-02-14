import { insertNotificationHtmlTemplate, seenNotification } from "./funcs/notification.js";
import { getAdminInfos } from "./funcs/utils.js";
import { getAndShowMainPageInfos } from "./funcs/index.js";

const $ = document


// Binding the Function
window.seenNotification = seenNotification


window.addEventListener('load', () => {
    const adminName = $.querySelector('#admin-name')
    const adminWelcomeName = $.querySelector('#admin-welcome-name')
    const adminProfile = $.querySelector('#admin-profile')
    const notificationsIcon = $.querySelector('#notifications-icon')
    const homeNotificationModal = $.querySelector('.home-notification-modal')

    getAdminInfos().then(admin => {
        // Protect CMS Routes
        if (admin.role === 'ADMIN') {
            // Show Admin Name in CMS Homepage
            adminName.innerHTML = admin.name
            adminWelcomeName.innerHTML = admin.name
            // adminProfile.setAttribute('src', `${admin.profile}`)
        } else {
            location.replace('../../login.html')
        }

        notificationsIcon.addEventListener('mouseenter', () => {
            homeNotificationModal.classList.add('active-modal-notfication')
        })

        homeNotificationModal.addEventListener('mouseleave', () => {
            homeNotificationModal.classList.remove('active-modal-notfication')
        })

        // Show the Man Infos
        getAndShowMainPageInfos()

        // Show The Notifications
        insertNotificationHtmlTemplate(admin.notifications)



    })
})