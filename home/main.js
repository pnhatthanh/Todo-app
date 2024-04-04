var new_task = document.querySelector(".new-task");
const inputs = document.querySelectorAll('input');
const textArea = document.querySelector('textarea');
const submit = document.getElementById('submit');
const todo = document.getElementById('todo');
const doing=document.getElementById('doing');
const completed=document.getElementById('completed');
const blocked=document.getElementById('blocked');
new_task.addEventListener('click', () => {
    document.querySelector(".box").style.display = 'block';
    document.body.style.overflow = 'hidden';
})
document.querySelector(".close").addEventListener('click', closeBox)
document.querySelector(".box").addEventListener('click', closeBox)
document.querySelector(".box-add").addEventListener('click', () => {
    event.stopPropagation();
})
function closeBox() {
    document.querySelector(".box").style.display = 'none';
    document.body.style.overflow = 'auto';
    inputs.forEach(input => {
        input.classList = [];
        input.value = '';
    });
    textArea.classList = [];
    textArea.value = '';
}
inputs.forEach((input) => {
    input.addEventListener('blur', () => {
        checkInput(input);
    })
})
textArea.addEventListener('blur', () => {
    checkInput(textArea)
})
submit.addEventListener('click', () => {
    if (checkSubmit()) {
        addTodo();
        refresh();
        closeBox();
    }
})
function checkSubmit() {
    let inputValid = true;
    inputs.forEach(input => {
        if (!checkInput(input)) {
            inputValid = false;
        }
    })
    let textAreaValid = checkInput(textArea);
    return inputValid && textAreaValid;
}
function checkInput(input) {
    const text = input.value;
    if (text == "") {
        input.classList.remove('valid');
        input.classList.add('invalid');
        return false;
    } else {
        input.classList.remove('invalid');
        input.classList.add('valid')
        return true;
    }
}

function getListTasks() {
    if (localStorage.getItem("tasks")) {
        return JSON.parse(localStorage.getItem("tasks"));
    } else {
        return [];
    }
}
function saveTask(todoList) {
    localStorage.setItem('tasks', JSON.stringify(todoList))
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}
const statusTask={
    Todo:"Todo",
    Doing:"Doing",
    Completed:"Completed",
    Blocked:"Blocked"
};
function Task(idTask,category, title, content, datetime,taskStatus) {
    this.idTask=idTask;
    this.category = category;
    this.title = title;
    this.content = content;
    this.datetime = formatDate(datetime);
    this.taskStatus=taskStatus;
}
function addTodo() {
    const todoList = getListTasks();
    const category = document.getElementById('category').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const task = new Task(todoList.length,category, title, content, Date.now(),statusTask.Todo);
    todoList.push(task);
    saveTask(todoList);
}

var itemTemplate = (data) => {
    return `<div class="task-item">
        <div class="task-title">
        <div>
            <span class="task-category">${data.category}</span>
            <h3>${data.title}</h3>
        </div>
        <div class="task-action">
            <img src="/asset/update.png" alt="update">
            <img src="/asset//delete.png" alt="delete" id="delete" onclick=deltask(${data.idTask})>
        </div>
    </div>
    <div class="task-des">
        <p>${data.content}</p>
        <span class="time"><img src="/asset/clock.png" alt="clock">${data.datetime}</span>
    </div>
</div>`
}
function refresh() {
    var txt_todo="";
    var txt_doing="";
    var txt_completed="";
    var txt_blocked="";
    const task = getListTasks();
    task.forEach((t) => {
        switch (t.taskStatus){
            case "Todo":
                txt_todo+=itemTemplate(t);
                break;
            case "Doing":
                txt_doing+=itemTemplate(t);
                break;
            case "Completed":
                txt_completed+=itemTemplate(t);
                break;
            case "Blocked":
                txt_blocked+=itemTemplate(t);
                break;
        }
    })
    todo.innerHTML=txt_todo;
    doing.innerHTML=txt_doing;
    completed.innerHTML=txt_completed;
    blocked.innerHTML=txt_blocked;
}
refresh();

function deltask(id){
    let task=getListTasks();
    task=task.filter((value)=>value.idTask!=id);
    saveTask(task);
    refresh();
}