const getAndShowSidebarList = () => {
    const sidebarList = document.querySelector('#sidebar-list')

    sidebarList.insertAdjacentHTML('beforeend', `
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../main/index.html"><span>صفحه اصلی</span></a></li>
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../courses/index.html"><span>دوره ها</span></a></li>
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../menus/index.html"><span>منو ها</span></a></li>
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../users/index.html"><span>کاربران</span></a></li>
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../categories/index.html"><span>دسته‌بندی‌ ها</span></a></li>
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../contacts/index.html"><span>پیغام ها</span></a></li>
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../sessions/index.html"><span>جلسات دوره</span></a></li>
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../articles/index.html"><span>مقاله ها</span></a></li>
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../comments/index.html"><span>کامنت ها</span></a></li>
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../tickets/index.html"><span>تیکت ها</span></a></li>
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../discounts/index.html"><span>کدهای تخفیف</span></a></li>
        <li class="sidebar-list-item" onclick="activeMenu(${event})"><a href="../campaign/index.html"><span>برگزاری کمپین</span></a></li>
        <li class="sidebar-list-item" id="log-out"><a href="#"><span>خروج</span></a></li>
        `)
}


const activeMenu = (event) => {
    document.querySelector('.activeMenu').classList.remove('activeMenu')
    event.target.classList.add('active-menu')
}


export {
    activeMenu,
    getAndShowSidebarList,
}