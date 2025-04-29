import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  runCommand: (args: string[]) => ipcRenderer.invoke("run-command", args),
});
