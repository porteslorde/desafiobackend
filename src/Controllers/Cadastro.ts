
import { Schema } from 'mongoose';
import mongoose from 'mongoose';


interface ICadastro {
  nomeCompleto: string;
  email: string;
  senha: string;
  cpf_cnpj: string;
  user_type: string;
  saldoConta: number;

  
}


const cadastroSchema = new Schema<ICadastro>({
  nomeCompleto: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  senha: {type: String, required: true},
  cpf_cnpj: {type: String, required: true, unique: true},
  user_type: {type: String, required: true},
  saldoConta: {type: Number, required: true},
  
})

const cadastroModel = mongoose.model<ICadastro>('Cadastro', cadastroSchema);


export default  cadastroModel;