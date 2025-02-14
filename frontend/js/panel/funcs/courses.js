import { getToken, showSwal } from "../../funcs/utils.js"

const getAndShowAllCourses = async () => {
    const coursesWrapper = document.querySelector('#courses-wrapper')

    const res = await fetch(`http://localhost:4000/v1/courses`)
    const allCourses = await res.json()

    coursesWrapper.innerHTML = ''
    allCourses.forEach((course, index) => {
        coursesWrapper.insertAdjacentHTML('beforeend', `
            <tr>
                <td>
                    <input type="checkbox" class="checkbox-table form-check-input">
                </td>
                <td id="id">${index + 1}</td>
                <td id="name">
                  <a href="file:///D:/Project/Admin_Panel/Product/index.html?id=${course._id}">${course.name}</a>
                </td>
                <td id="price">${course.price ? course.price : 'رایگان'}</td>
                <td id="registers">${course.registers}</td>
                <td id="support">${course.support}</td>
                <td id="categoryID">${course.categoryID}</td>
                <td id="rate">${course.courseAverageScore}</td>
                <td id="condition">${course.isComplete ? 'تکمیل شده' : 'در حال برگزاری'}</td>
                <td>
                    <button type="button" class="btn btn-primary" id="edit-btn">ویرایش</button>
                </td>
                <td>
                    <button type="button" class="btn btn-danger" id="delete-btn" onclick=deleteCourse('${course._id}')>حذف</button>
                </td>
            </tr>
            `)
    })

}


const activeMenu = () => {
    const sidebarMenus = document.querySelectorAll('.sidebar-list-item ')
    
    sidebarMenus.forEach(sidebarMenu => {
        sidebarMenu.addEventListener('click', () => {
            document.querySelector(`.active-menu`).classList.remove('active-menu')
            sidebarMenu.classList.add('active-menu')
        })
    })

}


let categoryID = -1
let status = 'start'
let courseCover = undefined
const prepareCreateCourseForm = async () => {
    const categoryList = document.querySelector('.category-list')
    const courseStatusPresellElem = document.querySelector('#presell')
    const courseStatusStartElem = document.querySelector('#start')
    const courseCoverElem = document.querySelector('#course-cover')

    const res = await fetch(`http://localhost:4000/v1/category`)
    const categories = await res.json()


    categories.forEach(category => {
        categoryList.insertAdjacentHTML('beforeend', `
            <option value=${category._id}>${category.title}</option>
            `)        
    })

    categoryList.addEventListener('change', (event) => {
        categoryID = event.target.value
    })

    courseStatusPresellElem.addEventListener('change', (event) => {
        status = event.target.value
    })

    courseStatusStartElem.addEventListener('change', (event) => {
        status = event.target.value
    })

    courseCoverElem.addEventListener('change', (event) => {
        // console.log(event.target.files);
        courseCover = event.target.files[0]
    })

}


const createNewCourse = async () => {
    const courseNameElem = document.querySelector('#course-name')
    const coursePriceElem = document.querySelector('#course-price')
    const courseDescriptionElem = document.querySelector('#course-description')
    const courseShortNameElem = document.querySelector('#course-shortname')
    const courseSupportElem = document.querySelector('#course-support')

    const formData = new FormData()
    formData.append('name', courseNameElem.value.trim())
    formData.append('description', courseDescriptionElem.value.trim())
    formData.append('shortName', courseShortNameElem.value.trim())
    formData.append('categoryID', categoryID)
    formData.append('price', coursePriceElem.value.trim())
    formData.append('support', courseSupportElem.value.trim())
    formData.append('status', status)
    formData.append('cover', courseCover)
    
    const res = await fetch(`http://localhost:4000/v1/courses`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: formData
    })

    console.log(res);
    if(res.ok) {
        showSwal('دوره با موفقیت ثبت شد', 'success', 'Ok', (result) => {
            getAndShowAllCourses()
        })
    }

}


const deleteCourse = (courseID) => {
    showSwal('آیا از حذف دوره مطمئنی؟',
        'warning',
        ['خیر', 'بلی'],
        (result) => {
        // console.log(result);
        if(result) {
            confirmDeleteCourse(courseID)
        }
    })
}


const confirmDeleteCourse = async (courseID) => {
    const res = await fetch(`http://localhost:4000/v1/courses/${courseID}`, {
        method: 'DELETE', 
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    
    const result = await res.json()
    
    if(res.ok) {
        showSwal('دوره با موفقیت حذف شد', 'success', 'Ok', () => {
            getAndShowAllCourses()
        })
    }

}





export {
    getAndShowAllCourses,
    activeMenu,
    createNewCourse,
    prepareCreateCourseForm,
    deleteCourse,
}