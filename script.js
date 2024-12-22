document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'flex items-center justify-between p-2 bg-gray-50 rounded-md';
            li.innerHTML = `
                <span class="${task.completed ? 'line-through text-gray-500' : ''}">${task.text}</span>
                <div>
                    <button class="complete-task text-green-500 hover:text-green-700 mr-2">
                        ${task.completed ? 'Desfazer' : 'Concluir'}
                    </button>
                    <button class="edit-task text-blue-500 hover:text-blue-700 mr-2">Editar</button>
                    <button class="delete-task text-red-500 hover:text-red-700">Excluir</button>
                </div>
            `;

            li.querySelector('.complete-task').addEventListener('click', () => toggleComplete(index));
            li.querySelector('.edit-task').addEventListener('click', () => editTask(index));
            li.querySelector('.delete-task').addEventListener('click', () => deleteTask(index));

            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function editTask(index) {
        const newText = prompt('Editar tarefa:', tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
    }

    function deleteTask(index) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    }

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    renderTasks();
});