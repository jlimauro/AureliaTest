import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import { Todo } from './todo';

@inject(HttpClient)
export class TodoService {

    constructor(private http: HttpClient) {
        http.configure(config => {
            config.useStandardConfiguration()
                .withBaseUrl('/api/Tasks/');
        });
    }

     getAll(): Promise<Todo[]> {
        return this.http.fetch('')
            .then(response => response.json() as Promise<Todo[]>)
             .then(data => Array.from(data, t => new Todo(t)))
            .catch(error => console.log(error));
    }

    save(todo: Todo): Promise<Todo> {
        return this.http.fetch('', {
                method: "POST",
                body: json(todo)
            })
            .then(response => response.json())
            .then(data => new Todo(data))
            .catch(error => console.log(error));
    }

    remove(todo: Todo) {
       return this.http.fetch('', {
                method: "DELETE",
                body: json(todo)
            });
    }

    update(todo: Todo) {          
       return this.http.fetch('', {
            method: "PUT",
            body: json(todo)
        });
    }
}