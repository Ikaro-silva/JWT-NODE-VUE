const express=require('express')
const mongoose=require('mongoose')
const database=require('./db.config')

mongoose.Promise=global.Promise;

mongoose.connect(database.local.localDataBaserl,
)
.then(()=>{
    console.log("Base de dados conectada com sucesso")
}).catch((err)=>{
    console.log("Erro ao conectar banco de dados",err)
    process.exit()
})