const taskForm = document.querySelector('#taskForm')
const inputTitle = document.querySelector('#input-title')
const createTask = document.querySelector('#create-task')
const filterStatus = document.querySelector('#filter-status')
const filterPriority = document.querySelector('#filter-priority')
const taskList = document.querySelector('#task-list')
const submitBtn = document.querySelector('#submit-btn')
const overlay = document.querySelector('#taskOverlay')
const closeBtn = document.querySelector('.close-btn')
const searchInput = document.querySelector('#search-input')
searchInput.addEventListener('input', renderTasks)

let editingTaskId = null
const userInfo = JSON.parse(localStorage.getItem('usersInfo')) || []
const userId = userInfo[0]?.user?.id || null

if (!userId) {
    alert("Vui lòng đăng nhập để sử dụng")
}


createTask.addEventListener('click', () => {
    editingTaskId = null
    submitBtn.textContent = 'Thêm Task'
    taskForm.reset()
    overlay.classList.add('show')
})


closeBtn.addEventListener('click', () => overlay.classList.remove('show'))


overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.classList.remove('show')
    }
})


taskForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (editingTaskId) {
        editTask(editingTaskId)
    } else {
        addTask()
    }
})

function renderTasks() {
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(data => {
            taskList.innerHTML = ''
            let filteredTasks = data.filter(task => task.userId === userId)

            if (filterStatus.value !== "todo") {
                filteredTasks = filteredTasks.filter(task => task.status === filterStatus.value)
            }

            const searchValue = searchInput.value.trim().toLowerCase();
            if (searchValue) {
                filteredTasks = filteredTasks.filter(task =>
                    task.title.toLowerCase().includes(searchValue)
                );
            }

            const priorityOrder = { "low": 1, "medium": 2, "high": 3 }
            const sortOrder = filterPriority.value
            
            if (sortOrder === "increase") {
                filteredTasks.sort((a, b) => priorityOrder[a.priority.toLowerCase()] - priorityOrder[b.priority.toLowerCase()])
            } else if (sortOrder === "decrease") {
                filteredTasks.sort((a, b) => priorityOrder[b.priority.toLowerCase()] - priorityOrder[a.priority.toLowerCase()])
            }

            filteredTasks.forEach(task => createTaskElement(task))
        })
        .catch(error => console.error(error))
}

function createTaskElement(task) {
    const li = document.createElement('li')
    li.classList.add('task')

    const title = document.createElement('span')
    title.textContent = task.title
    title.classList.add('title-task')
    task.status === 'done'? li.classList.add('done') : li.classList.add()
    const searchValue = searchInput.value.trim().toLowerCase();
    if (searchInput.value.trim()) {
        const regex = new RegExp(`(${searchValue})`, "gi");
        title.innerHTML = task.title.replace(regex, '<mark>$1</mark>'); 
    } else {
        title.textContent = task.title;
    }

    const taskAction = document.createElement('div')
    taskAction.classList.add('task-action')

    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'
    editBtn.classList.add('editBtn')

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('deleteBtn')

    const priority = document.createElement('span')
    priority.textContent = task.priority
    priority.classList.add(task.priority)

    taskAction.append(editBtn, deleteBtn, priority)
    li.append(title, taskAction)
    taskList.appendChild(li)

    editBtn.addEventListener('click', () => {
        loadTaskForEdit(task)
        overlay.classList.add('show')
    })
    
    deleteBtn.addEventListener('click', (event) => deleteTask(event, task.id))
}

function addTask() {
    const title = inputTitle.value.trim()
    if (!title) {
        alert('Task mà bạn nhập trống, vui lòng nhập lại')
        return
    }

    if (!userId) {
        alert("Vui lòng đăng nhập để thêm task")
        return
    }

    checkCoincide(title, null, (exists) => {
        if (exists) return

        const dataForm = new FormData(taskForm)
        const task = Object.fromEntries(dataForm)

        fetch('http://localhost:3000/tasks', {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({ ...task, userId })
        })
            .then(response => response.json())
            .then(data => {
                createTaskElement(data)
                taskForm.reset()
                overlay.classList.remove('show')
            })
            .catch(error => console.log(error))
    })
}

function loadTaskForEdit(task) {
    inputTitle.value = task.title
    taskForm.querySelector('[name="status"]').value = task.status
    taskForm.querySelector('[name="priority"]').value = task.priority
    submitBtn.textContent = 'Cập nhật Task'
    editingTaskId = task.id
}

function editTask(taskId) {
    const dataForm = new FormData(taskForm)
    const task = Object.fromEntries(dataForm)

    checkCoincide(task.title, taskId, (exists) => {
        if (exists) {
            return 
        }

        fetch(`http://localhost:3000/tasks/${taskId}`, {
            headers: { "Content-Type": "application/json" },
            method: "PATCH",
            body: JSON.stringify(task)
        })
            .then(() => {
                renderTasks()
                taskForm.reset()
                editingTaskId = null
                submitBtn.textContent = 'Thêm Task'
                overlay.classList.remove('show')
            })
            .catch(error => console.log(error))
    })
}

function deleteTask(event, taskId) {
    event.stopPropagation()

    fetch(`http://localhost:3000/tasks/${taskId}`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
    })
        .then(response => {
            if (!response.ok) throw new Error("Không thể xoá task")
            renderTasks()
        })
        .catch(error => alert(error.message))
}

function checkCoincide(title, taskId, callback) {
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(tasks => {
            let exists = tasks.some(task => task.id !== taskId && task.title === title)
            if (exists) {
                alert('Task bạn nhập đã trùng với một task khác, vui lòng nhập một task mới')
            }
            callback(exists)
        })
        .catch(error => {
            console.log(error)
            callback(false)
        })
}
filterStatus.addEventListener('change', renderTasks)
filterPriority.addEventListener('change', renderTasks)
renderTasks()
