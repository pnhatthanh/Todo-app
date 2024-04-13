var new_task = document.querySelector(".new-task");
const inputs = document.querySelectorAll('.input');
const textArea = document.querySelector('textarea');
const submit = document.getElementById('submit');
const todo = document.getElementById('todo');
const doing=document.getElementById('doing');
const completed=document.getElementById('completed');
const blocked=document.getElementById('blocked');
const items=document.getElementsByClassName("task-item");
new_task.addEventListener('click', () => {
    document.getElementById('box-title').textContent='Add new todo';
    document.querySelector(".edit-status").style.display = 'none';
    document.querySelector(".box").style.display = 'block';
})
document.querySelector(".logout").addEventListener('click',()=>{
    window.location.href='../login/index.html';
})
document.querySelector(".close").addEventListener('click', closeBox)
document.querySelector(".box").addEventListener('click', closeBox)
document.querySelector(".box-add").addEventListener('click', () => {
    event.stopPropagation();
})
var _id=-1;
function closeBox() {
    _id=-1;
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
        if(_id>=0){
            updateTask();
        }else{
            addTodo();
        }
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
    return `<div class="task-item" draggable="true">
    <span style="display: none;" id="idTask">${data.idTask}</span>
    <div class="task-title">
        <div>
            <span class="task-category">${data.category}</span>
            <h3>${data.title}</h3>
        </div>
        <div class="task-action">
            <img src="/asset/update.png" alt="update" onclick=displayEdit(${data.idTask})>
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
    let countTodo=0;
    var txt_doing="";
    let countDoing=0;
    var txt_completed="";
    let countCompleted=0;
    var txt_blocked="";
    let countBlocked=0;
    const task = getListTasks();
    task.forEach((t) => {
        switch (t.taskStatus){
            case "Todo":
                countTodo++;
                txt_todo+=itemTemplate(t);
                break;
            case "Doing":
                countDoing++;
                txt_doing+=itemTemplate(t);
                break;
            case "Completed":
                countCompleted++;
                txt_completed+=itemTemplate(t);
                break;
            case "Blocked":
                countBlocked++;
                txt_blocked+=itemTemplate(t);
                break;
        }
    })
    todo.innerHTML=txt_todo;
    doing.innerHTML=txt_doing;
    completed.innerHTML=txt_completed;
    blocked.innerHTML=txt_blocked;
    document.getElementById('countTodo').textContent=countTodo;
    document.getElementById('countDoing').textContent=countDoing;
    document.getElementById('countCompleted').textContent=countCompleted;
    document.getElementById('countBlocked').textContent=countBlocked;
}
refresh();
function deltask(id){
    let task=getListTasks();
    task=task.filter((value)=>value.idTask!=id);
    saveTask(task);
    refresh();
}
function displayEdit(id){
    _id=id;
    document.getElementById('box-title').textContent='Edit to do';
    document.querySelector(".edit-status").style.display = 'flex';
    document.querySelector(".box").style.display = 'block';
    let tasks=getListTasks();
    let task=tasks.find(task => task.idTask==id);
    if(task){ 
        document.getElementById('category').value=task.category;
        document.getElementById('title').value=task.title;
        document.getElementById('content').value=task.content;
        document.querySelectorAll("input[name=status]").forEach((radio) => {
            if (radio.value == task.taskStatus) {
                radio.checked = true;
            } 
        });
    }
}
function updateTask(){
    let tasks=getListTasks();
    let task=tasks.find(task => task.idTask==_id);
    task.category=document.getElementById('category').value;
    task.title=document.getElementById('title').value;
    task.content=document.getElementById('content').value;
    task.taskStatus=document.querySelector('input[name=status]:checked').value;
    const idnex=tasks.findIndex(task=>task.idTassk==_id);
    tasks[idnex]=task;
    saveTask(tasks);
}
let selected = null;

for (const item of items) {
    item.addEventListener("dragstart", e => {
        selected = e.target;
    });
}
todo.addEventListener("dragover", e => {
    e.preventDefault();
});
todo.addEventListener("drop", e => {
    if (selected != null) {
        todo.appendChild(selected);
        updateStatus(getIdTask(selected), statusTask.Todo);
        selected = null;
    }
});
doing.addEventListener("dragover", e => {
    e.preventDefault();
});
doing.addEventListener("drop", e => {
    if (selected != null) {
        doing.appendChild(selected);
        console.log(selected);
        updateStatus(getIdTask(selected), statusTask.Doing);
        selected = null;
    }
});
completed.addEventListener("dragover", e => {
    e.preventDefault();
});
completed.addEventListener("drop", e => {
    if (selected != null) {
        completed.appendChild(selected);
        updateStatus(getIdTask(selected), statusTask.Completed);
        selected = null;
    }
});
blocked.addEventListener("dragover", e => {
    e.preventDefault();
});
blocked.addEventListener("drop", e => {
    if (selected != null) {
        blocked.appendChild(selected);
        console.log(selected);
        updateStatus(getIdTask(selected), statusTask.Blocked);
        selected = null;
    }
});
function getIdTask(selectedItem) {
    return selectedItem.querySelector('#idTask').textContent;
}
function updateStatus(__idItem, __status) {
    let __tasks=getListTasks();
    let __task=__tasks.find(ta => ta.idTask==__idItem);
    const __idnex=__tasks.findIndex(task=>task.idTask==_id);
    __task.taskStatus=__status;
    __tasks[__idnex]=__task;
    saveTask(__tasks);
    window.location.reload();
}
