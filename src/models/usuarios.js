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

  usuarioSchema.statics.validarCredenciais = async function(email, senha) {

    const usuario = await this.findOne({ email });
    if (!usuario) {
        throw new Error('Credenciais inválidas');
    }
    
    if (usuario.senha !== senha) {
        throw new Error('Credenciais inválidas');
    }

    return usuario;
};

  const Usuario = mongoose.model('Usuarios', usuarioSchema);
  
 export default Usuario