#Usa la imagen oficial de Node.js como base
FROM node:20

#Establece el directorio de trabajo en /app
WORKDIR /app

#Copia los archivos package.json y package-lock.json a la imagen
COPY package*.json ./

#Instala las dependencias del proyecto
RUN npm install

#Instala angular
RUN npm install -g @angular/cli

#Copia el resto del código de la aplicación a la imagen
COPY . .

#Expone el puerto 4200, que es el puerto por defecto en el que se ejecuta Angular
EXPOSE 4200

#Comando para iniciar la aplicación Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]