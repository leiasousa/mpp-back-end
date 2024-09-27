const mongoose = require("mongoose")//trazer o mongoose para este projeto
require("dotenv").config()
//função async libera o uso do await para que outras coisas aconteçam
async function conectaBancoDeDados(){
    try{
        console.log("A conexão com o banco de dados iniciou")

        await mongoose.connect(process.env.MONGO_URL)

        console.log("Conexão com o banco de dados feita com sucesso!")
    } catch(erro){
        console.log(erro)
    }
}

module.exports = conectaBancoDeDados