import cadastro from "./Controllers/Cadastro"
import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import { getUsers, postUsers, postTransfer } from "./Controllers/userController"


const app = express()

app.use(bodyParser.json())


const port = 3000



//ROUTS
app.get('/usuario', getUsers) //retorna usuario
app.post('/cadastrar', postUsers) //cadastrar usuarios
app.post('/transacao', postTransfer) //transação



mongoose

.connect(``)
.then(
    () => {
        app.listen(port)
        console.log(`Funcionando na Porta: ${port}`)
    }
)
.catch(err => console.log(err))



