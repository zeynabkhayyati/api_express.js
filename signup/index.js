// get the users info from inputs

let $ = document
let form = $.querySelector('form')
let username_input = $.querySelector('#username')
let email_input = $.querySelector('#email')
let password_input = $.querySelector('#password')

form.addEventListener('submit' , (event)=>{
    // for the page not loading
    event.preventDefault()

    let new_user_info = {
        username : username_input.value , 
        email : email_input.value , 
        password : password_input.value
    }

    // sending users info
    fetch("http://localhost:3000/new-user" , {
        method: "POST" , 
        headers: {
        "Content-Type": "application/json"
        } , 
        body: JSON.stringify(new_user_info) , 
    }).then((res) => console.log(res))


    Swal.fire({
            // position: 'top-end',
            icon: 'success',
            title: 'You are registered',
            showConfirmButton: false,
            timer: 1500
        })

})
