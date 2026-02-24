const boardList = document.getElementById("boardList");

document.addEventListener("DOMContentLoaded", () => {
  fetch("./js/complaints.json")
    .then(response => response.json())
    .then(data => {
      renderList(data);
    })
    .catch(error => {
      console.error("데이터 불러오기 실패:", error);
    });
});

function renderList(data) {
  boardList.innerHTML = "";

  data.forEach(item => {
    boardList.innerHTML += `
      <tr>
        <td class="cate">${item.category}</td>
        <td class="detail-link">${item.title}</td>
        <td class="state">${item.status}</td>
        <td class="manage">${item.manager}</td>
        <td class="date">${item.date}</td>
      </tr>
    `;
  });
}