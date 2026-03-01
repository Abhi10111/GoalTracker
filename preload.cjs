// preload.cjs
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  loadTasks: () => ipcRenderer.invoke("tasks:get"),
  addTask: (task) => ipcRenderer.invoke("tasks:add", task),
  updateTasks: (tasks) => ipcRenderer.invoke("tasks:update", tasks),
  getLists: () => ipcRenderer.invoke("lists:get"),
  createList: (name) => ipcRenderer.invoke("lists:add", name),
  resize: (windowName) => ipcRenderer.invoke("window:resize", windowName),
  startDrag: () => ipcRenderer.invoke("window:drag_start"),
  drag: () => ipcRenderer.invoke("window:drag")
});
