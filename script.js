const fs = require('node:fs');
fileNames = fs.readdirSync(__dirname);
fileNames.forEach(file => { 
  console.log(file); 
}); 