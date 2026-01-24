import { app, BrowserWindow, ipcMain, screen } from "electron";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { log } from "console";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const taskPath = path.join(__dirname, "tasks.json")
const width = 320;
const collapsedHeight = 60;
const fullHeight = 890;

let win = null;
let dragOffset = null;

function readTasks() {
  const raw = fs.readFileSync(taskPath, 'utf-8')
  return JSON.parse(raw);
}

function updateTasks(tasks) {
  fs.writeFileSync(
    taskPath,
    JSON.stringify(tasks, null, 2)
  );
}
ipcMain.handle("tasks:load", () => {
  return readTasks();
});

ipcMain.handle("tasks:update", (_, tasks) => {
  updateTasks(tasks);
  return true;
});

ipcMain.handle("window:resize", (event, collapsed) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.setBounds({ width: width, height: collapsed ? collapsedHeight : fullHeight });
  }
});


ipcMain.handle("window:drag_start", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return;

  const cursor = screen.getCursorScreenPoint();
  const [winX, winY] = win.getPosition();

  dragOffset = {
    x: cursor.x - winX,
    y: cursor.y - winY,
  };
});

ipcMain.handle("window:drag", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  const cursor = screen.getCursorScreenPoint();
  if (win) {
    win.setBounds({ x: cursor.x - dragOffset.x, y: cursor.y - dragOffset.y, width: width, height: collapsedHeight });
  }
});

function create() {
  win = new BrowserWindow({
    x: 100,
    width: width,
    height: fullHeight,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    // skipTaskbar: true,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "./preload.cjs")
    }
  });

  // ← load react build output
  win.setPosition(20, 50)
  win.loadFile(path.join(__dirname, "renderer/dist/index.html"));
  win.show();
}

app.whenReady().then(() => {
  create();
});
