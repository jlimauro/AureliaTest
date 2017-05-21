import { TodoService } from './todoService';
import { Todo } from './todo';
import { inject } from 'aurelia-framework';
import toastr = require('toastr');

@inject(TodoService)
export class Todos {
    title = "Todos";
    todo: Todo = new Todo();
    todos: Todo[] = [];
    thisVM = this;
    constructor(private todoService: TodoService) { }

    addTodo() {
        if (this.todo.description) {
            this.todos.push(this.todo);

            this.todoService.save(this.todo)
            .then(data =>  {               
                this.todo = data

                toastr.options = {
                                "positionClass": "toast-bottom-right"
                            };
                            toastr.success(`Saved Task: ${data.id}`, 'Success');
            }).catch(error => {
                toastr.error('Error saving task!', 'Error');
            });
        }
    }
}