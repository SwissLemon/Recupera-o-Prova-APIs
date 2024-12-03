const express = require("express")
const recu = express()
recu.use(express.json())

const clientes = [
    {
        id: 0,
        nome: "Jorge",
        telefone: "47999500967"
    }
] 
const carros = [
    {
        id: 0,
        marca:"Toyota",
        modelo: "Corolla",
        tamanho: "SEDAN",
        id_cliente: 0
    }
] 
const servicos = [
    {
        id: 0,
        descricao:"lavagem completa",
        valores: [{"tamanho": "HATCH", "valor": "50.8"}]
    }
] 
const agendamentos = [
    {
        id: 0,
        id_carro: 0, 
        id_servico: 0, 
        data_hora: "2024-10-25T14:00:00"
    }
] 

let clientesId = 1
let carrosId = 1
let servicosId = 1
let agendamentoId = 1

////// Validações ====>>>

const validarClientes = (cliente) => {
    erros = []
    if(!cliente.nome || cliente.nome.length < 3 || cliente.nome.length > 100){
        erros.push("O cliente deve possuir um nome entre 3 e 100 caracterers")
    }
    if(!cliente.telefone || !cliente.telefone.length === 11){
        erros.push("O cliente deve possuir um telefone com 11 digitos")
    }
    return erros
}

const validarCarros = (carro) => {
    erros = []
    if(!carro.marca || carro.marca.length < 3 || carro.marca.length > 50){
        erros.push("O carro deve possuir uma marca entre 3 e 50 caracterers")
    }
    if(!carro.modelo || carro.modelo.length < 3 || carro.modelo.length > 50){
        erros.push("O carro deve possuir um modelo entre 2 e 50 caracterers")
    }
    if(!carro.tamanho || carro.tamanho !== 'HATCH' && carro.tamanho !== 'SEDAN' && carro.tamanho !== 'SUV' && carro.tamanho !== 'PICAPE'){
        erros.push("O carro deve possuir um tamanho entre: HATCH, SEDAN, SUV ou PICAPE")
    }
    if(carro.id_cliente < 0){
        erros.push("O carro deve possuir um id de um cliente já cadastrado")
    }
    return erros
}

const validarServicos = (servico) => {
    erros = []
    if(!servico.descricao || servico.descricao.length < 3 || servico.descricao.length > 50){
        erros.push("O serviço deve possuir uma descricao entre 5 e 100 caracterers")
    }
    if (!servico.valores || servico.valores.valor < 0) {
        erros.push("O serviço deve possuir um valor superior ou igual a 0")
    }
    return erros
}

const validarAgendamentos = (agendamento) => {
    erros = []
    if (agendamento.id_carro < 0) {
        erros.push("O agendamento deve possuir um id de um carro já cadastrado")
    }
    if (agendamento.id_servico < 0) {
        erros.push("O agendamento deve possuir um id de um serviço já cadastrado")
    }
    if (!agendamento.data_hora || agendamento.data_hora.length !== 19) {
        erros.push("O agendamento deve possuir uma data e hora neste padrão: '2024-10-25T14:00:00'")
    }
    return erros
}

////// Clientes ====>>>

recu.get('/clientes', (req, res) =>{
    res.json(clientes)
})

recu.post('/clientes', (req, res) =>{
    const erros = validarClientes(req.body);
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }
    const novoCliente = {id: clientesId++, ...req.body };
    
    clientes.push(novoCliente);
    res.status(201).json({ message: 'Cliente cadastrado com sucesso' });
})

recu.get('/clientes/:id', (req, res) => {
    const cliente = clientes.find(u => u.id === parseInt(req.params.id));
    if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(cliente);
})

recu.put('/clientes/:id', (req,res) => {
    const { nome } = req.body
    const { telefone } = req.body
    const erros = validarClientes(req.body);
    
    const cliente = clientes.find(u => u.id === parseInt(req.params.id));
    if (cliente) {
        if (erros.length > 0) {
            return res.status(400).json({ erros });
        }
        cliente.nome = nome
        cliente.telefone = telefone
        res.status(201).json({ message: 'Usuario atualizado com sucesso'})
    } else {
        res.status(404).json({ message: 'Usuario não encontrado'})
    }
})

