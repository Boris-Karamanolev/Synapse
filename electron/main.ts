import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { execFile } from "child_process";

const isDev = !app.isPackaged;
let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  const url = isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../out/index.html")}`;

  win.loadURL(url);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("run-command", async (_event, args: string[]) => {
  return new Promise((resolve, reject) => {
    const binaryPath = path.join(__dirname, "..", "razer-cli.exe"); // adjust for your binary
    execFile(binaryPath, ["auto", ...args], (error, stdout, stderr) => {
      if (error) reject(stderr);
      else resolve(stdout);
    });
  });
});
