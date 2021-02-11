function HTTPConversion() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var url = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + ss.getId() + "&exportFormat=xlsx";
  var params = {
      method      : "get",
      headers     : {"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
      muteHttpExceptions: true
  };
  var ssBlob = UrlFetchApp.fetch(url, params).getBlob();

  ssBlob.setName(ss.getName() + ".xlsx");

  DriveApp.createFile(ssBlob);

}