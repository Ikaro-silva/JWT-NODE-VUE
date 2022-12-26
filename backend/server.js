const App= require('./src/app')

const PORT=process.env.PORT||3000
App.listen(PORT,()=>{
    console.log("servidor conectado com sucesso"+PORT)
})