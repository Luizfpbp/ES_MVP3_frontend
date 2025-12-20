# Frontend – Sistema de Biblioteca

Este repositório contém o **frontend do Sistema de Biblioteca**, desenvolvido com **React, TypeScript e Vite**.  
A aplicação consome a **API REST** do backend para realizar o cadastro de usuários, livros e o controle de empréstimos.

---

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- Docker
- Nginx

---

## Como executar (ambiente local)

### Pré-requisitos

- Node.js 20+
- Backend em execução em `http://localhost:5000`

### Instalar dependências

No diretório raiz do projeto:

```bash
npm install
```

Executar o projeto:

```bash
npm run dev
```

## Como executar com Docker

### Pré-requisitos

- Docker instalado
- Backend em execução em `http://localhost:5000`

---

### Build da imagem Docker

No diretório raiz do frontend, execute:

```bash
VITE_API_URL=http://localhost:5000 docker build -t es-mvp3-frontend .
```

Depois execute o run para iniciar o container do frontend no docker

```bash
docker run -p 8080:80 es-mvp3-frontend
```
