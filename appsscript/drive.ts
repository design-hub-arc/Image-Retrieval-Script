function handleNewFiles(ssID: string, evalName: string, response: Map<string, ImageResponse>) {
  // As of 2/8/2021 clasp typescript is outdated and does not recognize moveTo()
  // moveTo() is defined and works, ignore the red underline

  // check general folder, make if not already existing
  let generalFolder: DriveFolder = handleFolder(genFolderName);

  //make exam specific folder, move to gen folder
  let evalFolder: DriveFolder = handleFolder(evalName);
  evalFolder.moveTo(generalFolder);

  //move files to exam folder 
  response.forEach(imgRes => {
    handleFile(imgRes.imageBlob, evalFolder);
  });
}

function handleFolder(folderName: string): DriveFolder {
  let exists = DriveApp.searchFolders("title = '" + folderName + "'");
  if (!exists.hasNext()) {
    Logger.log("Must make new " + folderName + " folder"); // must create folder
    return DriveApp.createFolder(folderName);
  }
  else {
    Logger.log("Folder " + folderName + " already exists."); // folder already exists
    return exists.next();
  }
}

function handleFile(fileBlob: GAS_Blob, folder: DriveFolder): DriveFile {
  const fileName: string = fileBlob.getName();
  let exists = folder.searchFiles("title = '" + fileName + "'");
  if (!exists.hasNext()) {
    Logger.log("Must make new " + fileName + " file"); // must create folder
    return folder.createFile(fileBlob);
  }
  else {
    Logger.log(`file ${fileName} already exists inside of folder ${folder.getName()}`); // folder already exists
    return exists.next();
  }
}