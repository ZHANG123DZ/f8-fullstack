const login = document.querySelector('#login')
login.addEventListener('click', () => location.href='login.html')
const registerForm = document.querySelector('#registerForm')
registerForm.addEventListener('submit', function(event){
    event.preventDefault()
    const formData = new FormData(registerForm)
    const user = Object.fromEntries(formData)

    fetch('http://localhost:3000/register', {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user)
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.accessToken) {
            location.href = 'login.html'
        }else {
            alert(data)
            registerForm.reset()
            return
        }
    })
    .catch((error) => console.log(error))
})