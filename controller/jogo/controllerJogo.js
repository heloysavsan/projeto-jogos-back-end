/*************************************************************************************
 * Objetivo: Controller responsável pela regra de negócio do CRUD do jogo
 * Autor: Heloysa Vilela Santos
 * Data: 13/02/2024
 * Versão: 1.0
 *************************************************************************************/

// Import do arquivo de configuração para mensagens e status code
const MESSAGE = require('../../modulo/config.js')

// Import do DAO para realizar o CRUD no BD
const jogoDAO = require('../../model/DAO/jogo.js')

// Função para inserir um novo jogo
const inserirJogo = async function(jogo, contentType) {
    try {
        if (contentType === 'application/json') {
            if (
                !jogo.nome || jogo.nome.length > 80 ||
                !jogo.data_lancamento || jogo.data_lancamento.length > 10 ||
                !jogo.versao || jogo.versao.length > 10 ||
                !jogo.tamanho || jogo.tamanho.length > 10 ||
                !jogo.descricao ||
                !jogo.foto_capa || jogo.foto_capa.length > 200 ||
                !jogo.link || jogo.link.length > 200
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                // Encaminha os dados do novo jogo para ser inserido no BD
                let resultJogo = await jogoDAO.insertJogo(jogo)

                if (resultJogo)
                    return MESSAGE.SUCESS_CREATED_ITEM // 201
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

// Função para atualizar um jogo
const atualizarJogo = async function(jogo, id, contentType) {
    try {
        if (contentType === 'application/json') {
            if (
                !jogo.nome || jogo.nome.length > 80 ||
                !jogo.data_lancamento || jogo.data_lancamento.length > 10 ||
                !jogo.versao || jogo.versao.length > 10 ||
                !jogo.tamanho || jogo.tamanho.length > 10 ||
                !jogo.descricao ||
                !jogo.foto_capa || jogo.foto_capa.length > 200 ||
                !jogo.link || jogo.link.length > 200 ||
                !id || isNaN(id) || id <= 0
            ) {
                return MESSAGE.ERROR_REQUIRED_FIELDS // 400
            } else {
                // Encaminha os dados do jogo para ser atualizado no BD
                let resultJogo = await jogoDAO.updateJogo(jogo, id)

                if (resultJogo)
                    return MESSAGE.SUCESS_UPDATED_ITEM // 200
                else
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

// Função para excluir um jogo
const excluirJogo = async function(id) {
    try {
        // Verifica se o ID é um número válido
        if (isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        }

        // Chama a função para excluir o jogo pelo ID
        let resultJogo = await jogoDAO.deleteJogo(id)

        if (resultJogo)
            return MESSAGE.SUCESS_DELETED_ITEM // 200
        else
            return MESSAGE.ERROR_NOT_FOUND // 404
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

// Função para retornar todos os jogos
const listarJogo = async function() {
    try {
        let dadosJogos = {}
        // Chama a função para retornar os dados do jogo
        let resultJogo = await jogoDAO.selectAllJogo()

        if (resultJogo && Array.isArray(resultJogo) && resultJogo.length > 0) {
            // Cria um objeto do tipo JSON para retornar a lista de jogos
            dadosJogos.status = true
            dadosJogos.status_code = 200
            dadosJogos.items = resultJogo.length
            dadosJogos.games = resultJogo

            return dadosJogos // 200
        } else {
            return MESSAGE.ERROR_NOT_FOUND // 404
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

// Função para buscar um jogo
const buscarJogo = async function(id) {
    try {
        if (!id || isNaN(id) || id <= 0) {
            return MESSAGE.ERROR_REQUIRED_FIELDS // 400
        } else {
            let dadosJogos = {}

            // Chama a função para retornar os dados do jogo pelo ID
            let resultJogo = await jogoDAO.selectByIdJogo(id)

            if (resultJogo && typeof resultJogo === 'object') {
                // Cria um objeto do tipo JSON para retornar os dados do jogo
                dadosJogos.status = true
                dadosJogos.status_code = 200
                dadosJogos.game = resultJogo

                return dadosJogos // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLER // 500
    }
}

module.exports = {
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarJogo,
    buscarJogo
}