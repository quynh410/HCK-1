"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".all-item input[type='checkbox']");
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            if (this.checked) {
                // Thêm 
                this.nextElementSibling.style.textDecoration = "line-through";
            }
            else {
                // Loại 
                this.nextElementSibling.style.textDecoration = "none";
            }
        });
    });
});
//  ----------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll(".all-item input[type='checkbox']");
    const scoreDisplay = document.getElementById("score");
    let completedTasks = 0;
    function updateCompletedTasks() {
        scoreDisplay.textContent = `${completedTasks}/${checkboxes.length}`;
        if (completedTasks === checkboxes.length) {
            alert("Hoàn thành công việc");
        }
    }
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                completedTasks++;
            }
            else {
                completedTasks--;
            }
            updateCompletedTasks();
        });
    });
    updateCompletedTasks();
});
class TodoList {
    constructor(todoList) {
        this.todoList = todoList;
        this.id = 0;
        this.name = "";
        this.completed = false;
    }
    renderJob() {
        let elementRender = document.getElementById("render");
        const myInput = document.getElementById('taskInput');
        const inputValue = myInput.value;
        let text = "";
        for (let index = 0; index < this.todoList.length; index++) {
            text += `
        <div id="render"><input type="checkbox" />${inputValue}<label for="">Code</label></div>
        <div class="detail" style="margin-left: 30pc;" >
          <button style="width: 30px; height: 30px">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button style="width: 30px; height: 30px">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
        
       
        `;
        }
        elementRender.innerHTML = text;
    }
    ;
    createJob() {
        let newTask = {
            id: this.id,
            name: this.name,
            completed: this.completed
        };
        if (newTask.name.trim() === "") {
            console.error("Tên công việc không được để trống");
            return;
        }
        if (this.todoList.some(task => task.name === newTask.name)) {
            console.error("Tên công việc đã tồn tại");
            return;
        }
        this.todoList.push(newTask);
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.renderJob();
    }
    updateJob(taskId, completed) {
        //         const taskToUpdate = this.todoList.find(task => task.id === taskId);
        //         if (!taskToUpdate) {
        //             console.error("Không tìm thấy công việc cần cập nhật");
        //             return;
        //         }
        //         taskToUpdate.completed = completed;
        //         localStorage.setItem("todoList", JSON.stringify(this.todoList));
        //         this.renderJob();
    }
    deleteJob(taskId) {
        //  if (confirm("Bạn có chắc chắn muốn xóa công việc này không?")) {
        this.todoList = this.todoList.filter(task => task.id !== taskId);
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
        this.renderJob();
    }
}
const savedTodoList = JSON.parse(localStorage.getItem("todoList") || "[]");
const todoList = new TodoList(savedTodoList);
const newTask = { id: 0, name: "Mua sữa", completed: false };
todoList.createJob();
todoList.updateJob(1, true);
todoList.deleteJob(1);
todoList.renderJob();
let elementAdd = document.getElementById("add");
console.log(777777, elementAdd);
elementAdd.addEventListener("click", () => {
    console.log(1111222);
    todoList.createJob();
    todoList.renderJob();
});
