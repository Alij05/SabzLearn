import { getAndShowAllContacts, showContactMessage, answerContact, deleteContact } from "./funcs/contacts.js";

// Bind
window.showContactMessage = showContactMessage
window.answerContact = answerContact
window.deleteContact = deleteContact


window.addEventListener('load', () => {
    getAndShowAllContacts()
})