# CRUD com Node.js e React

Este projeto consiste em um aplicativo CRUD (Create, Read, Update, Delete) desenvolvido em Node.js para o backend, utilizando React para o frontend. O banco de dados utilizado é o MySQL, com o phpMyAdmin como interface de administração.

## Instalação

Certifique-se de ter o npm e o Node.js instalados em sua máquina.

### Importações de Bibliotecas

Para instalar as bibliotecas necessárias, utilize os seguintes comandos:

```bash
npm install mysql2 express cors
```

- **mysql2/promise**: Fornece uma interface MySQL promissificada.
- **express**: Framework web para Node.js que simplifica o desenvolvimento de aplicativos.
- **cors**: Middleware Express para habilitar o controle de acesso HTTP.

## Execução

1. **Servidor Backend**:
   - Deixe um terminal rodando o arquivo `server.js` localizado em `server/server.js` executando o comando:
     ```bash
     node server.js
     ```

2. **Servidor Frontend**:
   - Em outro terminal, vá para o diretório do frontend (geralmente `client`) e execute o comando:
     ```bash
     npm run dev
     ```

3. **Acesso ao Aplicativo**:
   - Acesse o aplicativo em um navegador da web através do endereço `http://localhost:{porta}`, onde `{porta}` é a porta especificada durante a execução do servidor.

Observe que o terminal informará em qual porta o servidor está ouvindo.

Com isso, você estará executando o aplicativo CRUD com Node.js e React, interagindo com o banco de dados MySQL através do phpMyAdmin como interface de administração.