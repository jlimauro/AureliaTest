import { TodoService } from '../todoService';
import { Todo } from '../todo';
import { inject } from 'aurelia-framework';

@inject(TodoService)
export class TodoList {
    parentElement: any;

    constructor(private todoService: TodoService) {
       this.GetTasks();
    }

    GetTasks() {
       this.todoService.getAll()
            .then(data => this.parentElement.todos = data);
    }

    removeTodo(td: Todo) {
        const index = this.parentElement.todos.indexOf(td);
        if (index !== -1) {
            this.todoService.remove(td);
            this.parentElement.todos.splice(index, 1);
        }
    }

    UpdateTask(td: Todo) {          
        this.todoService.update(td);
    }

    activate(parentElement){
    this.parentElement = parentElement;
  }
}