// preload.cjs
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  loadTasks: () => ipcRenderer.invoke("tasks:load"),
  updateTasks: (tasks) => ipcRenderer.invoke("tasks:update",tasks),
  resize: (collapsed) => ipcRenderer.invoke("window:resize",collapsed)
});
