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


usuarioSchema.statics.validarCredenciais = async function(email, password) {
  try {
    const usuario = await Usuario.findOne({ email: email });
    if (!usuario) {
      throw new Error('E-mail inválido');
    }
    if (usuario.password !== password) {
      throw new Error('Senha inválida');
    }
    console.log('Acesso liberado para o usuário:', email);
    return usuario;

  } catch (error) {
    throw new Error('Erro ao validar credenciais');
  }
};


const Usuario = mongoose.model('Usuarios', usuarioSchema);

export default Usuario