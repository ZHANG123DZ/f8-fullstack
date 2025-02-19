let usersInfo = []
const register = document.querySelector('#register')
register.addEventListener('click', () => location.href='register.html')
function saveUer() {
    localStorage.setItem('usersInfo', JSON.stringify(usersInfo))
}

const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', function(event) {
    event.preventDefault()
    const formData = new FormData(loginForm)
    const user = Object.fromEntries(formData)

    fetch('http://localhost:3000/login', {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user)
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.accessToken) {
            usersInfo.push(data)
            saveUer()
            location.href = 'index.html'
        } else{
            alert('Email hoặc mật khẩu sai, vui lòng nhập lại!')
            return
        }
    })
    .catch((error) => console.log(error))
})
