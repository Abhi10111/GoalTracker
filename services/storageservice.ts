import List from "../types/list";

class StorageService {
    public getLists(): List[] {
        return [];
    }

    public saveLists(lists: List[]): void {

    }
}

export const storageService = new StorageService()