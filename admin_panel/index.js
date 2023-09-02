// this is a panel for admin 
// we want load all users here

let body = document.querySelector('body')
let all = document.querySelector('.all')
let edit_user = document.querySelector('.edit-user')
let edit_div = document.querySelector('.edit-div')
let ok = document.querySelector('.ok')
let inp_username = document.querySelector('.inp-username')
let email = document.querySelector('.email')
let password = document.querySelector('.password')

window.addEventListener('load' , ()=>{
    
    getAllUsers()

})

// for get all users infos
function getAllUsers(){

    fetch('http://localhost:3000/all-users')
    // make json data
    .then((res) => res.json())
    .then((users) => {

        // for clean html to stop create Repetitious carts
        all.innerHTML = ""
        
        // for a length of  users create a cart in html whit users infos
        users.forEach(user => {
            
            // insert elements to html before end bodys element
            all.insertAdjacentHTML('afterbegin' , `
    <div class="users">
        <div class="icon">
            <i class="fa fa-user" aria-hidden="true"></i>
        </div>
        <div class="username">
            username : ${user.username}
            <br>
            email : ${user.email}
        </div>
        <div class="btn">
            <button class="edit" onclick=showEditModal("${user.id}")>
                edit
            </button>
            <button class="delete" onclick=showDeleteModal("${user.id}")>
                delete
            </button>
        </div>
    </div>
            `)
        });
    })
}

// request this url in routes to delete user
function showDeleteModal(user_id){

    fetch(`http://localhost:3000/delete/${user_id}` , {
        method : 'DELETE'
    }).then((res) => res.json())
    .then((data) => console.log(data))

    Swal.fire({
        icon: 'success',
        title: 'user deleted',
        showConfirmButton: false,
        timer: 1500
    })

    // for alert . because when we get all users alert cant be show itself
    // so whit this . alert can show itself for one seconds snd after that goes away
    setTimeout(() => {
        getAllUsers()
    }, 1000);
}

// when click on edit button we get user id from cart user and visible edit yellow cart
function showEditModal(id) {
    user_id = id
    edit_div.style.display = "flex"
}

// after you enter your information about user
// you must close yellow cart and this codes doing that work for you/
// and update data from your database
ok.addEventListener('click' , ()=>{

    edit_div.style.display = "none"

    let update_user_info = {

        username : inp_username.value, 
        email : email.value, 
        password : password.value
    }

    fetch(`http://localhost:3000/edit/${user_id}` , {
        method : 'PUT',
        headers : {"Content-Type": "application/json"},
        body : JSON.stringify(update_user_info)
    }).then(res => res.json)
    .then(data => console.log(data))

    Swal.fire({
        icon: 'success',
        title: 'user updated',
        showConfirmButton: false,
        timer: 1500
    })

    // for alert . because when we get all users alert cant be show itself
    // so whit this . alert can show itself for one seconds snd after that goes away
    setTimeout(() => {
        getAllUsers()
    }, 1000);

    emptyInputsYellowCart()
})

// empty inputs yellow cart for next update
// comment it and try yourself to understand it
function emptyInputsYellowCart(){

    inp_username.value = ""
    email.value = ""
    password.value = ""

}
