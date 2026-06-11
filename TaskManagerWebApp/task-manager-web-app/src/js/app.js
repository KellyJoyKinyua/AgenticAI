// JavaScript code for the task manager web application

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-task-button" aria-label="Delete task">Delete</button>
        <button class="complete-task-button" aria-label="Mark task as completed">Complete</button>
    `;

    const deleteButton = taskItem.querySelector('.delete-task-button');
    const completeButton = taskItem.querySelector('.complete-task-button');

    deleteButton.addEventListener('click', () => {
        taskItem.remove();
    });

    completeButton.addEventListener('click', () => {
        taskItem.querySelector('.task-text').classList.toggle('completed');
    });

    taskList.appendChild(taskItem);
    taskInput.value = '';
}

function handleTaskListClick(event) {
    if (event.target.classList.contains('delete-task-button')) {
        event.target.parentElement.remove();
    } else if (event.target.classList.contains('complete-task-button')) {
        const taskText = event.target.parentElement.querySelector('.task-text');
        taskText.classList.toggle('completed');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addTask();
    });

    taskList.addEventListener('click', handleTaskListClick);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addTask,
        handleTaskListClick,
    };
}
