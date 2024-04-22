import mongoose from '../database/conexao.js';
import { consulta } from '../database/conexao.js'
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


      findAll() {
        const sql = "SELECT * FROM bdusers.usuarios;"
        return consulta(sql, 'Não foi possível encontrar os dados.')
    }

    findById(id) {
        const sql = "SELECT * FROM bdusers.usuarios WHERE id = ?;"
        return consulta(sql, id, 'Não foi possível localizar o id informado.')
    }

    create(usuario) {
        const sql = "INSERT INTO usuarios SET ?;"
        return consulta(sql, usuario, 'Não foi possível realizar o cadastro.')
    }

    update(usuario, id) {
        const sql = "UPDATE usuarios SET ? where id = ?;"
        return consulta(sql, [usuario, id], 'Não foi possível atualizar os dados.')
    }

    delete(id) {
        const sql = "DELETE FROM bdusers.usuarios WHERE id = ?;"
        return consulta(sql, id, 'Não foi possível excluir o cdastro.')
    }

}

export default new usuarioRepository()