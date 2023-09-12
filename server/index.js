const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "phonebook"
})

//getting data to database
app.get("/contacts", (request, response) => {
    const sqlSelect = "SELECT * FROM contacts";

    db.query(sqlSelect, (err, res) => {
        if (err) {
            console.log("Error fetch data");
        } else {
            response.send(res);
        }
    })
})


//Inserting Data to DATABASE
app.post("/contacts/add", (request, response) => {

    const name = request.body.contactName;
    const num =  request.body.contactNum;

    const sqlInsert = "INSERT INTO contacts (contactName, contactNum) VALUES (?, ?)";

    db.query(sqlInsert, [name, num], (err, result) => {
        if (err) {
            console.log("error");
        } else {
            console.log(result);
        }
    })
})

//edit/Update data
app.put("/contacts/update", (request, response) => {

    const id = request.body.id;
    // const name = request.body.id
    const num = request.body.contactNum;

    const sqlUpdate = "UPDATE contacts SET contactNum = ? WHERE id = ?";
    db.query(sqlUpdate, [num, id], (err, result) => {
        if (err) {
            console.log("cannot update")
        } else {
            console.log("Updated Successfully");
        }
    })
})


//deleting data
app.delete("/contacts/delete/:id", (request, response) => {

    const id = request.params.id;

    const sqlDelete = "DELETE FROM contacts WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log("cannot delete item");
        } else {
            console.log(`${result} successfully deleted`);
        }
    })
})


//test url to go http://localhost:3001/test
// app.get("/test", (req, res) => {
//     res.send("Hello")
// })


app.listen(PORT, () => {
    console.log(`You are connecting to localhost myAdmin ${PORT}`);
})