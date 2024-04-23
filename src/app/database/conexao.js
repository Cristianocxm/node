
import mongoose from 'mongoose'

//const dbUser = process.env.DB_USER
//const dbPassword = process.env.PASS


const mongoURL = `mongodb+srv://cristianomarinho:QBcklMC2jvI85MBx@cluster0.eomylit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log('Conexão com o banco de dados MongoDB estabelecida com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados MongoDB:', error);
    });

export default mongoose