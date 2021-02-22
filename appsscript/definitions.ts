// shortcuts for types
type GAS_Blob = GoogleAppsScript.Base.Blob;
type DriveFolder = GoogleAppsScript.Drive.Folder;
type DriveFile = GoogleAppsScript.Drive.File;

// classes
interface ImageResponse {
  promptCell: string;
  imageTitle: string;
  imageBlob: GAS_Blob;
  order: number;
}
