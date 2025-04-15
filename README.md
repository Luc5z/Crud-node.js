# Projeto de Cadastro de Usuários

Este é um sistema completo de **cadastro de usuários** com funcionalidades de **CRUD (Create, Read, Update, Delete)**, desenvolvido com **Node.js + TypeScript + Express** no backend e dois frontends distintos usando **React**: um com **Material UI** e outro com **Ant Design**. 

A API foi rigorosamente testada utilizando o **Postman**, garantindo sua funcionalidade e confiabilidade.

---

### 💻Tecnologias Utilizadas

### 🧠 Backend
- **Node.js** – Ambiente de execução JavaScript no servidor.
- **Express** – Framework minimalista para APIs REST.
- **TypeScript** – Tipagem estática para maior segurança.
- **SQLite** – Banco de dados leve e local.

### 🖼️ Frontend (2 interfaces)

Decidi criar duas interfaces distintas para explorar diferentes abordagens de design e usabilidade. Cada uma delas oferece uma experiência única, permitindo comparar estilos e funcionalidades. Optei pelo Framework React por sua flexibilidade e pela familiaridade que tenho com ele.

#### ✅ Ant Design (ANT)
- Componentes visuais profissionais e consistentes.
- Tabelas interativas, formulários com confirmação e modais integrados.
- Front End com estilo mais moderno e criativo. 

#### 🎨 Material UI (MUI)
- Estilo moderno com design fluido.
- Icones intuitivos para facilitar a usabilidade.
- Front End com estilo mais estruturado e sério.

---

## 🛠️ Como Rodar o Projeto

### 📦 Backend

1. Acesse a pasta do backend da API:
```bash
cd crud-api 
```

2. Instale as dependências do projeto:
```bash
npm install
```

3. Inicie o servidor:
```bash
npm run dev
```

### 🌐 Frontend

1. Acesse a pasta do frontend desejado (Material UI ou Ant Design):
```bash
cd frontend-mui
# ou
cd frontend-ant
```

2. Instale as dependências do projeto:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

--- 

## 📂 Estrutura do Projeto

```
/crud-api
    ├── src
    │   ├── controllers
    │   ├── database
    │   ├── models
    │   ├── routes
    │   └── services

/frontend-mui
    ├── src
    │   ├── components
    │   ├── pages
    │   └── styles

/frontend-ant
    ├── src
    │   ├── components
    │   ├── pages
    │   └── styles
```

--- 

## 🚀 Funcionalidades

- Cadastro de usuários com tratamento de erros.
- Listagem de usuários.
- Pesquisa de usuários por nome ou email.
- Atualização e exclusão de registros.
- Interface moderna e intuitiva.
- Integração com banco de dados SQLite.
