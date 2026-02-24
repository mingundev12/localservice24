// write.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("complaintForm");

    // 제목 입력 관련
    const titleInput = document.getElementById("title");
    const titleCharCount = document.getElementById("charCount"); // 제목 글자수 표시
    const titleMax = 500;

    titleInput.addEventListener("input", function () {
        if (titleInput.value.length > titleMax) {
            titleInput.value = titleInput.value.slice(0, titleMax);
        }
        titleCharCount.textContent = `${titleInput.value.length} / ${titleMax}`;
    });

    // 내용 입력 관련
    const contentInput = document.getElementById("content");
    const contentCharCount = document.querySelectorAll("#charCount")[1]; // 두 번째 charCount
    const contentMax = 50000;

    contentInput.addEventListener("input", function () {
        if (contentInput.value.length > contentMax) {
            contentInput.value = contentInput.value.slice(0, contentMax);
        }
        contentCharCount.textContent = `${contentInput.value.length} / ${contentMax}`;
    });

    // 폼 제출
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = titleInput.value.trim();
        const category = document.getElementById("category").value;
        const content = contentInput.value.trim();

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

        alert("등록이 완료되었습니다.");
        form.reset();
        titleCharCount.textContent = `0 / ${titleMax}`;
        contentCharCount.textContent = `0 / ${contentMax}`;
    });

    // 취소 버튼
    const resetBtn = form.querySelector('button[type="reset"]');
    resetBtn.addEventListener("click", function (e) {
        e.preventDefault();
        alert("등록이 취소되었습니다.");
        form.reset();
        titleCharCount.textContent = `0 / ${titleMax}`;
        contentCharCount.textContent = `0 / ${contentMax}`;
    });
});