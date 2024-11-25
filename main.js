fetch("http://localhost:3001/arr")
    .then(res => res.json())
    .then(todos => {
        const today = document.querySelector(".today");
        const tomorrow = document.querySelector(".tomorrow");
        const later = document.querySelector(".later");
        const taskCount = document.getElementById("taskCount");
        const todayCount = document.getElementById("todayCount");
        const tomorrowCount = document.getElementById("tomorrowCount");
        const laterCount = document.getElementById("laterCount");

        taskCount.textContent = todos.length;

        const todayTodos = todos.filter(todo => todo.left === 0);
        todayCount.textContent = todayTodos.length;
        const tomorrowTodos = todos.filter(todo => todo.left === 1);
        tomorrowCount.textContent = tomorrowTodos.length;
        const laterTodos = todos.filter(todo => todo.left > 1);
        laterCount.textContent = laterTodos.length;

        todos.forEach(todo => {
            const todoCard = document.createElement("div");
            const title = document.createElement("h4");
            const description = document.createElement("p");
            const daysLeft = document.createElement("span");

            todoCard.className = "todoCard";
            description.className = "description";
            title.textContent = todo.title;
            description.textContent = "Lorem ipsum dolor sit amet.";
            daysLeft.textContent =
                todo.left === 0
                    ? "Today"
                    : todo.left === 1
                        ? "Tomorrow"
                        : `${todo.left} days left`;

            const checkbox = createCheckbox(todo);
            todoCard.append(checkbox, title, description, daysLeft);

            if (todo.left <= 0) {
                today.append(todoCard);
            } else if (todo.left === 1) {
                tomorrow.append(todoCard);
            } else {
                later.append(todoCard);
            }
        });
    })
    .catch(error => console.error("Error:", error));

function createCheckbox(todo) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "todoCheckbox";
    checkbox.style.color = "#FFC700"
    checkbox.style.backgroundColor = "#FFC700"
    checkbox.style.right = "20px"

    checkbox.onchange = function () {
        todo.completed = checkbox.checked;
        saveTodoState(todo.id, todo.completed);
    };

    return checkbox;
}

function saveTodoState(id, completed) {
    fetch(`http://localhost:3001/arr/${id}`, {
        method: "PATCH",

        body: JSON.stringify({ completed })
    })
        .then(response => response.json())
        .catch(error => console.error("Error:", error));
}

const home = document.querySelector(".home");
home.onclick = () => {
    window.location.href = "./onlyToday.html";
};