const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const ROOT = path.resolve(__dirname, "..");

function log(msg) { console.log("[" + new Date().toLocaleTimeString() + "] " + msg); }

function installDependencies() {
  log("Installing frontend dependencies...");
  execSync("npm install", { cwd: ROOT, stdio: "inherit" });
  log("Installing backend dependencies...");
  execSync("npm install", { cwd: path.join(ROOT, "backend"), stdio: "inherit" });
}

function main() {
  console.log("Taxi Academy - Setup");
  installDependencies();
  console.log("Setup complete!");
}

main();