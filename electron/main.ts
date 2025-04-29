import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { execFile } from "child_process";
import { screen } from "electron";

const isDev = !app.isPackaged;
let win: BrowserWindow | null = null;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  win = new BrowserWindow({
    width: 400,
    height: 600, // Adjusted height to match the G-Helper style
    x: width - 405, // Position the window at the right bottom corner
    y: height - 605, // Adjusted position to match the new height
    resizable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    backgroundColor: "#000000",
    title: "Razer Helper",
    backgroundMaterial: "none",
    movable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../out/index.html")}`;

  win.loadURL(url);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("run-command", async (_event, args: string[]) => {
  return new Promise((resolve, reject) => {
    const binaryPath = path.join(__dirname, "..", "razer-cli.exe");
    execFile(binaryPath, ["auto", ...args], (error, stdout, stderr) => {
      if (error) {
        console.log(error);
        console.error("Error executing command:", stderr);
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
});
