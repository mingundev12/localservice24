
function render() {
    const tbody = document.querySelector('.staff-table-body');
    
    if(!staffs || !categories) return;

    const staffs_cateName = staffs.map(staff => {
        const category = categories.find(cate => cate.id === staff.category_id);

        return {
            ...staff,
            category_name : category ? category.category_name : '기타'
        };
    });

    let html = "";
    staffs_cateName.forEach(staff => {
        html += `
            <tr>
                <td>${staff.id}</td>
                <td>${staff.name}</td>
                <td>${staff.category_name}</td>
            </tr>
        `;
    });

    includeHTML(tbody, html);
}

init();