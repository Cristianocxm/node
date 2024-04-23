import { Router } from "express";
import usuarioController from './app/controllers/usuarioController.js';


const router = Router()


//ROTAS

router.get('/', (req, res) => {
    res.render('login'); // Passa a mensagem de erro para a página
});

// Middleware para realizar o redirecionamento


// Defina a rota /login e utilize a função validaUsuario como um middleware
router.post('/login', usuarioController.validaUsuario);


export default router