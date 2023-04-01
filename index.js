const express = require("express");

const app = express();
const port = 3000;

app.use(express.static("index"));

app.listen(port, () =>{
    console.log(`Server naslouchá na portu ${port}`);
});