const fs = require("node:fs");
const readlineSync = require("readline-sync");
const path = require("path");

const mainFolder = path.join("D:", "Media", "Cartoons");
const exportFolder = path.join("D:", "Media", "Cartoons", "Exported");
const suffix = " -[exported]";
const foldersToExclude = ['LONG', "Exported"]

function main (){
    let welcomeMsg = 
`----------------------------------------------------
File Copy and Track
This script will help you to copy episodes from each series folder.
Scanning for subFolders...`
    console.log(welcomeMsg)
    let subFolders = getSubFolders(mainFolder)
    console.log(`Found ${subFolders.length} folders (${foldersToExclude.length} exclusion filters applied) \n----------------------------------------------------`)
    let subFoldersExpanded = subFolders.map(folder=> getFiles(folder));
    subFoldersExpanded.map(folder => {console.log(`${folder.name} | ${folder.files.length} available | ${folder.allFiles.length} total\n----------------------------------------------------`)})
    let pickedFiles = pickFiles(subFoldersExpanded)
    copyFiles(pickedFiles)
    addSuffix(pickedFiles)
}

function getSubFolders(directoryName){
    return fs
      .readdirSync(directoryName, { withFileTypes: true })
      .filter((folder) => folder.isDirectory() && !foldersToExclude.includes(folder.name))
}

function getFiles(directoryName) {
    let expandedFolder = {name: directoryName.name}
    expandedFolder.allFiles = fs.readdirSync(path.join(mainFolder, directoryName.name), { withFileTypes: true })
    .filter(file => isVideoFile(file.name))

    expandedFolder.files = expandedFolder.allFiles
    .filter((file) =>  !file.name.includes(suffix))
    .map(file=> file.name);
    return expandedFolder;
    }
function isVideoFile(fileName) {
        let videoExtensions = [
          ".mp4",
          ".avi",
          ".mov",
          ".mkv",
          ".wmv",
          ".flv",
          ".webm",
          ".mpg",
          ".mpeg",
          ".3gp",
          ".rm",
          ".ts",
          ".mts",
          ".m4v",
          ".ogv",
          ".vob",
          ".asf",
          ".nsv",
          ".iso",
          ".xvid",
          ".h264",
          ".hevc",
          ".divx",
        ];
      
        // Get the file extension
        const ext = path.extname(fileName).toLowerCase();
      
        // Check if the extension is in the list of video extensions
        return videoExtensions.includes(ext);
      }

function pickFiles(fileList) {
    //takes in the output array from scanFiles function
    //returns an array with full path to the selected files.
    let filePaths = [];
    fileList.forEach((subFolder) => {
      //asks user how many files they want, for each subFolder
      let number = readlineSync.question(
        `\nType in number of files to copy from "${subFolder.name}" (${subFolder.files.length}/${subFolder.allFiles.length} available) `
      );
  
      //pick the files and add their full paths to the filePaths array
      let pickedFiles = subFolder.files.slice(0, number);
      pickedFiles.forEach((fileName) => {
        filePaths.push(path.join(mainFolder, subFolder.name, fileName));
        console.log('    ',fileName);
      });
  
      console.log(`${pickedFiles.length} files selected from ${subFolder.name}`);
      console.log(
        `---------------------------------------------------------------`
      );
    });
    return filePaths;
  }

  function copyFiles(filePaths) {
    filePaths.forEach((p) => {
      fs.copyFileSync(p, path.join(exportFolder, path.basename(p)),fs.constants.COPYFILE_FICLONE)
      console.log(`copied ${p}`)
    });
  }

  function addSuffix(filePaths) {
    filePaths.map(originalPath => {

        let dir = path.dirname(originalPath);
        let ext = path.extname(originalPath);
        let name = path.basename(originalPath, ext);
        let newFileName = `${name}${suffix}${ext}`;
        let newPath = path.join(dir, newFileName);
        
        console.log(originalPath);
        console.log(newPath);
    })
  }
  
  
main()