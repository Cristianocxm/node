
import mongoose from 'mongoose'

const mongoURL = "mongodb+srv://cristianomarinho:wqLXp9ek8gEWPuEh@cluster0.eomylit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log('Conexão com o banco de dados MongoDB estabelecida com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados MongoDB:', error);
    });

export default mongoose