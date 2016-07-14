var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(3030, function () {
  console.log('Studio Clock app listening on port 3030');
  console.log('Visit http://localhost:3030 in a browser');
});
