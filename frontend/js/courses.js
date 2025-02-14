import { showAllCoursesInCoursesPage } from "./funcs/shared.js";
import { addParamToURL } from "./funcs/utils.js";

window.addParamToURL = addParamToURL

window.addEventListener('load', () => {
    showAllCoursesInCoursesPage()
})