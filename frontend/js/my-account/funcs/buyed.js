import { getToken } from "../../funcs/utils.js"


const getBuyedCourseDetails = async () => {
    const res = await fetch('http://localhost:4000/v1/users/courses', {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })

    const buyedCourses = await res.json()

    return buyedCourses
}


const showBuyedCoursesByUserFilterSelection = async (buyedCourses) => {
    const buyedBoxWrapper = document.querySelector('#buyed-box-wrapper')

    buyedBoxWrapper.innerHTML = ''

    if (buyedCourses.length) {
        buyedCourses.forEach(course => {
            buyedBoxWrapper.insertAdjacentHTML('beforeend', `
                <div class="main__box">
                    <div class="main__box-right">
                        <a class="main__box-img-link" href="../../course.html?name=${course.course.shortName}">
                            <img class="main__box-img img-fluid" src="http://localhost:4000/courses/covers/${course.course.cover}">
                        </a>
                    </div>
                    <div class="main__box-left">
                        <a href="#" class="main__box-title">${course.course.name}</a>
                        <p style="margin: 0.75rem 0 1.5rem; font-size: 14px">${course.course.shortName}</p>
                        <div class="main__box-bottom">
                            <div class="main__box-all">
                                <span class="main__box-all-text">مبلغ:</span>
                                <span class="main__box-all-value">${course.course.price === 0 ? 'رایگان' : `${course.course.price.toLocaleString()} تومان`}</span>
                            </div>
                            <div class="main__box-completed">
                                <span class="main__box-completed-text">وضعیت  :</span>
                                <span class="main__box-completed-value">${course.course.isComplete === 1 ? 'تکمیل شده' : 'در حال برگزاری'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                `)
        })

    } else {
        buyedBoxWrapper.insertAdjacentHTML('beforeend', `
            <div class="alert alert-danger">دوره ای برای این بخش وجود نداره:(</div>
            `)
    }


}


const filterCourses = (array, filterMethod) => {
    let filteredCourses = [...array]

    switch (filterMethod) {
        case 'all':
            filteredCourses = filteredCourses
            break

        case 'free':
            filteredCourses = filteredCourses.filter(course => course.price === 0)
            break

        case 'not-free':
            filteredCourses = filteredCourses.filter(course => course.price !== 0)
            break

        case 'completed':
            filteredCourses = filteredCourses.filter(course => course.course.isComplete === 1)
            break
    }

    return filteredCourses

}


export {
    getBuyedCourseDetails,
    showBuyedCoursesByUserFilterSelection,
    filterCourses,
}