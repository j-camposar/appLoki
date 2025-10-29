# Imagen base
FROM node:18-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el resto de la app
COPY . .

# Crear carpeta de logs
RUN mkdir -p /var/log/app

# Exponer puerto
EXPOSE 8080

# Comando para iniciar la app
CMD ["node", "index.js"]
