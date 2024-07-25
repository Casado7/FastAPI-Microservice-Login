# Etapa 1: Construcción
FROM node:16 as build

WORKDIR /app

# Copiar package.json y package-lock.json si estás usando npm
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
