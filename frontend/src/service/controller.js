
import API from "./api"

export default{
    

    async register(user){
       
        console.log(user)
        const response=await API().post('/register',user)
        const{token}=response.data
        console.log(response.data)// token vem juntos com esses dados 
       
    },

    async login(user){
            
        const response =await API().post('/login',user)
        return  response.data
          
    },


}