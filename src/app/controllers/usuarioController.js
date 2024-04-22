import usuarioRepository from '../repositories/usuarioRepository.js';



class usuarioController {

    async validaLogin(req, res) {
        const login = req.body
        console.log(login)
        await usuarioRepository.validaLogin(login, res)
        res.redirect('/sucess');
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