import axios from "axios"
import cadastroModel from "./Cadastro"


export async function getUsers (req: any, res: any) {
    
    try {
        const body = req.body

        if(!body){
            return res.send('Não tem ninguém').status(400)
        }
        
    
        const findUser = await cadastroModel.find({cpf_cnpj: body.cpf_cnpj})
        

        if (findUser.length < 0) {
            return res.status(400).send('Não localizado')
        }    
        
        return res.status(200).send(findUser)

    } catch (error) {
        return res.send('deu ruim...').status(400)
    }
}


export async function postUsers (req: any, res: any) {
    try {
        const body = req.body

        if(body && body.email && body.cpf_cnpj) { 

            await cadastroModel.create(body)
            return res.status(200).send('Cadastro criado com sucesso') 
            
        }       

    } catch (error) {
        return res.status(400).send('Não foi possível cadastrar.')
    }
}

export async function postTransfer(req: any, res:any) {
    try {

        const body = req.body

       let findUser = await cadastroModel.find({cpf_cnpj: body.cpf_cnpj})
       //CONTA QUE ESTÁ ENVIANDO
       let valorConta = findUser[0].saldoConta
       let typeUser = findUser[0].user_type
       let valorCompra = req.body.valorCompra



        const url = "http://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6"
        axios.get(url).then((retorno) =>{
        const autorizado = retorno.data.message

            if (autorizado != 'Autorizado') {
                console.log(autorizado)
                throw Error      
            }

        })
    
    
       if(valorConta >= valorCompra && typeUser == "comum" ) {
        
         let novoSaldo: number = valorConta - valorCompra
         findUser[0].saldoConta = novoSaldo
         
         await cadastroModel.updateOne({cpf_cnpj: body.cpf_cnpj}, findUser[0])

         //CONTA QUE ESTÁ RECEBENDO
         let cpf_cnpj_recebe: string = req.body.cpf_cnpj_recebe
         let enviado = await cadastroModel.find({cpf_cnpj: body.cpf_cnpj_recebe})
         
         let valorContaRecebendo = enviado[0].saldoConta
         let novoSaldoRecebendo: number = valorContaRecebendo + valorCompra
         enviado[0].saldoConta = novoSaldoRecebendo
         
         await cadastroModel.updateOne({cpf_cnpj: cpf_cnpj_recebe}, enviado[0])


        
        
        return res.status(200).send(`Transação com sucesso... Novo Valor em conta: ${novoSaldo}`)
       }
       
       if(valorCompra > valorConta && typeUser == "comum"){

        return res.status(400).send('Saldo insuficiente...')
       }


       return res.status(400).send('Conta é de Logista: '+findUser[0].user_type)
        
    } catch (error) {
        return res.status(400).send('indisponível...')
    }
}

