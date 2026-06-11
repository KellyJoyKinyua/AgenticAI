/**
 * @jest-environment jsdom
 */

const pageHtml = `
<header>
    <h1>Task Manager</h1>
</header>
<main>
    <section>
        <h2>Add a New Task</h2>
        <form id="task-form">
            <input type="text" id="task-input" placeholder="Enter a new task" required aria-label="New task">
            <button type="submit">Add Task</button>
        </form>
    </section>
    <section>
        <h2>Tasks</h2>
        <ul id="task-list" role="list"></ul>
    </section>
</main>
`;

describe('Task Manager page behavior', () => {
    beforeEach(() => {
        document.body.innerHTML = pageHtml;
        jest.resetModules();
        require('../src/js/app.js');
        document.dispatchEvent(new Event('DOMContentLoaded'));
    });

    test('should render the task input, form, and task list', () => {
        expect(document.getElementById('task-input')).not.toBeNull();
        expect(document.getElementById('task-form')).not.toBeNull();
        expect(document.getElementById('task-list')).not.toBeNull();
    });

    test('should add a new task when the form is submitted', () => {
        const taskInput = document.getElementById('task-input');
        const taskForm = document.getElementById('task-form');
        const taskList = document.getElementById('task-list');

        taskInput.value = 'Write tests';
        taskForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        expect(taskList.children.length).toBe(1);
        expect(taskList.textContent).toContain('Write tests');
    });

    test('should clear the task input after a successful submit', () => {
        const taskInput = document.getElementById('task-input');
        const taskForm = document.getElementById('task-form');

        taskInput.value = 'Complete unit tests';
        taskForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        expect(taskInput.value).toBe('');
    });

    test('should not add a task when the input is empty', () => {
        const taskForm = document.getElementById('task-form');
        const taskList = document.getElementById('task-list');

        taskForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        expect(taskList.children.length).toBe(0);
    });

    test('should remove a task when the delete button is clicked', () => {
        const taskInput = document.getElementById('task-input');
        const taskForm = document.getElementById('task-form');
        const taskList = document.getElementById('task-list');

        taskInput.value = 'Delete this task';
        taskForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        const deleteButton = document.querySelector('.delete-task-button');
        deleteButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(taskList.children.length).toBe(0);
    });

    test('should toggle completed state when the complete button is clicked', () => {
        const taskInput = document.getElementById('task-input');
        const taskForm = document.getElementById('task-form');

        taskInput.value = 'Complete this task';
        taskForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

        const completeButton = document.querySelector('.complete-task-button');
        completeButton.click();

        expect(document.querySelector('.task-text').classList.contains('completed')).toBe(true);
    });
});

describe('calculateDaysBetweenDates helper', () => {
    test('should return 4 days for a 5-day interval', () => {
        const { calculateDaysBetweenDates } = require('../src/js/calculate.js');

        expect(calculateDaysBetweenDates('2024-06-01', '2024-06-05')).toBe(4);
    });

    test('should return 0 days for identical dates', () => {
        const { calculateDaysBetweenDates } = require('../src/js/calculate.js');

        expect(calculateDaysBetweenDates('2024-06-11', '2024-06-11')).toBe(0);
    });
});
