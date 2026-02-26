function render() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const articleBox = document.querySelector('.article-box');

    const list = combineList();

    const item = list.find(b => b.id === id);
    const manager = staffs.find(s => s.id === item.staff_id);

    let html = "";
    if (item) {
        html += `
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
                        <select id="staff_name">
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
                            <li class="status ${item.status === status ? 'active' : ''}">
                                <p>${status}</p>
                            </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <div class="submit-area flexWrap">
                    <div class="submitBtnWrap">
                        <ul class="submit">
                            <li>
                                <p><a href="" class="submitBtn">수정하기</a></p>
                            </li>
                            <li>
                                <p><a href="./board.html" class="returnBtn">뒤로가기</a></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } else {
        html += `<p>게시물이 존재하지 않습니다!</p>`;
    }

    includeHTML(articleBox, html);
    addClickStatusEvent();
}

let statusBtns;

function addClickStatusEvent() {
    statusBtns = document.querySelectorAll('.status');

    statusBtns.forEach(statusBtn => {
        statusBtn.addEventListener('click', (e) => {
            console.log(e.target);
            // 세 개 중 하나를 클릭 했을 때 모든 버튼의 active를 제거
            removeClass(statusBtns, 'active');
            // 해당하는 버튼 하나만 활성화
            addClass(e.target, 'active');
        });
    });
}