import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const taskPath =path.join(__dirname,"tasks.json")
const width=370;
const height=870;

let win = null;

function readTasks(){
  const raw=fs.readFileSync(taskPath,'utf-8')
  return JSON.parse(raw);
}

ipcMain.handle("tasks:load", () => {
  return readTasks();
});

function create() {
  win = new BrowserWindow({
    x:100,
    width: width,
    height: height,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    // skipTaskbar: true,
    // resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "./preload.cjs")
    }
  });

  // ← load react build output
  win.setPosition(20,50)
  win.loadFile(path.join(__dirname, "renderer/dist/index.html"));
  win.show();
}

app.whenReady().then(() => {
  create();
});
