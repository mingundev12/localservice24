let statusBtns;
const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));
const editButton = document.querySelector(".editButton");
const returnButton = document.querySelector(".returnButton");


function render() {
    const list = combineList();
    const item = list.find(b => b.id === id);

    if(!item || !id) {
        alert("잘못된 접근입니다!");
        history.back();
        return;
    }
    const articleBox = document.querySelector('.article-box');
    const manager = staffs.find(s => s.id === item.staff_id);

    let html = `
        <div class="title-area flexWrap">
                <div class="titleWrap-article">
                    <p><h4>제목</h4><span>${item.title}</span></p>
                </div>
                <div class="category">
                    <p><h4>분류</h4><span>${item.category}</span></p>
                </div>
                <div class="date">
                    <p><h4>작성일자</h4><span>${item.date}</span></p>
                </div>
            </div>
            <div class="content-area flexWrap">
                <div class="contentWrap">
                    <h4>내용</h4>
                    <p>${item.content}</p>
                </div>
            </div>
            <div class="manage-area flexWrap">
                <div class="staffWrap">
                    <h4>담당자</h4>
                    <select id="staff_name" ${manager ? 'disabled' : ''}>
            ${!manager ? "<option value=\"\">---미배정---</option>" : ""}
                        ${staffs
            // 카테고리 ID와 일치하는 담당자만 필터링
                .filter(staff => staff.category_id === item.category_id)
            // 필터링된 담당자들로 <option> 태그 배열 생성
                .map(staff => {
                    let isSelected = (item.staff_id === staff.id) ? 'selected' : '';
                    return `<option value="${staff.id}" ${isSelected}>${staff.name}</option>`;
                })
            // 배열을 하나의 문자열로 합침
                .join('')
                        }
                    </select>
                </div>
                <div class="statusWrap">
                    <h4>상태</h4>
                    <ul class="statusList">
                        ${['접수', '처리중', '완료'].map(status => `
                        <li class="status ${item.status === status ? 'active' : ''} ${
                            item.status==='완료' || (manager && status === '접수') ? 'disabled' : ''}">
                            <p>${status}</p>
                        </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </div>`;

    includeHTML(articleBox, html);
    addClickStatusEvent();
    addSetManagerEvent();
}

// status 버튼 클릭 이벤트
function addClickStatusEvent() {
    statusBtns = document.querySelectorAll('.status');

    if(statusBtns) {
        statusBtns.forEach(statusBtn => {
            statusBtn.addEventListener('click', (e) => {
                // console.log(e.target);
                // 세 개 중 하나를 클릭 했을 때 모든 버튼의 active를 제거
                removeClass(statusBtns, 'active');
                // 해당하는 버튼 하나만 활성화
                addClass(e.target, 'active');
            });
        });
    }
}

// 담당자 배정 이벤트 
function addSetManagerEvent() {
    const manager = document.querySelector('#staff_name');
    const status_ing = Array.from(statusBtns).find(b => b.textContent.trim() === '처리중');

    manager.addEventListener('change', () => {
        status_ing.click();
    });
}

function editArticle(e) {
    if(e) {
        e.preventDefault();
    }
    let article = boards.find(b => b.id === id);
    const managerId = document.querySelector("#staff_name").value;
    const status = document.querySelector('.active').textContent.trim();

    if(!managerId || (article.staff_id === parseInt(managerId) && article.status === status)) {
        alert("상태를 변경하거나 담당자를 배정해주세요!");
        return;
    }

    article.staff_id = parseInt(managerId);
    article.status = status;

    saveDatas();
    const isConfirm = confirm("수정 완료! 목록으로 돌아가시겠습니까?");
    if(isConfirm) {
        location.href="./board.html";
    } else {
        location.reload();
    }
}

function returnBoard(e) {
    if (e) {
        e.preventDefault();
    }
    history.back();
}

editButton.addEventListener('click', editArticle);
returnButton.addEventListener('click', returnBoard);
init();