

// 게시글 목록 불러오는 함수
async function renderList() {
    const boardList = document.querySelector('#boardList');

    if(boards && staffs && categories) {
        const list = boards.map(board => {
        const staff = staffs.find(staff => staff.id === board.staff_id);
        const category = categories.find(category => category.id === board.category_id);

        return {
            ...board,
            manager : staff ? staff.name : '미배정',
            category : category ? category.category_name : '기타'
        };
    });

    let html = "";
    list.forEach(item => {
        html += `
            <tr>
                <td class="cate">${item.category}</td>
                <td class="tit">${item.title}</td>
                <td class="status">${item.status}</td>
                <td class="manage">${item.manager}</td>
                <td class="date">${item.date}</td>
            </tr>
        `;
    });

    includeHTML(boardList, html);
    }
}

renderList();

const statusBtn = document.querySelectorAll(".status-btn");
const rows = document.querySelectorAll("#boardList tr");
const searchBtn = document.querySelector("#searchBtn");
const allButton = document.querySelector(".status-btn");


// 검색기능 + 필터링 활성화
searchBtn.addEventListener('click', () =>{
    const keyword = document.querySelector("#keywordInput").value;
    const articles = document.querySelectorAll("#boardList tr");
    const category = document.querySelector("#categorySelect").value;

    articles.forEach(article => {
        let title = article.querySelector(".tit").textContent;
        let cate = article.querySelector(".cate").textContent;
        let status = article.querySelector(".status").textContent;

        let condition1 = title.includes(keyword) && (category === cate || category === "전체");
        let condition2 = false;

        statusBtn.forEach(button => {
        //   console.log(button);
            if(button.classList.contains("active") &&
                (status === button.textContent || button.textContent === "전체")) condition2 = true;
        });
        
        if(condition1 && condition2){
            article.classList.remove("hidden");
        } else {
            article.classList.add("hidden");
        }
    });
});

let selstatus = new Set();     // 중복 방지

statusBtn.forEach(button => {
    button.addEventListener('click', () => { 
        const status = button.dataset.status;

        // 버튼 토글, 전체일 경우에는 초기화
        if(button.textContent === '전체') {
            resetButtons();
        } else {
            resetAllButton();
        }
        button.classList.toggle("active");

        if(selstatus.has(status)) {
            selstatus.delete(status);
        } else {
            selstatus.add(status);
        }
        
        filterRows();
        checkBtn();
    });
});

// 상태버튼 - 전체를 제외한 모든 버튼 선택시 전체 버튼으로 전환
function checkBtn() {
    let count = 0;

    statusBtn.forEach(button =>{
        if(button.classList.contains("active")) {
            count++;
        }
    });
    if(count === 0 || count === 3) {
        allButton.click();

    }
}

function resetButtons() {
    statusBtn.forEach(button => {
        button.classList.remove("active");
    });
}

function resetAllButton() {
    allButton.classList.remove("active");
}

searchBtn.addEventListener('click', () => {
    filterRows();
})

// 상태 필터 함수
function filterRows() {    
    rows.forEach(row => {
        const rowStatus = row.querySelector(".status").textContent;

        if (selstatus.size === 0) {
            row.classList.remove("hidden");
            return;
        }
        
        if (selstatus.has(rowStatus)) {
            row.classList.remove("hidden");
        } else {
            row.classList.add("hidden");
        }
    });
}

checkBtn();