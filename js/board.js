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
          <td class="state">${item.status}</td>
          <td>${item.manager}</td>
          <td>${item.date}</td>
        </tr>
      `;
    });
    includeHTML('#boardList', html);
  }
}

renderList();

document.querySelector("#categorySelect").addEventListener('change', (e) =>{
    const selValue = e.target.value;
    // console.log(selValue);
    const articles = document.querySelectorAll("#boardList tr");

    articles.forEach(article => {
        let cate = article.querySelector(".cate").textContent;
        // console.log(cate);
        if(selValue === cate || selValue === "전체") {
            article.classList.remove("hidden");
        } else {
            article.classList.add("hidden");
        }
    });
});