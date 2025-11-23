# -----------------------------
# 1) Etapa de build (Node)
# -----------------------------
FROM node:20-alpine AS build

# Define diretório
WORKDIR /app

# Copia apenas arquivos do Node (melhor cache)
COPY package.json package-lock.json* ./

# Instala dependências
RUN npm install

# Copia todo o projeto
COPY . .

# Build da aplicação (gera a pasta /dist)
RUN npm run build

# -----------------------------
# 2) Etapa de deploy (Nginx)
# -----------------------------
FROM nginx:stable-alpine

# Remove default page
RUN rm -rf /usr/share/nginx/html/*

# Copia o build do Vite para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração personalizada do Nginx (opcional)
# Caso você tenha SPA, isso ajuda no refresh das rotas:
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe porta
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
