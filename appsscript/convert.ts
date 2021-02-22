function LibraryConversion() {
  
  // DocsServiceApp: https://github.com/tanaikech/DocsServiceApp

  // establish map for prompts and their image responses
  // Key = prompt, Value = image information
  let sheetRes = new Map<string, ImageResponse>();
  let placement: number = 1;
  for (let i = startRow; i <= imageRange; ++i) {
    sheetRes.set(`B${i}`, {promptCell: `A${i}`, imageBlob: null, imageTitle: null, order: placement});
    placement++;
  }

  // get spreadsheet
  var ss = SpreadsheetApp.openById(ssID);
  
  // get images from spreadsheet
  const imgArray = DocsServiceApp.openBySpreadsheetId(ss.getId()).getSheetByName(sheetName).getImages();
  Logger.log(imgArray);

  // add image title and blobs
  imgArray.forEach(ssImage => {
    let currRange = ssImage.range.a1Notation;
    if (sheetRes.has(currRange)) { // possibly check if image inserted by inner cell feature?
      let currValue = sheetRes.get(currRange);
      let samePromptCell = currValue.promptCell;
      let samePlacement = currValue.order;
      let imgTitle = ss.getActiveSheet().getRange(currValue.promptCell).getValue().toString();
      let imgBlob = ssImage.image.blob;
      imgBlob.setName(`${samePlacement}_${imgTitle}`);
      //reinstert into map with full data
      sheetRes.set(currRange, {promptCell: samePromptCell, imageBlob: imgBlob, imageTitle: imgTitle, order: samePlacement}); 
    }
  });

  // add images to file in drive
  handleNewFiles(evaluationName, sheetRes);
}
