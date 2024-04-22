import { Router } from "express";
import usuarioController from './app/controllers/usuarioController.js';


const router = Router()


//ROTAS

router.post('/login', usuarioController.validaLogin)
router.get('/usuarios', usuarioController.index)
router.get('/usuarios/:id', usuarioController.show)
router.post('/usuarios', usuarioController.store)
router.put('/usuarios/:id', usuarioController.update)
router.delete('/usuarios/:id', usuarioController.delete)

router.get('/', (req, res) => {
    res.render('login'); // Passa a mensagem de erro para a página
});

router.get('/sucess', (req, res) => {
    res.render('sucess'); // Passa a mensagem de erro para a página
});


export default router