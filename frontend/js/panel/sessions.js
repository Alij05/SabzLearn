import { getAndShowAllSessions, createNewSession, prepareCreateNewSessionForm, deleteSession } from "./funcs/sessions.js";

// Bind
window.deleteSession = deleteSession


window.addEventListener('load', () => {
    const createSessionBtn = document.querySelector('#create-session-btn')

    getAndShowAllSessions()
    prepareCreateNewSessionForm()

    createSessionBtn.addEventListener('click', event => {
        event.preventDefault()
        console.log('click');
        
        createNewSession()
    })

})