recu.delete('/clientes/:id', (req, res) => {
    const index = clientes.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        clientes.splice(index,1)
        res.status(200).json({ message : 'Usuario removido com sucesso'})
    } else {
        res.status(404).json({ message: 'Usuario não encontrado'})
    }
})




////// Carros ====>>>




recu.get('/carros', (req, res) =>{
    res.json(carros)
})

recu.post('/carros', (req, res) =>{
    const erros = validarCarros(req.body);
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }
    const novoCarro = {id: carrosId++, ...req.body };
    
    carros.push(novoCarro);
    res.status(201).json({ message: 'Carro cadastrado com sucesso' });
})

recu.get('/carros/:id', (req, res) => {
    const carro = carros.find(u => u.id === parseInt(req.params.id));
    if (!carro) {
        return res.status(404).json({ message: 'Carro não encontrado' });
    }
    res.json(carro);
})

recu.put('/carros/:id', (req,res) => {    
    const { marca } = req.body
    const { modelo } = req.body
    const { tamanho } = req.body
    const { id_cliente } = req.body
    const erros = validarCarros(req.body);
    
    const carro = carros.find(u => u.id === parseInt(req.params.id));
    if (carro) {
        if (erros.length > 0) {
            return res.status(400).json({ erros });
        }
        carro.marca = marca
        carro.modelo = modelo
        carro.tamanho = tamanho
        carro.id_cliente = id_cliente
        res.status(201).json({ message: 'Carro atualizado com sucesso'})
    } else {
        res.status(404).json({ message: 'Carro não encontrado'})
    }
})

recu.delete('/carros/:id', (req, res) => {
    const index = carros.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        carros.splice(index,1)
        res.status(200).json({ message : 'Carro removido com sucesso'})
    } else {
        res.status(404).json({ message: 'Carro não encontrado'})
    }
})




////// Servicos ====>>>




recu.get('/servicos', (req, res) =>{
    res.json(servicos)
})

recu.post('/servicos', (req, res) =>{
    const erros = validarServicos(req.body);
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }
    const novoServico = {id: servicosId++, ...req.body };
    
    servicos.push(novoServico);
    res.status(201).json({ message: 'Serviço cadastrado com sucesso' });
})

recu.get('/servicos/:id', (req, res) => {
    const servico = servicos.find(u => u.id === parseInt(req.params.id));
    if (!servico) {
        return res.status(404).json({ message: 'Servico não encontrado' });
    }
    res.json(servico);
})

//
recu.put('/servicos/:id', (req,res) => {    
    const { descricao } = req.body
    const { valores } = req.body
    const erros = validarServicos(req.body);
    
    const servico = servicos.find(u => u.id === parseInt(req.params.id));
    if (servico) {
        if (erros.length > 0) {
            return res.status(400).json({ erros });
        }
        servico.descricao = descricao
        servico.valores = valores
        res.status(201).json({ message: 'Servico atualizado com sucesso'})
    } else {
        res.status(404).json({ message: 'Servico não encontrado'})
    }
})
//

recu.delete('/servicos/:id', (req, res) => {
    const index = servicos.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        servicos.splice(index,1)
        res.status(200).json({ message : 'Servico removido com sucesso'})
    } else {
        res.status(404).json({ message: 'Servico não encontrado'})
    }
})




////// Agendamentos ====>>>




recu.get('/agendamentos', (req, res) =>{
    res.json(agendamentos)
})

recu.post('/agendamentos', (req, res) =>{
    const erros = validarAgendamentos(req.body);
    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }
    const novoAgendamento = {id: agendamentoId++, ...req.body };
    
    agendamentos.push(novoAgendamento);
    res.status(201).json({ message: 'Agendamento cadastrado com sucesso' });
})

recu.listen(3000, () =>{
    console.log("Servidor rodando na porta 3000")
})

module.exports = recu