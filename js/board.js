// const boardList = document.getElementById("boardList");

// document.addEventListener("DOMContentLoaded", () => {
//   fetch("./js/complaints.json")
//     .then(response => response.json())
//     .then(data => {
//       renderList(data);
//     })
//     .catch(error => {
//       console.error("데이터 불러오기 실패:", error);
//     });
// });

// function renderList(data) {
//   boardList.innerHTML = "";

//   data.forEach(item => {
//     boardList.innerHTML += `
//       <tr>
//         <td>${item.category}</td>
//         <td class="detail-link">${item.title}</td>
//         <td>${item.status}</td>
//         <td>${item.manager}</td>
//         <td>${item.date}</td>
//       </tr>
//     `;
//   });
// }

// 게시글 목록 불러오는 함수
async function renderList() {
  const listUrl = "./js/complaints.json";
  const response = await loadFile(listUrl);
  if(response) {
    const list = await response.json();

    let html = "";
    list.forEach(item => {
      html += `
        <tr>
          <td class="cate">${item.category}</td>
          <td class="tit">${item.title}</td>
          <td class="status">${item.status}</td>
          <td>${item.manager}</td>
          <td>${item.date}</td>
        </tr>
      `;
    });
    includeHTML('#boardList', html);
  }
}

renderList();

const statusBtn = document.querySelectorAll(".status-btn");
const rows = document.querySelectorAll("#boardList tr");
const searchBtn = document.querySelector("#searchBtn");

// document.querySelector("#categorySelect").addEventListener('change', (e) =>{
//     const selValue = e.target.value;
//     // console.log(selValue);
//     const articles = document.querySelectorAll("#boardList tr");

//     articles.forEach(article => {
//         let cate = article.querySelector(".cate").textContent;
//         // console.log(cate);
//         if(selValue === cate || selValue === "전체") {
//             article.classList.remove("hidden");
//         } else {
//             article.classList.add("hidden");
//         }
//     });
// });

searchBtn.addEventListener('click', () =>{
    const keyword = document.querySelector("#keywordInput").value;
    const articles = document.querySelectorAll("#boardList tr");
    const category = document.querySelector("#categorySelect").value;

    articles.forEach(article => {
        let title = article.querySelector(".tit").textContent;
        let cate = article.querySelector(".cate").textContent;
        let status = article.querySelector(".status").textContent;

        let condition1 = title.includes(keyword) && (category === cate || category === "전체");
        let condition2 = true;

        statusBtn.forEach(button => {
            if(status != button.textContent && button.classList.contains("active")
             && button.textContent != "전체") condition2 = false;
        });
        
        if(condition1 && condition2){
            article.classList.remove("hidden");
        } else {
            article.classList.add("hidden");
        }
    });
});

// let selstatus = new Set();     // 중복 방지

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
    });
});

function resetButtons() {
    statusBtn.forEach(button => {
        button.classList.remove("active");
    });
}

function resetAllButton() {
    const allButton = document.querySelector(".status-btn");
    allButton.classList.remove("active");
}

searchBtn.addEventListener('click', () => {
    filterRows();
})

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