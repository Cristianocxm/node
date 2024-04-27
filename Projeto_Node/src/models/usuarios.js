import mongoose from 'mongoose'

class UsuarioObj {
  constructor(nome,email,password) {
    this.model = nome
    this.model = email
    this.model = password
  }
}

const usuarioSchema = new mongoose.Schema({
    nome: {
      type:String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }

  });

usuarioSchema.loadClass(UsuarioObj)

const Usuario = mongoose.model('Usuarios', usuarioSchema);

export default Usuario