// 특정 url에 있는 내용을 selector(타겟) 에 집어넣는 함수
async function includeHTML(url, selector) {
    try {
        const response = await fetch(url);
        if(!response.ok) throw new Error('파일 불러오기 실패');

        const html = await response.text();
        const target = document.querySelector(selector);

        if(target) {
            target.innerHTML = html;
        }
    } catch (error) {
        console.error('HTML 로드 중 오류 발생 : ', error);
    }
}

// 특정 요소에 클래스를 부여하는 함수
function setClass(selector, className) {
    const targets = document.querySelectorAll(selector);

    targets.forEach(element => {
        if(element) {
            element.classList.add(className);
        }
    });
}

includeHTML('./header.html', '#header');
includeHTML('./footer.html', '#footer');
setClass('#header', 'color_header')
setClass('#footer', 'color_footer')