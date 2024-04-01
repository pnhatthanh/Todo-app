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