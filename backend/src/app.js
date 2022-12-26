const express=require('express')
const cors= require('cors')


const morgan =require('morgan')
const mongooseConec=require('./config/mogoose.config')
const app=express()

//Rotas API
const index=require('./routes/index')
const routerUser=require('./routes/user.routes')
//Database
app.set('mongoose conect',mongooseConec)

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.json({type:'application/vnd.api+json'}))
app.use(morgan('dev'))
app.use(cors())

app.use(index)
app.use('/api/v1',routerUser)


module.exports=app