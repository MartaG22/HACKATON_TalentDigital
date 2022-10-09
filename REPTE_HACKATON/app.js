//! Tarea 1
// Tengo un endpoint que puede convertir archivos de una columna.

'use strict';

const express = require('express');
const CSVToJSON = require("csvtojson");

const app = express();
const multer = require('multer');
const path = require('path');

const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));

app.use(express.json());


//? berta y gerard


// Definim les expresions RegExp per fer coincidir text amb un patró.
//  RegExp ens permet eliminar les cometes entre cualsevol tipus de número
const numberRegexp = RegExp(/"[+-]?((\d*[.])?\d+)"/g);


//Endpoint per convertir un arxiu CSV d'una sola columna
app.get("/oneColumn", async (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        //Convertir arxiu CSV a JSON utilitzant la librería csvtojson
        let users = await CSVToJSON().fromFile("public/users_column.csv");
        
        // Utilitzem RegExp per eliminar les cometes entre qualsevol tipus de número
        users = JSON.stringify(users);
        users = users.replace(numberRegexp, '$1');
        users = JSON.parse(users);
        
        //Enviem  resposta
        res.status(200).json(users);
    } catch (err) {
        res.status(400);
    }
});













//! Tarea 2
// Tengo un endpoint que puede (o el mismo anterior) que puede convertir archivos multicolumna.



app.get("/multicoma", async (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    try {
        //Convertir arxiu CSV a JSON utilitzant la llibrería CSVTOJSON
        let users = await CSVToJSON().fromFile("public/users.csv");
        
        // Utilitzem la RegExp per eliminar les cometes entre qualsevol tipo de número
        users = JSON.stringify(users);
        users = users.replace(numberRegexp, '$1');
        users = JSON.parse(users);
        
        //Enviamos la respuesta
        res.status(200).json(users);
    } catch (err) {
        res.status(400);
    }
});





// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {

//         let extensioArxiu = path.extname(file.originalname);

//         if (extensioArxiu == '.csv') {
//             return cb(null, true);

//         } else {
//             console.log("Extensió no permesa");
//             req.fileValidationError = "Extensió no permesa";
//             return cb(null, false, req.fileValidationError);
//         };
//     }
// });


// app.post('/upload', upload.single('imatge'), (req, res, next) => {
//     console.log(req.file)

//     if (req.fileValidationError) {
//         console.log("Error: " + req.fileValidationError);
//         // console.log("No s'ha pujat cap arxiu!");
//         return res.status(400).json({ error: req.fileValidationError });

//     } else if (!req.file) {
//         console.log("No s'ha pujat cap arxiu!");
//         return res.status(400).json({ error: "No s'ha pujat cap arxiu!" });

//     } else {
//         // console.log(req.file);
//         // console.log(path.extname(req.file.originalname));
//         return res.status(200).send({ success: `L'arxiu s'ha carregat correctament: ${req.file.originalname}` });
//     };

// });






//! Tarea 3
// Los números devueltos están en formato num/Int/double/float y no en formato string



//! Tarea 4
// Añadir test utilizando insomnio / Postman



app.listen(port, () => {
    console.log(`API REST inicialitzant en http://localhost: ${port}`)
});
