type GAS_Blob = GoogleAppsScript.Base.Blob;
type DriveFolder = GoogleAppsScript.Drive.Folder;
type DriveFile = GoogleAppsScript.Drive.File;

interface ImageResponse {
  promptCell: string;
  imageTitle: string;
  imageBlob: GAS_Blob;
  order: number;
}

  // values
const ssID = "1L8U3_ZpGQB-tgedLHUQiQZCNmhbdZRTJuLjzwdiemGY"; //to get images from
const genFolderName: string = 'Sheet Image Evaluations'; // root folder
const evaluationName = "Cats"; // subroot folder for this sheet
const imageRange: number = 4; // number of prompts/images
const startRow: number = 1; // row where prompts/images start
const sheetName = "Sheet1"; // currently not in use since images are extracted from all sheets