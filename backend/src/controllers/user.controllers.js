const User=require('../models/user.models')

exports.registerNewUser=async(req,res)=>{
    
    try{
        let isUser=await User.find({name:req.body.name})
        let isEmail=await User.find({email:req.body.email})
        
        if(isUser.length>=1){
            res.status(409).json({message:'Sorry this name is already register'})
            return
        }
        if(isEmail.length>=1){
            
            res.status(409).json({message:'Sorry this email is already register'})
            return
        }

        const newUser=new User(req.body)
        const user=await newUser.save()
        const token=await newUser.generateAuthToken()
        res.status(201).json({message:'user create succefully!',user})
    }catch(err){
        res.status(400).send(err)
    }
}

exports.loginuser=async (req,res)=>{
    try{
        
        const email=req.body.email
        const password=req.body.password
        const user= await User.findByCredentals(email,password)

        if(!user){
            return res.status(401).json({err:'Loguin invalido'})
        }
        res.status(201).json({messge:'Usuario logado com sucesso!',user})
        return user.tokens
         
        
    }catch(err){
        res.status(400).json({err:err})    }
}

exports.userProfile=async(req,res)=>{
    await res.json(req.userData)
    console.log(req.userData)
}
