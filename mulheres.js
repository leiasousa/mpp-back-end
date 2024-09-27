const express = require("express") //iniciando o express
const router = express.Router()// config primeira parte da rota
const cors = require("cors")//para consumir esta API no front-end

//const {v4: uuidv4} = require("uuid")
const conectaBancoDeDados = require("./bancoDeDados")//ligando ao arquivo bancoDeDados
conectaBancoDeDados()//chamando a função do arquivo bancoDeDados

const Mulher = require("./mulherModel")//essa bastração mostra a regra da criação dos objetos no BD
const mulherModel = require("./mulherModel")
const app = express() //iniciando o app

app.use(express.json())//os dados que trafegarão estano formato json
app.use(cors())//liberando a API para ser usada a partir do front-end
const porta = 3333 //criando a porta



//GET
async function mostraMulheres(request, response){
    try{
        const mulheresVidasDoBancoDeDados = await Mulher.find()
        response.json(mulheresVidasDoBancoDeDados)
    }catch (erro){
        console.log(erro)
    }
    response.json(mulheresVidasDoBancoDeDados)
}

//POST
async function criaMulher(request, response){
    const novaMulher = new Mulher ({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    //mulheres.push(novaMulher)
    //response.json(mulheres)
    try{
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    }catch(erro){
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response){
    // function encontraMulher(mulher){
    //     if (mulher.id === request.params.id){
    //         return mulher
    //     }
    // }

    try{
        const mulherEncontrada = await Mulher.findById(request.params.id)
        
        if (request.body.nome){
            mulherEncontrada.nome = request.body.name
        }
        if (request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem
        }
    
        if (request.body.citacao){
            mulherEncontrada.citacao = request.body.citacao
        } 
        
        //salva a mulher no banco de dados
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        //retorna a mulher salva    
        response.json(mulherAtualizadaNoBancoDeDados)
        
    }catch(erro){
        console.log(erro)
    }

}

//DELETE
async function deletaMulher(request, response){
    // function todasMenosEla(mulher){
    //     if (mulher.id !== request.params.id) {
    //         return mulher
    //     }
    // } //substituido pelas funções do mongoose

    try{
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({mensagem: "Mulher deletada com sucesso!"})
    }catch(erro){
        console.log(erro)
    }

    const mulheresQueFicaram = mulheres.filter(todasMenosEla)
    response.json(mulheresQueFicaram)
}

//Porta
function mostraPorta(){
    console.log("Servidor criado e rodando na porta ", porta)
}
app.use(router.get("/mulheres", mostraMulheres))//Configurei rota GET /mulheres
app.use(router.post("/mulheres", criaMulher))//config rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher))//config rota PATCH
app.use(router.delete("/mulheres/:id", deletaMulher))//config rota DELETE
app.listen(porta, mostraPorta)//Servidor ouvindo a porta