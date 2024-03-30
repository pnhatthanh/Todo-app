var new_task=document.querySelector(".new-task");
new_task.addEventListener('click',()=>{
    document.querySelector(".box").style.display = 'block';
    document.body.style.overflow = 'hidden';
})
document.querySelector(".close").addEventListener('click',closeBox)
document.querySelector(".box").addEventListener('click',closeBox)
document.querySelector(".box-add").addEventListener('click',()=>{
    event.stopPropagation();
})
function closeBox(){
    document.querySelector(".box").style.display = 'none';
    document.body.style.overflow = 'auto';
}