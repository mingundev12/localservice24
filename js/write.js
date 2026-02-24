document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("complaintForm");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const categorySelect = document.getElementById("category");
    const fileInput = document.getElementById("file");
    const filePreview = document.getElementById("filePreview");
    const previewBtn = document.getElementById("previewBtn");

    const titleCount = document.getElementById("titleCount");
    const contentCount = document.getElementById("contentCount");
    const contentWarn = document.getElementById("contentWarn");

    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modalText");
    const modalClose = document.getElementById("modalClose");
    const modalImg = document.getElementById("modalImg");

    // 글자 수 업데이트
    const updateCounts = () => {
        titleCount.textContent = titleInput.value.length;
        contentCount.textContent = contentInput.value.length;
        contentWarn.style.display = contentInput.value.length < 10 ? "block" : "none";
    };
    titleInput.addEventListener("input", updateCounts);
    contentInput.addEventListener("input", updateCounts);

  

    // 등록
    form.addEventListener("submit", function(e){
        e.preventDefault();
        if(!titleInput.value.trim() || !categorySelect.value || !contentInput.value.trim()){
            showModal("모든 항목을 입력해주세요!");
            return;
        }
        if(contentInput.value.trim().length < 10){
            showModal("내용은 최소 10자 이상 입력해야 합니다.");
            return;
        }
        if(confirm("정말 등록하시겠습니까?")){
            showModal("등록이 완료되었습니다.");
            form.reset();
            modalImg.style.display = "none";
            updateCounts();
        }
    });

    // 취소
    const resetBtn = form.querySelector('button[type="reset"]');
    resetBtn.addEventListener("click", function(e){
        e.preventDefault();
        if(confirm("정말 취소하시겠습니까?")){
            form.reset();
            modalImg.style.display = "none";
            updateCounts();
            showModal("등록이 취소되었습니다.");
        }
    });

    // 모달 함수
    function showModal(text){
        modalText.textContent = text;
        modal.style.display = "flex";
    }

    // 모달 닫기
    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
        modalImg.src = "";
    });
    modal.addEventListener("click", (e) => {
        if(e.target.classList.contains("modal")){
            modal.style.display = "none";
            modalImg.src = "";
        }
    });

    updateCounts();
});