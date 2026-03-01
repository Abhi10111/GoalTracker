import { app, BrowserWindow, ipcMain, screen } from "electron";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";
import { JsonListService } from "./services/listService.js";
import { JsonTaskService } from "./services/taskService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const taskPath = path.join(app.getPath("userData"), "tasks.json");
const listPath = path.join(app.getPath("userData"), "lists.json");
const listService = new JsonListService(listPath);
const taskService = new JsonTaskService(taskPath);
const width = 320;
const collapsedHeight = 60;
let dimensions = {
  collapsedtasks: { x: 320, y: 60 },
  fulltasks: { x: 320, y: 890 },
  listview: { x: 740, y: 890 }
}
let win = null;
let dragOffset = null;

function updateTasks(tasks) {
  fs.writeFileSync(
    taskPath,
    JSON.stringify(tasks, null, 2)
  );
}

ipcMain.handle("tasks:get", () => {
  return taskService.getAll();
});

ipcMain.handle("tasks:add", (event, task) => {
  return taskService.create(task);
});

ipcMain.handle("tasks:update", (_, tasks) => {
  updateTasks(tasks);
  return true;
});

ipcMain.handle("lists:get", () => {
  let lists = listService.getAll();
  return lists;
});

ipcMain.handle("lists:add", (event, name) => {
  return listService.create(name);
});

ipcMain.handle("window:resize", (event, windowName) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (win) {
    win.setBounds({ width: dimensions[windowName].x, height: dimensions[windowName].y });
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
  const primaryDisplay = screen.getPrimaryDisplay();
  const screenSize = primaryDisplay.size;
  dimensions["homepage"] = { x: parseInt(screenSize.width * 0.9, 10), y: screenSize.height }
  win = new BrowserWindow({
    width: dimensions.homepage.x,
    height: dimensions.homepage.y,
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
  win.setPosition(parseInt((screenSize.width - dimensions.homepage.x) * 0.5, 10), 50)
  win.loadFile(path.join(__dirname, "renderer/dist/index.html"));
  win.show();
}

app.whenReady().then(() => {
  create();
});
