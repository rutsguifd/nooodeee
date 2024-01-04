const { exec } = require("child_process");
const fs = require("fs");

const logFileName = "activityMonitor.log";

function getProcessInfo() {
  if (process.platform === "win32") {
    return new Promise((resolve, reject) => {
      exec(
        'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1"',
        (error, stdout) => {
          if (error) {
            reject(error);
          } else {
            const [name, cpu, workingSet] = stdout.trim().split(/\s+/);
            resolve(`${cpu}% ${workingSet} ${name}`);
          }
        }
      );
    });
  } else {
    return new Promise((resolve, reject) => {
      exec(
        "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1",
        (error, stdout) => {
          if (error) {
            reject(error);
          } else {
            const [cpu, mem, name] = stdout.trim().split(/\s+/);
            resolve(`${name} ${cpu}% ${mem}`);
          }
        }
      );
    });
  }
}

async function monitorSystem() {
  try {
    const processInfo = await getProcessInfo();
    process.stdout.write(`\r${processInfo}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

setInterval(monitorSystem, 100);

setInterval(async () => {
  const processInfo = await getProcessInfo();
  fs.appendFileSync(logFileName, `${Date.now()} : ${processInfo}\n`);
}, 60 * 1000);
