const path = require('path');
console.log(__dirname + '/../public')
const express = require('express');
var app = express();
const publicPath = path.join(__dirname + '/../public');
var port = process.env.PORT || 3000;
console.log(publicPath);

app.use(express.static(publicPath));
app.post('/index.html', () => {
    console.log(publicPath + '/index.html')
});

app.listen(port, () => {
    console.log(publicPath + '/index.html')
    console.log(`Server is up at ${port}`);

})