// 특정 url에 있는 내용을 selector(타겟) 에 집어넣는 함수
async function includeFile(url, selector) {
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('파일 불러오기 실패');

        const html = await response.text();
        includeHTML(html, selector);
    } catch (error) {
        console.error('HTML 로드 중 오류 발생 : ', error);
    }
}

// 타겟에 html요소를 추가하는 함수
function includeHTML(html, selector) {
    const target = document.querySelector(selector);

    if(target) {
        target.innerHTML += html;
    }
}

// 특정 요소에 클래스를 부여하는 함수
function addClass(selector, className) {
    const targets = document.querySelectorAll(selector);

    targets.forEach(element => {
        if(element) {
            element.classList.add(className);
        }
    });
}

// 특정 요소에 클래스를 제거하는 함수
function removeClass(selector, className) {
    const targets = document.querySelectorAll(selector);

    targets.forEach(element => {
        if(element) {
            element.classList.remove(className);
        }
    });
}

// header 와 footer 불러오기, 아이콘 교체
async function initLayout() {
    // header 불러오기
    await includeFile('./header.html', '#header');
    addClass('#header', 'color_header');

    // footer 불러오기
    await includeFile('./footer.html', '#footer');
    addClass('#footer', 'color_footer');

    // favicon 불러오기
    const icon = `<link rel="icon" type="image/png" href="./img/logo_small.png">`;
    includeHTML(icon, 'head');
}

initLayout();

// 메뉴 hover 효과
