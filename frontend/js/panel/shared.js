import { insertNotificationHtmlTemplate, seenNotification } from "./funcs/notification.js";
import { getAdminInfos, logOut } from "./funcs/utils.js";
import { activeMenu, getAndShowSidebarList } from "./funcs/shared.js";

const $ = document


// Binding the Function
window.seenNotification = seenNotification
window.activeMenu = activeMenu

window.addEventListener('load', () => {
    const adminName = $.querySelector('#admin-name')
    const adminProfile = $.querySelector('#admin-profile-image')
    const notificationsIcon = $.querySelector('#notifications-icon')
    const homeNotificationModal = $.querySelector('.home-notification-modal')

    // Show The SideBar Right List
    getAndShowSidebarList()


    getAdminInfos().then(admin => {
        // Protect CMS Routes
        if (admin.role === 'ADMIN') {
            // Show Admin Name in CMS Homepage
            adminName.innerHTML = admin.name
            adminProfile.setAttribute('src', `../../images/profile/profile.jpg`)
        } else {
            location.replace('../../login.html')
        }

        notificationsIcon.addEventListener('mouseenter', () => {
            homeNotificationModal.classList.add('active-modal-notfication')
        })

        homeNotificationModal.addEventListener('mouseleave', () => {
            homeNotificationModal.classList.remove('active-modal-notfication')
        })

        // Show The Notifications
        insertNotificationHtmlTemplate(admin.notifications)

    })

    // Log Out Button
    const logOutBtn = document.querySelector('#log-out')
    logOutBtn.addEventListener('click', (event) => {
        logOut()
    })


})