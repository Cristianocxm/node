import usuarioRepository from '../repositories/usuarioRepository.js';



class usuarioController {

    async validaUsuario(req, res) {
        try {
            const login = req.body;
            await usuarioRepository.validaLogin(login);
            // Redireciona para a página de sucesso após a validação bem-sucedida
            res.render('success');
        } catch (error) {
            console.error('Erro ao validar o login:', error);
            res.redirect('/login?error=1');
        }
    }

    async index(req, res) {
        const row = await usuarioRepository.findAll()
        res.json(row)
    }

    async show(req, res) {
        const id = req.params.id
        const row = await usuarioRepository.findById(id)
        res.json(row)
    }

    async store(req, res) {
        const usuario = req.body
        const row = await usuarioRepository.create(usuario)
        res.json(row)
    }

    async update(req, res) {
        const usuario = req.body
        const id = req.params.id
        const row = await usuarioRepository.update(usuario, id)
        res.json(row)
    }

    async delete(req, res) {
        const id = req.params.id
        const row = await usuarioRepository.delete(id)
        res.json(row)
    }
}


export default new  usuarioController();