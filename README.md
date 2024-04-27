#Projeto

O projeto foi construído na arquitetura MVC, a fim de modularizar a aplicação, de forma que ficasse mais compreensível;

Basicamente o projeto tem duas funções: login do usuário, cujas credenciais são armazenadas no NOSQL MONGODB, onde a plicação confere os dados para validar o acesso na página de LOGIN,
e um CRUD no MYSQL, para uma funcionalidade a parte de cadastro, leitura, atualização e delete de usuários.

O projeto tem a seguinte estrutura:
SRC
  -app
    -controllers
      usuarioController.js
    -database
      conexão.js
    -repositories
        usuarioRepository.js
  -models
    usuario.js
  -views
    login.ejs
    sucess.ejs
  app.js
  routes.js
  server.js

A pasta app foi subdividida em três subpastas:
  - controllers: onde foram definidas a classe de controle de validação de login, que acessa o Repository para essa validação;
  - database: onde foi definida os schemas do banco NOSQL (MONGODB). Na definição da conexão com o MONGODB,
    foi definida uma constante 'mongoURL' que armazena a URL com as credenciais para conexão com a base de dados do MONGODB.
    Nesse arquivo, foi definida ainda uma constante para armazenar as informações de conexão com a base de dados do MYSQL.
  - repositories: onde ficou definida a classe que para validar o Login no MongoDB;
Resumidamente, as requisições vem do usuarioControllers, que faz a requição no repository, que por sua vez faz a validação na base de usuário.

A pasta models, contém o arquivo Usuário, onde se define o objeto usuário e o SCHEMA da base do MONGODB.

A pasta views, contém o arquivo do front: página de login para acesso à aplicação do Flask.
  

O arquivo 'app.js', que é responsável pela definição do módulo 'express', bem como alguns outros módulos necessários para definição das rotas, 
configuradas no arquivo 'routes.js'. 

Nas rotas definidas no arquivo 'routes.js', foi importado o módulo 'usuarioController', para realizar a validação de login e fazer a rota para seus respectivos caminhos.

No arquivo 'server.js', foi definida a porta na qual o servidor vai receber as requisições, bem como vai informar se está pronto.

Na página inicial, foi inserida uma linha de código com o windows.location() para redirecionar a rota para a aplicação Flask, onde foi realizado o CRUD no banco de dados MySQL.
Assim que é relizada a chamada para verificar as credenciais no MongoDB, em caso de retorno positivo, a rota é acionada.
