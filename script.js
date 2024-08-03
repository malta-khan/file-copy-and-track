const fs = require("node:fs");
const readlineSync = require("readline-sync");
const mainFolder = "./test/target";

function scanFiles(directoryName) {
  //find all sub folders
  let folders = fs
    .readdirSync(directoryName, { withFileTypes: true })
    .filter((folder) => folder.isDirectory());

  //make an array that will store details of each sub folder
  let fileList = [];

  folders.forEach((folder) => {
    //search each subFolder for files, make an array for each subfolder
    //first object inside that array is subFolder's name,
    // second is number of files in that folder after applying filters,
    // and third is actual names of files inside that subfolder
    let folderDetails = [folder.name, , []];

    let files = fs
      .readdirSync(`${mainFolder}/${folder.name}`, { withFileTypes: true })
      .filter((folder) => folder.isFile());
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
      `How many files from ${subFolder[0]}? (${subFolder[1]} availabe)\n`
    );

    //pick the files and add their full paths to the filePaths array
    let pickedFiles = subFolder[2].slice(0, number);
    pickedFiles.forEach((fileName) => {
      filePaths.push(`${mainFolder}/${subFolder[0]}/${fileName}`)
      console.log(fileName);
    });

    console.log(`Selected ${pickedFiles.length} files from ${subFolder[0]} \n`);
  });
  return filePaths;
}

//function copyFile
//takes in filepath and copies it to destination
//copies all those files to a specefied folde

//function renamerFiles
//takes in a file path and renames it with a prefix so it wont show up in next scanFiles run
//adds a prefix to their filenames so that they get filtered in next scanFiles run

let scanResults = scanFiles(mainFolder);
console.log(pickFiles(scanResults))
