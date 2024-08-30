document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const pendingList = document.getElementById('pendingList');
    const completedList = document.getElementById('completedList');

    function createTaskElement(taskText, isCompleted = false) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = taskText;
        if (isCompleted) {
            span.classList.add('completed');
        }

        const completeBtn = document.createElement('button');
        completeBtn.textContent = isCompleted ? 'Undo' : 'Complete';
        completeBtn.onclick = () => {
            if (isCompleted) {
                moveTask(li, completedList, pendingList);
            } else {
                moveTask(li, pendingList, completedList);
            }
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            li.remove();
        };

        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        return li;
    }

    function moveTask(taskElement, fromList, toList) {
        fromList.removeChild(taskElement);
        toList.appendChild(taskElement);
        taskElement.querySelector('button').textContent = fromList === completedList ? 'Complete' : 'Undo';
        taskElement.querySelector('span').classList.toggle('completed');
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskElement = createTaskElement(taskText);
            pendingList.appendChild(taskElement);
            taskInput.value = '';
        }
    });

    // Optional: Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click();
        }
    });
});
