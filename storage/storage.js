// storage/IStorage.js
import fs from "fs";
import path from "path";

export class IStorage {
    
    getAll() {
        throw new Error("Not implemented");
    }

    save(content) {
        throw new Error("Not implemented");
    }
}


export class JsonStorage extends IStorage {

    constructor(storagePath) {
        super()
        this.storagePath = storagePath;
    }

    getAll() {
        if (!fs.existsSync(this.storagePath)) {
            const dir = path.dirname(this.storagePath);

            // Create directory if missing
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            // Create file with empty array if missing
            fs.writeFileSync(this.storagePath, JSON.stringify([], null, 2));
            return [];
        }

        const data = fs.readFileSync(this.storagePath, "utf-8");
        return JSON.parse(data);
    }

    save(content) {
        fs.writeFileSync(this.storagePath, JSON.stringify(content, null, 2));
    }
}