// 특정 url에 있는 내용을 object(타겟) 에 집어넣는 함수
async function includeFile(object, url, isAppend = false) {
    const response = await loadFile(url);

    if (response) {
        const html = await response.text();
        includeHTML(object, html, isAppend);
    }
}

// 특정 url에 있는 File 을 반환하는 함수
async function loadFile(url) {
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('파일 불러오기 실패');
        return response;
    } catch (error) {
        console.error('HTML 로드 중 오류 발생 : ', error);
        return null;
    }
}

// object에 html요소를 추가하는 함수
function includeHTML(object, html, isAppend = false) {

    if(object) {
        if(isAppend) {
            object.innerHTML += html;
        } else {
            object.innerHTML = html;
        }
    }
}

// json 객체 배열을 반환하는 함수
async function getJson(url) {
    const response = await loadFile(url);

    if(response) {
        const json = await response.json();
        return json;
    } else {
        return null;
    }
}

// 특정 요소에 클래스를 부여하는 함수
function addClass(object, className) {
    if(!object) return;

    const elements = 
        (object instanceof NodeList || Array.isArray(object)) ?
            object : [object];
    
    elements.forEach(element => {
        if(element) {
            element.classList.add(className);
        }
    });
}

// 특정 요소에 클래스를 제거하는 함수
function removeClass(object, className) {
    if(!object) return;

    const elements = 
        (object instanceof NodeList || Array.isArray(object)) ?
            object : [object];
    
    elements.forEach(element => {
        if(element) {
            element.classList.remove(className);
        }
    });
}

// header 와 footer 불러오기, 아이콘 교체
async function initLayout() {
    // header 불러오기
    const header = document.querySelector('#header');
    await includeFile(header, './header.html');
    addClass(header, 'color_header');
    
    // footer 불러오기
    const footer = document.querySelector('#footer');
    await includeFile(footer, './footer.html');
    addClass(footer, 'color_footer');

    // favicon 불러오기
    const head = document.querySelector('head');
    const icon = `<link rel="icon" type="image/png" href="./img/logo_small.png">`;
    includeHTML(head, icon, true);
}

initLayout();
const staffUrl = "./js/staff.json";
const categoryUrl = "./js/category.json";
const boardUrl = "./js/complaints.json";

// 메뉴 hover 효과
const menus = document.querySelectorAll(".menuItem");
menus.forEach(menu => {
    menu.addEventListener('mouseenter', (e) => {
        addClass(e.target, 'color_menu_hover');
    });
    menu.addEventListener('mouseout', (e) => {
        removeClass(e.target, 'color_menu_hover');
    });
});