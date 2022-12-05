//Requiring module
const express = require('express');
const mysql = require('mysql2');
const connect = require('./conexao.js');

//Creating express object
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Handling GET request
app.get('/', (req,res)=> {
    res.send('Hello World')
    res.end()
})


app.get('/clientes', (req, res) =>{
res.setHeader("Access-Control-Allow-Origin","*");
res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
return connect.execSQLQuery('select * from cliente', res);
})


app.get('/clientes/:id', (req, res) =>{
res.setHeader("Access-Control-Allow-Origin","*");
res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
return connect.execSQLQuery('select * from cliente where id='+ req.params.id, res);
})

app.put('/clientes/:id', (req, res) =>{
res.setHeader("Access-Control-Allow-Origin","*");
res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
return connect.execSQLQuery("update cliente set nome='"+req.body.nome+"' where id="+req.params.id, res);
})

app.post('/clientes/', (req, res) =>{
res.setHeader("Access-Control-Allow-Origin","*");
res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
return connect.execSQLQuery("insert into cliente (nome) value('"+req.body.nome+"')", res);
})

app.delete('/clientes/:id', (req, res) =>{
res.setHeader("Access-Control-Allow-Origin","*");
res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
return connect.execSQLQuery("delete from cliente where id="+ req.params.id, res);
})

//port Number
const PORT= process.env.PORT||5000;

//Server Setup
app.listen(PORT, console.log(
    `Server started on port: ${PORT}`
));