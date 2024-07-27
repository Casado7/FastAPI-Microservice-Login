# Dockerfile
FROM node:16-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto de la aplicación
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
