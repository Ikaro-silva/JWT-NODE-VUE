const dotenv=require("dotenv")
dotenv.config()
module.exports={
    local:{
        localDataBaserl:process.env.DB_URI,
        secret:"password"
    }
}