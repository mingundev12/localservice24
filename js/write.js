// write.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("complaintForm");

    // 제목 글자수
    const titleInput = document.getElementById("title");
    const titleCount = document.getElementById("titleCount");
    const titleMax = 500;

    titleInput.addEventListener("input", function () {
        if (titleInput.value.length > titleMax) {
            titleInput.value = titleInput.value.slice(0, titleMax);
        }
        titleCount.textContent = titleInput.value.length;
    });

    // 내용 글자수
    const contentInput = document.getElementById("content");
    const charCount = document.getElementById("charCount");
    const contentMax = 50000;

    contentInput.addEventListener("input", function () {
        if (contentInput.value.length > contentMax) {
            contentInput.value = contentInput.value.slice(0, contentMax);
        }
        charCount.textContent = `${contentInput.value.length} / ${contentMax}`;
    });

    // 등록 버튼(submit) 이벤트
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // 페이지 새로고침 방지

        const title = titleInput.value.trim();
        const category = document.getElementById("category").value;
        const content = contentInput.value.trim();

        // 유효성 체크
        if (!title || !category || !content) {
            alert("모든 항목을 입력해주세요!");
            return;
        }

        // 글자수 체크
        if (title.length > titleMax) {
            alert(`제목은 최대 ${titleMax}자까지 입력 가능합니다.`);
            return;
        }
        if (content.length > contentMax) {
            alert(`내용은 최대 ${contentMax}자까지 입력 가능합니다.`);
            return;
        }

        // 등록 완료 메시지
        alert("등록이 완료되었습니다.");

        // 폼 초기화
        form.reset();
        titleCount.textContent = 0;
        charCount.textContent = `0 / ${contentMax}`;
    });

    // 취소 버튼 이벤트
    const resetBtn = form.querySelector('button[type="reset"]');
    resetBtn.addEventListener("click", function (e) {
        e.preventDefault(); // 브라우저 기본 동작 방지
        alert("등록이 취소되었습니다.");
        form.reset();
        titleCount.textContent = 0;
        charCount.textContent = `0 / ${contentMax}`;
    });
});