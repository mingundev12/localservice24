document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("complaintForm");

    // 제목
    const titleInput = document.getElementById("title");
    const titleCharCount = document.getElementById("titleCount"); // 수정된 id
    const titleMax = 500;

    titleInput.addEventListener("input", function () {
        if (titleInput.value.length > titleMax) {
            titleInput.value = titleInput.value.slice(0, titleMax);
        }
        titleCharCount.textContent = `${titleInput.value.length} / ${titleMax}`;
    });

    // 내용
    const contentInput = document.getElementById("content");
    const contentCharCount = document.getElementById("contentCount"); // 수정된 id
    const contentMax = 50000;

    contentInput.addEventListener("input", function () {
        if (contentInput.value.length > contentMax) {
            contentInput.value = contentInput.value.slice(0, contentMax);
        }
        contentCharCount.textContent = `${contentInput.value.length} / ${contentMax}`;
    });

    // 제출
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const title = titleInput.value.trim();
        const category = document.getElementById("category").value;
        const content = contentInput.value.trim();

        if (!title || !category || !content) {
            alert("모든 항목을 입력해주세요!");
            return;
        }

        alert("등록이 완료되었습니다.");
        form.reset();
        titleCharCount.textContent = `0 / ${titleMax}`;
        contentCharCount.textContent = `0 / ${contentMax}`;
    });

    // 취소
    const resetBtn = form.querySelector('button[type="reset"]');
    resetBtn.addEventListener("click", function (e) {
        e.preventDefault();
        alert("등록이 취소되었습니다.");
        form.reset();
        titleCharCount.textContent = `0 / ${titleMax}`;
        contentCharCount.textContent = `0 / ${contentMax}`;
    });
});


init();