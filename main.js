const login = document.getElementById('login');
const register = document.getElementById('register');
const btn = document.getElementById('submit');

login.classList.add('border-title');

function change(active){
    if(active=="register"){
        document.querySelector(".retypepassword").style.display = 'block';
        register.classList.add('border-title');
        login.classList.remove('border-title');
    }else{
        login.classList.add('border-title');
        register.classList.remove('border-title');
        document.querySelector(".retypepassword").style.display = 'none';
    }
    active=="login"?btn.textContent = "Login":btn.textContent = "Register";
    document.querySelector(".error").style.display = "none";
    document.querySelector('.username span').style.display="none";
    document.querySelector('.password span').style.display="none";
    document.getElementById('email').value='';
    document.getElementById('password').value='';
    document.getElementById('retypepassword').value='';
}

register.addEventListener('click',()=>{change('register')})
login.addEventListener('click',()=>{change('login')})

function User(email, password) {
    this.email = email;
    this.password = password;
}

function getUsers() {
    if (localStorage.getItem("users")) {
        return JSON.parse(localStorage.getItem("users"));
    } else {
        return [];
    }
}
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

btn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const retypepassword = document.getElementById('retypepassword').value;
    if(email==''){
        document.querySelector('.username span').style.display="block";
        return;
    }
    if(password==''){
        document.querySelector('.password span').style.display="block";
        return;
    }
    if (btn.textContent == "Login") {
        const users = getUsers();
        for (let user of users) {
            if (user.email == email && user.password == password) {
                window.location.href = "success.html";
                return;
            }
        }
        document.querySelector(".error").style.display = "block";
    } else {
        if(retypepassword!==password){
            document.querySelector('.retypepassword span').style.display='block';
            return;
        }
        const user = new User(email, password);
        const users = getUsers();
        users.push(user);
        saveUsers(users);
        change("login");
    }
})
