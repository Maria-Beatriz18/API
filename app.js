//Requiring module
const express = require('express');
const mysql = require('mysql2');
const connect = require('./conexao.js');

//Creating express object
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Handling GET request

//app.get('/', (req, res) => {
//res.send('A simple Node App is' + 'running on this server')
//res.end()
//})

app.get('/', function (req, res, next) {
    console.log('A API está rodando' + 'nesse servidor');
    next();
  }, function (req, res) {
    res.send('Hello World!');
    res.end();
  });


//ESTRUTURA DE UMA API DE CONSULTA DE DADOS.
app.get('/clientes', (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    return connect.execSQLQuery('select * from cliente', res);
    })

//app.get('/clientes', (req, res) =>{
//return connect.execSQLQuery('select * from cliente', res);
//})


//ESTRUTURA DE UMA API DE CONSULTA DE DADOS COM ID.
app.get('/clientes/:id', (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    return connect.execSQLQuery('select * from cliente where id='+ req.params.id, res);
    })

//app.get('/clientes/:id?', (req, res) => {
//    let filter = '';
//    if(req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
//    return connect.execSQLQuery('select * from cliente' + filter, res);
//})


//MÉTODO PUT - ALTERAR DADOS

app.put('/clientes/:id', (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    return connect.execSQLQuery("update cliente set nome='"+req.body.nome+"' where id="+req.params.id, res);
    })


//app.put('/clientes/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//    const nome = req.body.nome.substring(0,100);
//    return connect.execSQLQuery(`update cliente set nome='${nome}' WHERE ID=${id}`, res);
//})


//MÉTODO POST - INCLUIR DADOS

app.post('/clientes/', (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    return connect.execSQLQuery("insert into cliente (nome) value('"+req.body.nome+"')", res);
    })
    
    
//app.post('/clientes/', (req, res) =>{
//return connect.execSQLQuery( "insert into cliente (nome) value('"+req.body.nome+"')", res);
//})

//MÉTODO DELETE - DELETAR DADOS
app.delete('/clientes/:id', (req, res) =>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    return connect.execSQLQuery("delete from cliente where id="+ req.params.id, res);
    })

//app.delete('/clientes/:id', (req, res) =>{
//return connect.execSQLQuery('delete from cliente where id=' + parseInt(req.params.id), res);
//})

//port Number
const PORT= process.env.PORT||5000;

//Server Setup
app.listen(PORT, console.log(
    `Server started on port: ${PORT}`
));