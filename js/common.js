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
async function init() {
    // 데이터 불러오기
    await loadDatas();

    // header 불러오기
    const header = document.querySelector('#header');
    await includeFile(header, './header.html');
    addClass(header, 'color_header');

    highlightCurrentMenu();
    
    // footer 불러오기
    const footer = document.querySelector('#footer');
    await includeFile(footer, './footer.html');
    addClass(footer, 'color_footer');

    // favicon 불러오기
    const head = document.querySelector('head');
    const icon = `<link rel="icon" type="image/png" href="./img/logo_small.png">`;
    includeHTML(head, icon, true);

    if(typeof renderList === 'function') {
        renderList();
    }
}

let boards;
let staffs;
let categories;
init();


// 데이터 불러오기
async function loadDatas() {
    const boardUrl = "./js/complaints.json";
    const staffUrl = "./js/staff.json";
    const categoryUrl = "./js/category.json";

    // 로컬 스토리지에 저장된 값 불러오기
    const localBoards = localStorage.getItem("boards");
    const localStaffs = localStorage.getItem("staffs");
    const localCategories = localStorage.getItem("categories");

    // 로컬 스토리지에 저장된 값이 없을 때
    if(!localBoards) {
        // 파일로부터 불러온 값을 변수에 저장
        boards = await getJson(boardUrl);
        staffs = await getJson(staffUrl);
        categories = await getJson(categoryUrl);

        // 로컬 스토리지에 변수값 저장
        saveDatas();
    } else {
        // 로컬 스토리지에 값이 저장되어 있을 경우
        // 불러온 값(문자열)을 json 으로 변환하여 저장
        boards = JSON.parse(localBoards);
        staffs = JSON.parse(localStaffs);
        categories = JSON.parse(localCategories);
    }
}


// 로컬 스토리지에 변수값 저장
function saveDatas() {
    localStorage.setItem("boards", JSON.stringify(boards));
    localStorage.setItem("staffs", JSON.stringify(staffs));
    localStorage.setItem("categories", JSON.stringify(categories));
}

// 현재 페이지 하이라이트 처리
function highlightCurrentMenu() {
    const currentPage = window.location.pathname.split('/').pop();

    const menus = document.querySelectorAll(".menuItem");

    menus.forEach(menu => {
        const menuLink = menu.querySelector('a').getAttribute('href');

        if(menuLink && menuLink.includes(currentPage)) {
            addClass(menu, 'active');
        }
    });
}