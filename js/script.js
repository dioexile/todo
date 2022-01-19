"use strict";

const headerButton = document.querySelector(".header-button");
const headerInput = document.querySelector(".header-input");
const toDoList = document.querySelector(".todo-list");
const toDoCompleted = document.querySelector(".todo-completed");

let toDoData = [];

const clearToDo = () => {
	toDoList.innerHTML = "";
	toDoCompleted.innerHTML = "";
};

const render = () => {
	if (toDoData === null) {
		toDoData = [];
	}
	clearToDo();
	toDoData.forEach((elem, i) => {
		let li = document.createElement("li");

		li.classList = "todo-item";
		li.innerHTML =
			'<span class="text-todo">' + elem.name + '</span>' +
			'<div class="todo-buttons">' +
			'<button class="todo-remove"></button>' +
			'<button class="todo-complete"></button>' +
			'</div>';

		if (elem.checkbox) {
			toDoCompleted.append(li);
		} else {
			toDoList.append(li);
		}

		li.querySelector(".todo-complete").addEventListener("click", () => {
			elem.checkbox = !elem.checkbox;
			render();
		});
		li.querySelector(".todo-remove").addEventListener("click", () => {
			li.remove();
			toDoData.splice(i, 1);
			render();
			localStorage.setItem("ToDo", JSON.stringify(toDoData));
			if (toDoData.length === 0) {
				localStorage.clear();
			}
		});
		if (toDoData.length >= 1) {
			localStorage.setItem("ToDo", JSON.stringify(toDoData));
		}
	});
};

headerButton.addEventListener("click", (event) => {
	event.preventDefault();

	if (headerInput.value !== "") {
		toDoData.push({
			name: headerInput.value,
			checkbox: false
		});
		headerInput.value = "";

		render();
	}
});

toDoData = localStorage.getItem("ToDo");
toDoData = JSON.parse(toDoData);
render();