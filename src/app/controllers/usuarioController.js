
import usuarioRepository from '../repositories/usuarioRepository.js';
import app from '../../app.js'

class usuarioController {

    async validaUsuario(req, res) {
        try {
            const login = req.body;
            await usuarioRepository.validaLogin(login);
            res.status(200).send({ message: 'Login bem-sucedido' });
        } catch (error) {
            console.error('Erro ao validar o login:', error);
            res.redirect('/login?error=1');
        }
    }

}

export default new usuarioController();