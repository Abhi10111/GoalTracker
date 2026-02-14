import List from "../types/list";
import { storageService } from "./storageservice";

export default class ListService {
    private lists: List[] = [];

    constructor() {
        const storedLists = storageService.getLists();
    }

    create(name: String): List {
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

        const newList: List = {
            id: crypto.randomUUID(),
            name: trimmed,
            createdAt: now
        };

        this.lists.push(newList);
        this.persist();

        return newList;
    }

    private persist():void{
        storageService.saveLists(this.lists);
    }
}   
