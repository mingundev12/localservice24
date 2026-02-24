// write.js
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("complaintForm");

    // 등록 버튼(submit) 이벤트
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // 페이지 새로고침 방지

        // 입력값 가져오기
        const title = document.getElementById("title").value.trim();
        const category = document.getElementById("category").value;
        const content = document.getElementById("content").value.trim();

        // 유효성 체크
        if (!title || !category || !content) {
            alert("모든 항목을 입력해주세요!");
            return;
        }

        // 등록 완료 메시지
        alert("등록이 완료되었습니다.");

        // 필요시 폼 초기화
        form.reset();
    });

    // 취소 버튼 이벤트
    const resetBtn = form.querySelector('button[type="reset"]');
    resetBtn.addEventListener("click", function (e) {
        e.preventDefault(); // 브라우저 기본 동작 방지
        // 취소 메시지
        alert("등록이 취소되었습니다.");
        // 폼 초기화
        form.reset();
    });
});