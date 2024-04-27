import '../database/conexao.js';
import Usuario from '../../models/usuarios.js'


class UsuarioRepository {

  async validaLogin(login) {
    try {
      const usuario = await Usuario.findOne({ email: login.email });
      if (!usuario) {
        throw new Error('E-mail inválido');
      }
      if (usuario.password !== login.password) {
        throw new Error('Senha inválida');
      }
      console.log('Acesso liberado para o usuário:', login.email);
      return usuario;
    } catch (error) {
      console.error('Erro ao validar credenciais:', error.message);
      throw new Error('Erro ao validar credenciais');
    }
  }
}

export default new UsuarioRepository()