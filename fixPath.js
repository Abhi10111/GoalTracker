import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = path.join(__dirname, "renderer/dist/index.html");

let html = fs.readFileSync(file, "utf-8");

// convert vite absolute → filesystem relative
html = html.replace(/\/assets\//g, "./assets/");

fs.writeFileSync(file, html);

console.log("Paths normalized for electron overlay");
