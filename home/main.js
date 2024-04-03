var new_task = document.querySelector(".new-task");
const inputs = document.querySelectorAll('input');
const textArea = document.querySelector('textarea');
const submit=document.getElementById('submit');
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
    inputs.forEach(input=>{
        input.classList=[];
        input.value='';
    });
    textArea.classList=[];
    textArea.value='';
}
inputs.forEach((input) => {
    input.addEventListener('blur', () => {
        checkInput(input);
    })
})
textArea.addEventListener('blur',()=>{
    checkInput(textArea)
})
submit.addEventListener('click',()=>{
    if(checkSubmit()){
        addTodo();
        closeBox();
    }
})
function checkSubmit(){
    let inputValid=true;
    inputs.forEach(input=>{
        if(!checkInput(input)){
            inputValid=false;
        }
    })
    let textAreaValid=checkInput(textArea);
    return inputValid&&textAreaValid;
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

function getListTodo(){
    if (localStorage.getItem("todo")) {
        return JSON.parse(localStorage.getItem("todo"));
    } else {
        return [];
    }
}
function saveTodo(todoList){
    localStorage.setItem('todo',JSON.stringify(todoList))
}
function getListDoing(){
    if (localStorage.getItem("doing")) {
        return JSON.parse(localStorage.getItem("doing"));
    } else {
        return [];
    }
}
function saveDoing(todoList){
    localStorage.setItem('doing',JSON.stringify(todoList))
}
function getListCompleted(){
    if (localStorage.getItem("completed")) {
        return JSON.parse(localStorage.getItem("completed"));
    } else {
        return [];
    }
}
function saveCompleted(todoList){
    localStorage.setItem('completed',JSON.stringify(todoList))
}
function getListBlocked(){
    if (localStorage.getItem("blocked")) {
        return JSON.parse(localStorage.getItem("blocked"));
    } else {
        return [];
    }
}
function saveBlocked(todoList){
    localStorage.setItem('blocked',JSON.stringify(todoList))
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
function Task(category,title,content,datetime){
    this.category=category;
    this.title=title;
    this.content=content;
    this.datetime=formatDate(datetime);
}
function addTodo(){
    const category=document.getElementById('category').value;
    const title=document.getElementById('title').value;
    const content=document.getElementById('content').value;
    const task= new Task(category,title,content,Date.now());
    const todoList=getListTodo();
    todoList.push(task);
    saveTodo(todoList);
}