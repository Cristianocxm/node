
import mongoose from 'mongoose'
import mysql from 'mysql'

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


const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'bdusers'
    
    })
    
    conexao.connect()
    
/**
* Executa o sql com ou sem valores
* @param {string} sql instrução sql a ser executada
* @param {string=id / string=usuario / [usuario, id]} valores valores a serem passados para a coonsulta 
* @param {string} mensagemReject mensagem de erro que será retornada em cada método em caso de falha.
* @returns objeto Promise
*/
    
export const consulta = (sql, valores='', mensagemReject) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, valores, (erro, resultado) => {
            if(erro) return reject(mensagemReject)
            const retorno = JSON.parse(JSON.stringify(resultado))
            return resolve(retorno)
        })
    })
}


export default conexao