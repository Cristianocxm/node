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

A pasta app foi modularizada em três subpastas:
  - controllers: onde foram definidas a classe de controle de validação de login e de aplicação do CRUD;
  - database: onde foram definidos os schemas dos bancos NOSQL (MONGODB) e SQL (MySQL). Na definição da conexão com o MONGODB,
    foi definida uma constante 'mongoURL' que armazena a URL com as credenciais para conexão com a base de dados do MONGODB.
    Nesse arquivo, foi definida ainda uma constante para armazenar as informações de conexão com a base de dados do MYSQL,
    a fim de fazer a conexão para as tratativas do CRUD. Além disso, foi criada uma função "consulta" para realizaras querys no MYSQL;
  - repositories: onde ficou definida a classe que executa os CRUD;
Resumidamente, as requisições vem do usuarioControllers, que faz a requição no repository, que por sua vez busca as informações nas conexões definidas no arquivo conezão.

A pasta models, contém o arquivo Usuário, onde se define o objeto usuário e o SCHEMA da base do MONGODB, bem como uma função de validar as credenciais de acesso na página LOGIN.

A pasta views, contém os arquivos do front: página de login e de sucesso, em caso de validação das credenciais de acesso.
  

O arquivo 'app.js', que é responsável pela definição do módulo 'express', bem como alguns outros módulos necessários para definição das rotas, 
configuradas no arquivo 'routes.js'. 

Nas rotas definidas no arquivo 'routes.js', foi importado o módulo 'usuarioController', para realizar a validação de login e fazer a rota para seus respectivos caminhos.

No arquivo 'server.js', foi definida a porta na qual o servidor vai receber as requisições, bem como vai informar se está pronto.

O projeto tiha como objetivo inicial implmentar a integração das camadas do FLASK e NODE, mas por falta de conclusão, essa funcionalidade não foi implementada.
