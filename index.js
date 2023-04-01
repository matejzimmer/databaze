const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");
const csvtojson = require('csvtojson');
const app = express();

app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


const port = 3000;
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.post('/savedata', urlencodedParser, (req, res) => {
    let str = `"${req.body.name}","${req.body.surname}","${req.body.znamka}","${req.body.predmet}","${req.body.note}"\n`;
    fs.appendFile(path.join(__dirname, 'data/znamky.csv'), str, function (err) {
        if (err) {
            console.error(err);
            return res.status(400).json({
                success: false,
                message: "Nastala chyba během ukládání souboru"
            });
        }
    });
    res.redirect(301, '/');
});
app.get("/data", (req, res) => {
    csvtojson({ headers: ['name', 'surname', 'znamka', 'predmet', 'note'] }).fromFile(path.join(__dirname,
        'data/znamky.csv'))
        .then(data => {
            console.log(data);
            res.render('index', { nadpis: "Známky žáků", znamky: data });
        })
        .catch(err => {
            console.log(err);
            res.render('error', { nadpis: "Chyba v aplikaci", chyba: err });
        });
});

app.use(express.static("index"));

app.listen(port, () => {
    console.log(`Server naslouchá na portu ${port}`);
});