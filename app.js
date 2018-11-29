require('dotenv').config()

const express = require('express')
const app = express()
const http = require('http').Server(app)
const mysql = require('mysql')
const bodyParser = require('body-parser');

//global constant
const port = 3003

//server init
http.listen(port, "0.0.0.0", function(){
  console.log('listening on :', port);
});

//config
app.use(express.static('public'))
app.set('view engine', 'pug');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.get('/', (req, res) => {

  //get employees list
  connection.query('SELECT * FROM employees', function (err, rows, fields) {
    if (err) throw err
    res.render('index', { employees: rows});
  })
})
//create
app.get('/create', (req, res)=>{
  res.render('create');  
})

app.post('/create', (req, res)=>{
  connection.query('INSERT INTO employees (name) VALUES (?)',[req.body.name] ,function (err, rows, fields) {
    if (err) throw err
    res.redirect('/');
  })  
})

//update
app.get('/update/:id', (req, res)=>{
  connection.query(`SELECT * FROM employees WHERE id=?`,[req.params.id],
    function (err, rows, fields) {
      if (err) throw err      
      res.render('update', {employee: rows[0]});  
    })
})

app.post('/update/:id', (req, res)=>{
  connection.query(`UPDATE employees SET name=? WHERE id=?`,[req.body.name,req.params.id],function (err, rows, fields) {
    if (err) throw err
    res.redirect('/');
  })  
})

//delete
app.get('/delete/:id', (req, res)=>{
  connection.query(`Delete FROM employees WHERE id=?`,[req.params.id],
    function (err, rows, fields) {
      if (err) throw err      
      res.redirect('/');  
    })
})




//database
const connection = mysql.createConnection({
  host     : 'localhost',
  user : process.env.DB_USER,
  password: process.env.DB_PASS,
  database : 'dohyunwoo'
});

connection.connect()
