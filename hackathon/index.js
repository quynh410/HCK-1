"use strict";
var _a;
class TodoList {
    constructor() {
        this.todoList = [];
        this.currentEditId = null;
        this.loadFromLocalStorage();
        this.renderJob();
    }
    loadFromLocalStorage() {
        const data = localStorage.getItem('todoList');
        if (data) {
            this.todoList = JSON.parse(data);
        }
    }
    saveToLocalStorage() {
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
    renderJob() {
        const listElement = document.getElementById('taskList');
        const scoreElement = document.getElementById('score');
        if (listElement && scoreElement) {
            listElement.innerHTML = '';
            let completedCount = 0;
            this.todoList.forEach((job) => {
                const jobElement = document.createElement('div');
                jobElement.className = 'work';
                const jobContent = `
          <div class="task-details">
            <input type="checkbox" ${job.completed ? 'checked' : ''} onchange="todoList.updateJob(${job.id}, this.checked)" />
            <label class="${job.completed ? 'completed' : ''}">${job.name}</label>
          </div>
          <div class="detail">
            <button onclick="todoList.editJob(${job.id})">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button onclick="todoList.confirmDeleteJob(${job.id})" style="width: 30px; height: 30px">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `;
                jobElement.innerHTML = jobContent;
                listElement.appendChild(jobElement);
                if (job.completed) {
                    completedCount++;
                }
            });
            scoreElement.innerHTML = `${completedCount}/${this.todoList.length}`;
            if (completedCount === this.todoList.length && this.todoList.length > 0) {
                this.showDeleteConfirmation();
            }
        }
    }
    showDeleteConfirmation() {
        const confirmation = confirm('Tất cả công việc đã hoàn thành. Bạn có muốn xóa tất cả không?');
        if (confirmation) {
            this.todoList = [];
            this.saveToLocalStorage();
            this.renderJob();
        }
    }
    confirmDeleteJob(id) {
        const confirmation = confirm('Bạn có chắc chắn muốn xóa công việc này?');
        if (confirmation) {
            this.deleteJob(id);
        }
    }
    createJob(name) {
        if (!name) {
            alert('Tên công việc không được để trống');
            return;
        }
        if (this.todoList.some((job) => job.name === name)) {
            alert('Tên công việc không được phép trùng');
            return;
        }
        const newJob = {
            id: Date.now(),
            name,
            completed: false,
        };
        this.todoList.push(newJob);
        this.saveToLocalStorage();
        this.renderJob();
    }
    updateJob(id, completed) {
        const job = this.todoList.find((job) => job.id === id);
        if (job) {
            job.completed = completed;
            this.saveToLocalStorage();
            this.renderJob();
        }
    }
    updateJobName(id, name) {
        const job = this.todoList.find((job) => job.id === id);
        if (job) {
            job.name = name;
            this.saveToLocalStorage();
            this.renderJob();
        }
    }
    deleteJob(id) {
        this.todoList = this.todoList.filter((job) => job.id !== id);
        this.saveToLocalStorage();
        this.renderJob();
    }
    editJob(id) {
        const job = this.todoList.find((job) => job.id === id);
        if (job) {
            const taskInput = document.getElementById('taskInput');
            taskInput.value = job.name;
            this.currentEditId = id;
            this.updateButtonLabel('Sửa');
        }
    }
    updateButtonLabel(label) {
        const addButton = document.getElementById('add');
        addButton.innerText = label;
    }
    handleButtonClick() {
        const taskInput = document.getElementById('taskInput');
        const taskName = taskInput.value.trim();
        if (this.currentEditId !== null) {
            this.updateJobName(this.currentEditId, taskName);
            this.currentEditId = null;
            this.updateButtonLabel('Thêm');
        }
        else {
            this.createJob(taskName);
        }
        taskInput.value = '';
    }
}
const todoList = new TodoList();
(_a = document.getElementById('add')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    todoList.handleButtonClick();
});
