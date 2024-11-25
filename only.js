fetch("http://localhost:3001/arr")
    .then(res => res.json())
    .then(todos => {
        const today = document.querySelector(".today");




        todos.forEach(todo => {
            const todoCard = document.createElement("div");
            const title = document.createElement("h4");
            const description = document.createElement("p");
            const daysLeft = document.createElement("span");

            todoCard.className = "todoCard";
            description.className = "description";
            title.textContent = todo.title;
            description.textContent = "Lorem ipsum dolor sit amet.";

            if (todo.left === 0) {
                daysLeft.textContent = "Today"
            }

            const checkbox = createCheckbox(todo);
            todoCard.append(checkbox, title, description, daysLeft);

            if (todo.left <= 0) {
                today.append(todoCard);
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
