var fs = require('fs');

const fileDelete = (filePath)=>fs.unlink(filePath, (err) => {
    if (err) {
      console.error("fileDelete", err);
      return;
    }
  });

  module.exports = fileDelete;