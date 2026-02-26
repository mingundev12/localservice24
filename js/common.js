// 데이터 저장과 관련한 변수 선언
let boards;
let staffs;
let categories;


// 페이지를 불러올 때 실행하는 함수
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

    if(typeof render === 'function') {
        render();
    }
}

// 특정 url 에 있는 HTML 파일을 불러와서 대상에 집어넣는 함수
async function includeFile(object, url, isAppend = false) {
    const response = await loadFile(url);

    if (response) {
        const html = await response.text();
        includeHTML(object, html, isAppend);
    }
}

// 특정 url 에 있는 json 파일을 불러와서 반환하는 함수
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

// 대상에 문자열 형태로 된 HTML 태그들을 집어넣는 함수
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

    // 들어온 매개변수 object에 forEach로 클래스를 부여하기 위해서
    // object가 배열이나 리스트가 아닐 경우엔 배열 형태로 elements에 저장
    // 배열이거나 리스트일 경우에는 object 그대로 저장
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

// 메뉴 리스트에서 현재 페이지와 같은 요소를 하이라이트 처리
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

// 게시물의 렌더링을 원활하게 하기 위해서
// staff 와 category 의 이름값을 board 에 넣어서 합치는 함수
function combineList() {
    const list = boards.map(board => {
        const staff = staffs.find(staff => staff.id === board.staff_id);
        const category = categories.find(category => category.id === board.category_id);

        return {
            ...board,
            manager : staff ? staff.name : '미배정',
            category : category ? category.category_name : '기타'
        };
    });
    return list;
}