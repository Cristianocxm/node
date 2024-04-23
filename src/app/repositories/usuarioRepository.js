import mongoose from '../database/conexao.js';
import Usuario from '../../models/usuarios.js'


class usuarioRepository{

    validaLogin(login) {
        console.log('Chamada: valida login');
        return Usuario.validarCredenciais(login.email, login.password)
          .then(usuario => {
            console.log('Login bem-sucedido. Usuário:', usuario);
            return usuario;
          })
          .catch(erro => {
            console.error('Erro ao validar credenciais:', erro.message);
            throw erro;
          });
      }
}

export default new usuarioRepository()