let task_list = [];

function renderList() {
    document.querySelector('.tasks').innerHTML = '';
    task_list.forEach(task => {
        let li = document.createElement('li');
        li.classList.add(`${task.status}`);
        li.innerHTML = `
            <input id="${task.id}" type="checkbox" ${task.status}>
            <label for="${task.id}">${task.id} - ${task.item}</label>
            <button type="button"><img src="assets/img/trashcan.svg"></button>
        `;
        li.querySelector('input').addEventListener("change", e => {
            if (e.target.checked) {
                li.classList.remove('unchecked');
                li.classList.add('checked');
                task_list[task.id-1].status = 'checked';
            }
            else {
                li.classList.remove('checked');
                li.classList.add('unchecked');
                task_list[task.id-1].status = 'unchecked';
            }
        });
        li.querySelector('button').addEventListener('click', e => {
            let button = e.target;
            let li = button.parentNode;
            let input = li.querySelector('input');
            let id = input.id;
            let item = li.querySelector('label').innerText;
            if (confirm(`Do you want to delete the task ${id} ${item}?`)) {
                task_list = task_list.filter(task => task.id !== parseInt(id));
                renderList();
            }
        });
        document.querySelector('.tasks').append(li);
    });
}
document.querySelector(`#new_task`).addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        task_list.push({
            id: task_list.length+1,
            item: e.target.value,
            status: 'unchecked'
        });
        e.target.value = "";
        renderList();
    }
});
renderList();