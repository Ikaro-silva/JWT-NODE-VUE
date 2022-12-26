const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt =require("jsonwebtoken")
const secret= process.env.SECRET

const Schema=mongoose.Schema


const userShema=new Schema({
    name:{
        type:String,
        maxlength:50,
        require:true
    },
    email:{
        type:String,
        maxlength:50,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    tokens:[
        {
            token:{type:String}
        }
    ]   
},{
    timestamps:true,
    collection:"users"
})

 
userShema.pre('save',async function(){
    
    const user=this
    if(user.isModified('password')){
    user.password= await bcrypt.hash(user.password,8)
    }
    
})

userShema.methods.generateAuthToken=async function(){
     
    const user=this
    const token=jwt.sign({_id:user._id,name:user.name,email:user.email},secret)
    user.tokens= user.tokens.concat({token})
    
    await user.save()
    
    return token
}


userShema.statics.findByCredentals = async (email,password)=>{
    const user=await User.findOne({email})
    
    if(!user){
        throw new Error({erro:"login invalido!"})
    }
    const isPassWordMatch= await bcrypt.compare(password,user.password)
    if(!isPassWordMatch){
        throw new Error({error:"senha invalida!"})
    }

    return user

}

const User=mongoose.model("User",userShema)

module.exports=User