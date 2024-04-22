import mongoose from '../database/conexao.js'
import Usuario from '../../models/usuarios.js'


class usuarioRepository{

    validaLogin(login) {
        Usuario.validarCredenciais(login.email, login.senha)
    .then(usuario => {
        console.log('Login bem-sucedido. Usuário:', usuario);

    })
    .catch(erro => {
        console.error('Erro ao validar credenciais:', erro.message);
    });
    }


    findAll() {
        Usuario.findAll(function (err, suc){
            if (err) return handleError(err);
            console.log("Usuario criado!")
        })
    }

    findById(id) {
        Usuario.findById(function (err, suc){
            if (err) return handleError(err);
            console.log("Usuario criado!")
        })
    }

    create(usuario) {
        Usuario.create(usuario).then(usuarioCriado => {
            console.log('Novo usuário criado:', usuarioCriado);
        })
        .catch(erro => {
            console.error('Erro ao criar novo usuário:', erro);
        });
    }

    update(usuario, id) {
        Usuario.update(usuario, id, function (err, suc){
            if (err) return handleError(err);
            console.log("Usuario criado!")
        })
    }

    delete(id) {
        Usuario.delete(id, function (err, suc){
            if (err) return handleError(err);
            console.log("Usuario criado!")
        })
    }

}

export default new usuarioRepository()