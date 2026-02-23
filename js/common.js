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

includeHTML('./header.html', '#header');