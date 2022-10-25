# Trabalho de engenharia de software - Notable
Esse repositório consiste no desenvolvimento de um trabalho para a disciplina Engenharia de Software, ofertada pelo DCC-UFMG.

## Escopo do sistema
O sistema consite em uma aplicação de bloco de notas, em que cada usuário pode criar diversas notas, ver e organizar as notas já criadas. O sistema é concebido para ser utilizado pelo navegador, o que o torna utilizável em diversas plataformas. Em sua primeira versão, o sistema conta com as seguintes *features*:

- Autenticação de usuários e apresentação da informação referente a esse usuário
- Escrever notas
- Visualizar todas as notas, com *preview*
- Visualizar uma nota individual, em detalhes
- Favoritar notas

## Backlog
- [x] **Tarefas de configuração inicial**
	- [x] Criar projeto React e configurar contexto
	- [x] Configurar projeto no Firebase

- [x] **Eu, como usuário, quero acessar um ambiente exclusivamente meu**
	- [x] Criar página de login, conectada ao Firebase
	- [x] Criar página de cadastro, conectada ao Firebase
	- [x] Configurar autenticação através do Firebase
	- [x] Configurar contexto de autenticação na aplicação

- [x] **Eu, como usuário, quero conseguir criar e visualizar notas**
	- [x] Criar, no banco de dados, a entidade "nota"
	- [x] Criar página de criação de notas, com ligação ao banco de dados através do Firebase
	- [x] Criar página de listar notas, puxando do banco de dados
	- [x] Criar página de visualizar uma nota individualmente

- [ ] **Eu, como usuário, quero conseguir favoritar notas**
	- [ ] Criar fluxo de favoritar nota
	- [ ] Modificar componente de nota para exibir que é favorita
	- [ ] Criar seção de notas favoritas


## Time de desenvolvimento
O sistema será desenvolvido pelo seguinte time, com os seguintes papeis:

- Álvaro Araújo - backend
- Arthur Comarelli - frontend
- Gabriel Andrade - fullstack
- Leandro Gripp - fullstack

## Tecnologias
As tecnologias utilizadas serão:

- React para desenvolvimento frontend
- Express.js para desenvolvimento da API
- Firebase para gestão de autenticação e de banco de dados
  - O banco de dados será não relacional, utilizando o Firestore
