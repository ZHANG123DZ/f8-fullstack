document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.querySelector("#task-list");
    const input_task = document.querySelector('.input_task')
    const filterSelect = document.querySelector('#filter')
    const submit = document.querySelector('form>.submit-btn')
    submit.addEventListener('click',(e) => addTask(e))
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []

    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    function renderTasks(filter = 'all') {
        taskList.textContent = ''
        tasks.filter(task => filter === 'all' || (filter === 'completed' ? task.completed : !task.completed)).forEach((task, index) => {
                const li = document.createElement('li')
                li.classList.toggle('completed', task.completed)
                li.classList.add('task-item')

                const span = document.createElement('span')
                span.textContent = task.title
                span.classList.add('task-title')

                const task_action = document.createElement('div')
                task_action.classList.add('task-action')

                const edit = document.createElement('button')
                edit.textContent = 'Edit'
                edit.classList.add('task-btn')
                edit.classList.add('edit')

                const done = document.createElement('button')
                done.textContent = !task.completed ? 'Mark as done' : 'Mark as undone'
                done.classList.add('task-btn')
                done.classList.add('done')

                const delete_btn = document.createElement('button')
                delete_btn.textContent = 'Delete'
                delete_btn.classList.add('task-btn')
                delete_btn.classList.add('delete')

                task_action.append(edit, done, delete_btn)
                li.append(span, task_action)

                taskList.appendChild(li)

                edit.addEventListener('click', (e) => editTask(e, index, li))
                done.addEventListener('click', (e) => doneTask(e, index))
                delete_btn.addEventListener('click', (e) => deleteTask(e, index))
        })
    }
    function addTask(e) {
        e.preventDefault()
        const title = input_task.value.trim()
        if (title) {
            if (checkCoincide(title, undefined)) return
            else {
                tasks.push({title, completed: false})
                input_task.value = ''
                saveTask() 
                renderTasks(filterSelect.value)
            }
        }
    }
    function editTask(event, index, li) {
        event.stopPropagation()
        const input = document.createElement('input')
        input.value = tasks[index].title
        input.setAttribute('type', 'text')
        input.addEventListener('blur', () => {
            const newTitle = input.value.trim()
            if (newTitle && !checkCoincide(newTitle, index)) {
                tasks[index].title = input.value.trim();
                saveTask();
                renderTasks(filterSelect.value)
            }
            else {
                alert('Task bị trùng hoặc rỗng, vui lòng nhập lại!')
                renderTasks(filterSelect.value)
            }
        });
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                input.blur();
            }
        });
        li.replaceWith(input)
        input.focus()
    }
    function deleteTask(event, index) {
        event.stopPropagation()
        tasks.splice(index,1)
        saveTask()
        renderTasks(filterSelect.value)
    }
    function doneTask(e, index) {
        e.stopPropagation()
        tasks[index].completed = !tasks[index].completed
        saveTask()
        renderTasks(filterSelect.value)
    }
    function checkCoincide(data, index) {
        if (tasks.some((task, i) => i !== index && task.title === data)) {
            alert('Task bạn nhập đã trùng với một task khác vui lòng nhập một task mới')
            return true
        }
        return false  
    }
    filterSelect.addEventListener('change', () => renderTasks(filterSelect.value))
    submit.addEventListener('click', addTask)
    input_task.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask()
    })
    renderTasks()
});

