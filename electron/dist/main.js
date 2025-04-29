"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const electron_2 = require("electron");
const isDev = !electron_1.app.isPackaged;
let win = null;
function createWindow() {
    const primaryDisplay = electron_2.screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    win = new electron_1.BrowserWindow({
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
            preload: path_1.default.join(__dirname, "preload.js"),
            contextIsolation: true,
        },
    });
    const url = isDev
        ? "http://localhost:3000"
        : `file://${path_1.default.join(__dirname, "../out/index.html")}`;
    win.loadURL(url);
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
electron_1.ipcMain.handle("run-command", async (_event, args) => {
    return new Promise((resolve, reject) => {
        const binaryPath = path_1.default.join(__dirname, "..", "razer-cli.exe");
        (0, child_process_1.execFile)(binaryPath, ["auto", ...args], (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                console.error("Error executing command:", stderr);
                reject(stderr);
            }
            else {
                resolve(stdout);
            }
        });
    });
});
