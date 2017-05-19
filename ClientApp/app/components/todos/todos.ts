import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import toastr = require('toastr');

@inject(HttpClient)
export class Todos {
    title = "Todos";
    todos: Todo[] = [];
    newTodoDescription: string;
    http: HttpClient;
    
    constructor(http: HttpClient) {
        this.http = http;
        this.GetTasks();
    }

    GetTasks() {
        this.http.fetch('/api/Tasks')
            .then(result => result.json() as Promise<Todo[]>)
            .then(data => {
                this.todos = data;
            });
    }

    addTodo() {
        if (this.newTodoDescription) {
            const todo = new Todo(this.newTodoDescription);
            this.todos.push(todo);
            this.http.fetch('/api/Tasks', {
                method: "POST",
                body: json(todo)
            })
                .then(response => {
                    if (response.ok) {
                        response.json().then(data => {
                            this.updateTodo(data);
                            //alert(`Saved Task: ${data.id}`);
                            toastr.options = {
                                "positionClass": "toast-bottom-right"
                            };
                            toastr.success(`Saved Task: ${data.id}`, 'Success');
                        });
                    }
                    else 
                    {
                        toastr.error('Error saving task!', 'Error');
                    }
                });
        
            console.log("added " + this.newTodoDescription);
            this.newTodoDescription = '';
        }
    }

    updateTodo(newTask: Todo) {
        this.todos.forEach(function (t, index) {
            if (t.description == newTask.description) {
                t.id = newTask.id;
                return;
            }
        });
    }

    removeTodo(td: Todo) {
        const index = this.todos.indexOf(td);

        if (index !== -1) {
            this.http.fetch('/api/Tasks', {
                method: "DELETE",
                body: json(td)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                });

            this.todos.splice(index, 1);
        }
    }

    UpdateTask(td: Todo) {          
        this.http.fetch('/api/Tasks', {
            method: "PUT",
            body: json(td)
        });
    }
}

class Todo {
    done: boolean;
    id: any;
    constructor(public description: string) { }
}

interface Todo {
    done: boolean;
    id: any;
    description: string;
}