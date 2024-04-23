from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:123456@localhost/cadastro_func'
db = SQLAlchemy(app)

class Setor(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(50), nullable=False)

class Cargo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(50), nullable=False)
    id_setor = db.Column(db.Integer, db.ForeignKey('setor.id'), nullable=False)
    setor = db.relationship('Setor', backref='cargos')

class Funcionario(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    primeiro_nome = db.Column(db.String(50), nullable=False)
    sobrenome = db.Column(db.String(50), nullable=False)
    data_admissao = db.Column(db.Date, nullable=False)
    status_funcionario = db.Column(db.Boolean, nullable=False)
    id_setor = db.Column(db.Integer, db.ForeignKey('setor.id'), nullable=False)
    id_cargo = db.Column(db.Integer, db.ForeignKey('cargo.id'), nullable=False)
    setor = db.relationship('Setor', backref='funcionarios')
    cargo = db.relationship('Cargo', backref='funcionarios')

def verifica_e_cria_tabelas(): #Função que verifica se as tabelas existem no banco e criá-las caso contrário.
    with app.app_context():
        inspector = inspect(db.engine)
        tabelas_existentes = inspector.get_table_names()
        tabelas_necessarias = ['setor', 'cargo', 'funcionario']
        
        for tabela in tabelas_necessarias:
            if tabela not in tabelas_existentes:
                print(f"A tabela '{tabela}' não existe. Criando...")
                db.create_all()
                print(f"Tabela '{tabela}' criada com sucesso.")
            else:
                print(f"A tabela '{tabela}' já existe.")

def obter_dados_do_banco_de_dados(tabela): #Função para retornar os dados da base de acordo com o parâmetro passado (setor, cargo, funcionario)
    try:
        if tabela == 'cargo':
            cargos = Cargo.query.all()
            return cargos
        elif tabela == 'setor':
            setores = Setor.query.all()
            return setores
        elif tabela == 'funcionario':
            funcionarios = Funcionario.query.all()
            return funcionarios
    except Exception as e:
        print(f"Erro ao obter os dados da tabela {tabela} do banco de dados: {str(e)}")
        return []

@app.route('/cadastrar_setor', methods=['GET', 'POST']) #Rota para cadastrar os setores
def cadastrar_setor():
    if request.method == 'POST':
        nome = request.form['nome']
        novo_setor = Setor(nome=nome)
        try:
            db.session.add(novo_setor)
            db.session.commit()
            return redirect(url_for('sucesso', mensagem="Setor cadastrado com sucesso"))
        except Exception as e:
            return 'Ocorreu um erro ao cadastrar o setor: ' + str(e)

    return render_template('setor.html')

@app.route('/cadastrar_cargo', methods=['GET', 'POST']) #Rota para cadastrar os cargos
def cadastrar_cargo():
    if request.method == 'POST':
        nome = request.form['nome']
        id_setor = request.form['id_setor']
        novo_cargo = Cargo(nome=nome,id_setor=id_setor)

        try:
            db.session.add(novo_cargo)
            db.session.commit()
            return redirect(url_for('sucesso', mensagem="Cargo cadastrado com sucesso"))
        except Exception as e:
            return 'Ocorreu um erro ao cadastrar o setor: ' + str(e)
    
    setores = Setor.query.all()
    return render_template('cargo.html', setores=setores)

@app.route('/cadastrar_funcionario', methods=['GET', 'POST']) #Rota para cadastrar os funcionários
def cadastrar_funcionario():
    if request.method == 'POST':
        primeiro_nome = request.form['primeiro_nome']
        sobrenome = request.form['sobrenome']
        data_admissao = request.form['data_admissao']
        status_funcionario = request.form['status_funcionario']
        if status_funcionario == '1':
            status_funcionario = True
        else:
            status_funcionario = False
        id_setor = request.form['id_setor']
        id_cargo = request.form['id_cargo']
        
        novo_funcionario = Funcionario(
            primeiro_nome=primeiro_nome,
            sobrenome=sobrenome,
            data_admissao=data_admissao,
            status_funcionario=status_funcionario,
            id_setor=id_setor,
            id_cargo=id_cargo)

        try:
            db.session.add(novo_funcionario)
            db.session.commit()
            return redirect(url_for('sucesso', mensagem="Funcionário cadastrado com sucesso")) 
        except Exception as e:
            return 'Ocorreu um erro ao cadastrar o setor: ' + str(e)
    
    setores = Setor.query.all()
    cargos = Cargo.query.all()
    return render_template('funcionario.html', setores=setores, cargos=cargos)

@app.route('/excluir_setor/<int:id>', methods=['GET', 'POST'])
def excluir_setor(id):
    setor = Setor.query.get_or_404(id)
    try:
        db.session.delete(setor)
        db.session.commit()
        return redirect(url_for('setores'))
    except Exception as e:
        return 'Ocorreu um erro ao excluir o setor: ' + str(e)

@app.route('/excluir_funcionario/<int:funcionario_id>', methods=['GET', 'POST'])
def excluir_funcionario(funcionario_id):
    funcionario = Funcionario.query.get_or_404(funcionario_id)
    try:
        db.session.delete(funcionario)
        db.session.commit()
        return redirect(url_for('funcionarios'))
    except Exception as e:
        return f'Ocorreu um erro ao excluir o funcionário: {str(e)}'

@app.route('/excluir_cargo/<int:cargo_id>', methods=['GET', 'POST'])
def excluir_cargo(cargo_id):
    cargo = Cargo.query.get_or_404(cargo_id)
    try:
        db.session.delete(cargo)
        db.session.commit()
        return redirect(url_for('cargos'))
    except Exception as e:
        return f'Ocorreu um erro ao excluir o cargo: {str(e)}'
    
@app.route('/editar_setor/<int:id>', methods=['GET', 'POST'])
def editar_setor(id):
    setor = Setor.query.get_or_404(id)
    if request.method == 'POST':
        setor.nome = request.form['nome']
        try:
            db.session.commit()
            return redirect(url_for('sucesso', mensagem="Setor atualizado com sucesso"))  # Redireciona para a página de sucesso
        except Exception as e:
            return 'Ocorreu um erro ao atualizar o setor: ' + str(e)
    # Renderiza o formulário de edição com os dados do setor
    return render_template('atualiza_setor.html', setor=setor)

@app.route('/editar_cargo/<int:id>', methods=['GET', 'POST'])
def editar_cargo(id):
    cargo = Cargo.query.get_or_404(id)
    setores = Setor.query.all()
    print('cargo:',cargo)
    print('setor:',setores)

    if request.method == 'POST':
        cargo.nome = request.form['nome']
        cargo.id_setor = request.form['id_setor']  # Atualiza o ID do setor do cargo
        try:
            db.session.commit()
            return redirect(url_for('sucesso', mensagem="Cargo atualizado com sucesso"))
        except Exception as e:
            return 'Ocorreu um erro ao atualizar o cargo: ' + str(e)

    return render_template('atualiza_cargo.html', cargo=cargo, setores=setores)

@app.route('/editar_funcionario/<int:funcionario_id>', methods=['GET', 'POST'])
def editar_funcionario(funcionario_id):
    funcionario = Funcionario.query.get_or_404(funcionario_id)
    if request.method == 'POST':
        # Atualiza os dados do funcionário com base no formulário enviado
        funcionario.primeiro_nome = request.form['primeiro_nome']
        funcionario.sobrenome = request.form['sobrenome']
        funcionario.data_admissao = request.form['data_admissao']
        funcionario.status_funcionario = request.form['status_funcionario'] == '1'
        funcionario.id_setor = request.form['id_setor']
        funcionario.id_cargo = request.form['id_cargo']
        try:
            db.session.commit()
            return redirect(url_for('gerenciar_cadastros'))
        except Exception as e:
            return f'Ocorreu um erro ao atualizar o funcionário: {str(e)}'
    # Renderiza o formulário de edição com os dados do funcionário
    setores = Setor.query.all()
    cargos = Cargo.query.all()
    return render_template('editar_funcionario.html', funcionario=funcionario, setores=setores, cargos=cargos)

@app.route('/') #Rota página inicial
def index():
    return render_template('index.html')

@app.route('/sucesso') #Rota para a mensagem de sucesso
def sucesso():
    mensagem = request.args.get('mensagem')
    return render_template('sucesso.html', mensagem=mensagem)

@app.route('/gerenciar_cadastros')
def gerenciar_cadastros():
    return render_template('gerenciar.html')

@app.route('/setores') #Rota para gerenciar os setores na página "gerenciar"
def setores():
    setores = obter_dados_do_banco_de_dados('setor')
    return render_template('gerenciar.html', tipo='setores', dados=setores)

@app.route('/cargos') #Rota para gerenciar os caargos na página "gerenciar"
def cargos():
    cargos = obter_dados_do_banco_de_dados('cargo')
    return render_template('gerenciar.html', tipo='cargos', dados=cargos)

@app.route('/funcionarios') #Rota para gerenciar os funcionarios na página "gerenciar"
def funcionarios():
    funcionarios = obter_dados_do_banco_de_dados('funcionario')  
    return render_template('gerenciar.html', tipo='funcionarios', dados=funcionarios)

if __name__ == '__main__':
    verifica_e_cria_tabelas()
    app.run(debug=True)
    
