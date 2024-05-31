interface ITodoList {
  id: number;
  name: string;
  completed: boolean;
}

class TodoList {
  private todoList: ITodoList[] = [];
  private currentEditId: number | null = null;

  constructor() {
    this.loadFromLocalStorage();
    this.renderJob();
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem('todoList');
    if (data) {
      this.todoList = JSON.parse(data);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  public renderJob(): void {
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

  private showDeleteConfirmation(): void {
    const confirmation = confirm('Tất cả công việc đã hoàn thành. Bạn có muốn xóa tất cả không?');
    if (confirmation) {
      this.todoList = [];
      this.saveToLocalStorage();
      this.renderJob();
    }
  }

  public confirmDeleteJob(id: number): void {
    const confirmation = confirm('Bạn có chắc chắn muốn xóa công việc này?');
    if (confirmation) {
      this.deleteJob(id);
    }
  }

  public createJob(name: string): void {
    if (!name) {
      alert('Tên công việc không được để trống');
      return;
    }

    if (this.todoList.some((job) => job.name === name)) {
      alert('Tên công việc không được phép trùng');
      return;
    }

    const newJob: ITodoList = {
      id: Date.now(),
      name,
      completed: false,
    };
    this.todoList.push(newJob);
    this.saveToLocalStorage();
    this.renderJob();
  }

  public updateJob(id: number, completed: boolean): void {
const job = this.todoList.find((job) => job.id === id);
    if (job) {
      job.completed = completed;
      this.saveToLocalStorage();
      this.renderJob();
    }
  }

  public updateJobName(id: number, name: string): void {
    const job = this.todoList.find((job) => job.id === id);
    if (job) {
      job.name = name;
      this.saveToLocalStorage();
      this.renderJob();
    }
  }

  public deleteJob(id: number): void {
    this.todoList = this.todoList.filter((job) => job.id !== id);
    this.saveToLocalStorage();
    this.renderJob();
  }

  public editJob(id: number): void {
    const job = this.todoList.find((job) => job.id === id);
    if (job) {
      const taskInput = document.getElementById('taskInput') as HTMLInputElement;
      taskInput.value = job.name;
      this.currentEditId = id;
      this.updateButtonLabel('Sửa');
    }
  }

  private updateButtonLabel(label: string): void {
    const addButton = document.getElementById('add') as HTMLButtonElement;
    addButton.innerText = label;
  }

  public handleButtonClick(): void {
    const taskInput = document.getElementById('taskInput') as HTMLInputElement;
    const taskName = taskInput.value.trim();
    if (this.currentEditId !== null) {
      this.updateJobName(this.currentEditId, taskName);
      this.currentEditId = null;
      this.updateButtonLabel('Thêm');
    } else {
      this.createJob(taskName);
    }
    taskInput.value = '';
  }
}

const todoList = new TodoList();

document.getElementById('add')?.addEventListener('click', () => {
  todoList.handleButtonClick();
});