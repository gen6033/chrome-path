const os = require("os");
const fs = require("fs");
const execFileSync = require('child_process').execFileSync;

function search(chrome_paths, app_dirs, executables){
  for(key in executables){
    for(dir of app_dirs){
      chrome_path = dir+executables[key]
      if(fs.existsSync(chrome_path)){
        chrome_paths[key] = chrome_path;
        break;
      }
    }
  }
  return chrome_paths;
}

module.exports = function(str, start, len){
  var chrome_paths = {"google-chrome":undefined,"google-chrome-canary":undefined,"chromium":undefined}
  switch(os.platform()){
    case "darwin":
      var app_dirs = ["/Applications/", os.homedir()+"/Applications/"];
      var executables = {
        "google-chrome":"Google Chrome.app/Contents/MacOS/Google Chrome",
        "google-chrome-canary":"Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
        "chromium":"Chromium.app/Contents/MacOS/Chromium"
      };
      return search(chrome_paths, app_dirs, executables);
    case "win32":
      var app_dirs = [process.env.LOCALAPPDATA+"\\", process.env.PROGRAMFILES+"\\", process.env['PROGRAMFILES(X86)']+"\\"];
      var executables = {
        "google-chrome":"\\Google\\Chrome\\Application\\chrome.exe",
        "google-chrome-canary":"Google\\Chrome SxS\\Application\\chrome.exe"
      };
      return search(chrome_paths, app_dirs, executables);
    case "linux":
      const commands = {
        "google-chrome":"google-chrome-stable",
        "google-chrome-canary":"google-chrome-unstable",
        "chromium":"chromium-browser"
      };
      for(key in commands){
        try{
          chrome_paths[key] = execFileSync("which", [commands[key]]).toString().trim();
        }catch(e){

        }
      }
      return chrome_paths;
    default:
      throw new Error("Unsupported platform")
  }
};
