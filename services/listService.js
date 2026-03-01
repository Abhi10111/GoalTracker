import { storageService } from "./storageservice.js";
import { JsonStorage } from "../storage/storage.js";
class ListService {
    lists = []

    constructor(storagePath) {
        this.storage = this.createStorage(storagePath); // Factory Method
        const storedLists = this.storage.getAll();
        if (storedLists && storedLists.length > 0) {
            this.lists = storedLists;
        }
    }

    // 🔥 FACTORY METHOD (to be overridden)
    createStorage(storagePath) {
        throw new Error("createStorage() must be implemented");
    }

    create(name) {
        const trimmed = name.trim();
        if (!trimmed) {
            throw new Error("List name cannot be empty.");
        }

        const duplicate = this.lists.find(
            l => l.name.toLowerCase() === trimmed.toLowerCase()
        );

        if (duplicate) {
            throw new Error("List with this name already exists.");
        }

        const now = (new Date()).toLocaleString('en-IN')

        ///TODO: move this logic inside renderer, just like adding task
        const newList = {
            id: crypto.randomUUID(),
            name: trimmed,
            createdAt: now,
            tasks: []
        };

        this.lists.push(newList);
        this.storage.save(this.lists);
        return newList;
    }

    getAll() {
        return this.lists;
    }
};

export class JsonListService extends ListService {
    createStorage(storagePath) {
        return new JsonStorage(storagePath);
    }
}
// export const listService = new ListService();