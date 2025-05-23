/*********************************************************************************************
 
* Objetivo: API referente ao projeto de controle de jogos
 * Autor: Heloysa Vilela Santos
 * Data: 13/02/2024
 * Versão: 1.0
 * Observação:
 *********** Para configurar e instalar a API, precisamos das seguintes bibliotecas:
 *                 express             npm install express --save
 *                 cors                npm install cors --save
 *                 body-parser         npm install body-parser --save
 *
 *********** Para configurar e Instalar o acesso ao Banco de Dados precisamos:
                   prisma              npm install prisma --save (Conexão com o BD)
                   prisma/client       npm install @prisma/client --save (Executa scripts no BD)
*
*** Após a instalação do prisma e do prisma client, devemos:
*                 npx prisma init   (Inicializa o prisma no projeto)

    Para realizar o sincronismo do prisma com o BD, devemos executar o seguinte comando:
        npx prisma migrate dev
 ********************************************************************************************/

//import das bibliotecas para criar a API
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Import das controllers para realizar o CRUD de dados
const controllerJogo = require('./controller/jogo/controllerJogo.js')

//Estabelecendo formato de dados que deverá chegar no body da requisição (POST ou PUT)
const bodyParserJSON = bodyParser.json()

//Cria o objeto app para criar a API
const app = express()

//Cinfigurações do cors
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())
    next()
})

//EndPoint para criar um jogo no BD
app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function (request, response) {
    
    //Recebe o content type para validar o tipo de dados da requisição
    let contentType = request.headers['content-type']
    //Recebe o conteúdo do body da requisição
    let dadosBody = request.body

    //Encaminhando os dados do body da requisição para a controller inserir no BD
    let resultJogo = await controllerJogo.inserirJogo(dadosBody, contentType)
    
    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

//EndPoint para retornar uma lista de jogos
app.get('/v1/controle-jogos/jogo', cors (), async function (request, response){
    //Chama a função para listar os jogos
    let resultJogo = await controllerJogo.listarJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.get('/v1/controle-jogos/jogo/:id', cors(), async function (request, response) {
    // Extrai o ID do parâmetro da URL
    let idJogo = request.params.id

    // Chama a função para buscar o jogo pelo ID
    let resultJogo = await controllerJogo.buscarJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.delete('/v1/controle-jogos/deletar/jogo/:id', cors(), async function (request, response) {
    // Extrai o ID do parâmetro da URL
    let idJogo = request.params.id

    // Chama a função para excluir o jogo pelo ID
    let resultJogo = await controllerJogo.excluirJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.delete('/v1/controle-jogos/jogo/:id', cors(), async function (request, response){
    let idJogo = request.params.id

    let resultJogo = await controllerJogo.excluirJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})


app.put('/v1/controle-jogos/jogo/:id', cors(), bodyParserJSON, async function (request, response){

    let contentType = request.headers['content-type']

    let idJogo = request.params.id

    let dadosBody = request.body

})



app.listen(8080, function(){
    console.log('API aguardando Requisições...')
})
