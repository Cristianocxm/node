import { Router } from "express";
import usuarioController from './app/controllers/usuarioController.js';


const router = Router()


//ROTAS

router.get('/', (req, res) => {
    res.render('login'); // Passa a mensagem de erro para a página
});

router.post('/login', usuarioController.validaUsuario)
router.get('/usuarios', usuarioController.index)
router.get('/usuarios/:id', usuarioController.show)
router.post('/usuarios', usuarioController.store)
router.put('/usuarios/:id', usuarioController.update)
router.delete('/usuarios/:id', usuarioController.delete)

router.get('/success', (req, res) => {
    res.render('success'); // Ou envie o conteúdo da página de sucesso
});

export default router