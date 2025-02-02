import sqlite3

""""Categorias adicionadas: animal 
                            objeto
                            tecnologia
                            fruta
                            formato
                            sentimento
                            cidade
                            """


# Função para adicionar palavras 
"""
def adicionar_palavra(palavra, categoria):
    conexao = sqlite3.connect('banco_palavras.db')
    cursor = conexao.cursor()
    cursor.execute('INSERT INTO palavras (palavra, categoria) VALUES (?, ?)', (palavra, categoria))
    conexao.commit()
    conexao.close()
    print(f"Palavra '{palavra}' adicionada com sucesso!")

# Exemplo de uso (essas palavras já foram adicionadas)
adicionar_palavra('morango', 'fruta')
adicionar_palavra('marcador', 'objeto')
"""


# Função para listar todas as palavras no banco
"""""
def listar_palavras():
    conexao = sqlite3.connect('banco_palavras.db')  # Conecta ao banco
    cursor = conexao.cursor()
    cursor.execute('SELECT * FROM palavras')  # Consulta todas as linhas da tabela
    palavras = cursor.fetchall()  # Obtém os resultados
    conexao.close()
    return palavras

# Exibir as palavras armazenadas
for palavra in listar_palavras():
    print(f"ID: {palavra[0]}, Palavra: {palavra[1]}, Categoria: {palavra[2]}")
"""""


# Função para deletar palavras pelo ID
"""""
def deletar_palavra(id_palavra):
    conexao = sqlite3.connect('banco_palavras.db')  # Conecta ao banco
    cursor = conexao.cursor()
    
    # Comando SQL para deletar pela posição (ID)
    cursor.execute('DELETE FROM palavras WHERE id = ?', (id_palavra,))
    
    conexao.commit()  # Salva as mudanças no banco
    conexao.close()
    print(f"Palavra com ID {id_palavra} deletada com sucesso!")

# Deletar as palavras nas posições 3 e 4, por exemplo
deletar_palavra(3)
deletar_palavra(4) 
"""

