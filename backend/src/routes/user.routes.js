const express=require("express")
const router=express.Router()
const Usercontroller=require('../controllers/user.controllers')
const auth =require('../middlewares/auth')


//=>Rotas 
//Rota responsavel por criar um novo 'user':(Post):localhost:3000/api/v1/resister
router.post('/register',Usercontroller.registerNewUser)

//Rota responsavel por criar fazer loguin de um 'user'(post)
router.post('/login',Usercontroller.loginuser)

//Rota responsavel porresgatar dados do ususario(get)
router.get('/userProfile',auth,Usercontroller.userProfile)

module.exports=router