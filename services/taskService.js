import { JsonStorage } from "../storage/storage.js";

class TaskService {
    tasks = []
    constructor(storagePath) {
        this.storage = this.createStorage(storagePath);
        const storedTasks = this.storage.getAll();
        if (storedTasks && storedTasks.length > 0) {
            this.tasks = storedTasks
        }
    }

    // Factory Method
    createStorage(storagePath) {
        throw new Error("createStorage() must be implemented");
    }

    getTasksByListId(listId) {
        return this.tasks
            .filter(task => task.listId === listId);
    }

    getAll(){
        return this.tasks
    }

    create(newTask){
        this.tasks.push(newTask);
        this.storage.save(this.tasks)
    }
}

export class JsonTaskService extends TaskService{
    createStorage(storagePath){
        return new JsonStorage(storagePath)
    }
}