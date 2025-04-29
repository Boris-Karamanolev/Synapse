"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const isDev = !electron_1.app.isPackaged;
let win = null;
function createWindow() {
    win = new electron_1.BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path_1.default.join(__dirname, "preload.js"),
            contextIsolation: true,
        },
    });
    const url = isDev ? "http://localhost:3000" : `file://${path_1.default.join(__dirname, "../out/index.html")}`;
    win.loadURL(url);
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        electron_1.app.quit();
});
electron_1.ipcMain.handle("run-command", async (_event, args) => {
    return new Promise((resolve, reject) => {
        const binaryPath = path_1.default.join(__dirname, "..", "razer-cli.exe"); // adjust for your binary
        (0, child_process_1.execFile)(binaryPath, ["auto", ...args], (error, stdout, stderr) => {
            if (error)
                reject(stderr);
            else
                resolve(stdout);
        });
    });
});
