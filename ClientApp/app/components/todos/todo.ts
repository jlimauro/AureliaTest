export class Todo {
    done: boolean;
    id: string;
    description: string

     constructor(data?) {
        if (data == null) return;
        Object.assign(this, data);
    }
}

export interface Todo {
    done: boolean;
    id: string;
    description: string;
}