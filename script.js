const fs = require("node:fs");
const readlineSync = require("readline-sync");
const path = require("path");

const mainFolder = path.join("D:", "Media", "Cartoons");
const exportFolder = path.join("D:", "Media", "Cartoons", "Exported");
const suffix = " -[exported]";

// const exportFolder = path.join("F:","Exported");

function scanFiles(directoryName) {
  //find all sub folders
  let folders = fs
    .readdirSync(directoryName, { withFileTypes: true })
    .filter((folder) => folder.isDirectory())
    .filter((folder) => folder.name != "LONG" && folder.name != "Exported");
  //make an array that will store details of each sub folder
  let fileList = [];

  folders.forEach((folder) => {
    //search each subFolder for files, make an array for each subfolder
    //first object inside that array is subFolder's name,
    // second is number of files in that folder after applying filters,
    // and third is actual names of files inside that subfolder after applying filters
    let folderDetails = [folder.name, , []];

    let files = fs
      .readdirSync(`${mainFolder}/${folder.name}`, { withFileTypes: true })
      .filter((file) => {
        return isVideoFile(file.name) && !file.name.includes(suffix)
      });
    files.forEach((file) => {
      folderDetails[2].push(file.name);
    });
    folderDetails[1] = folderDetails[2].length;
    fileList.push(folderDetails);
  });

  return fileList;
}

function pickFiles(fileList) {
  //takes in the output array from scanFiles function
  //returns an array with full path to the selected files.
  let filePaths = [];
  fileList.forEach((subFolder) => {
    //asks user how many files they want, for each subFolder
    let number = readlineSync.question(
      `\nType in number of files to copy from "${subFolder[0]}" (${subFolder[1]} total) `
    );

    //pick the files and add their full paths to the filePaths array
    let pickedFiles = subFolder[2].slice(0, number);
    pickedFiles.forEach((fileName) => {
      filePaths.push(path.join(mainFolder, subFolder[0], fileName));
      console.log(fileName);
    });

    console.log(`${pickedFiles.length} files selected from ${subFolder[0]}`);
    console.log(
      `---------------------------------------------------------------`
    );
  });
  return filePaths;
}

function copyFiles(arrayOfPaths) {
  arrayOfPaths.forEach((p) => {
    fs.copyFile(p, path.join(exportFolder, path.basename(p)), (err) => {
      if (err) {
        return console.log(err);
      }
      console.log(`copied ${p}`);
    });
  });
}

function renamer(originalPath) {
  let dir = path.dirname(originalPath);
  let ext = path.extname(originalPath);
  let name = path.basename(originalPath, ext);
  let newFileName = `${name}${suffix}${ext}`;
  let newPath = path.join(dir, newFileName);

  console.log(originalPath);
  console.log(newPath);
}

function isVideoFile(filePath) {
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
  const ext = path.extname(filePath).toLowerCase();

  // Check if the extension is in the list of video extensions
  return videoExtensions.includes(ext);
}

//function renamerFiles
//takes in a file path and renames it with a prefix so it wont show up in next scanFiles run
//adds a prefix to their filenames so that they get filtered in next scanFiles run

let scanResults = scanFiles(mainFolder);
let filePaths = pickFiles(scanResults);
console.log(filePaths);
copyFiles(filePaths);

// renamer('D:\\Media\\Cartoons\\Bluey S01\\Bluey S01E03 720p x264-GalaxyTV.mkv', ".mkv")
