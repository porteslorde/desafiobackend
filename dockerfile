FROM node:14


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#Exponha a porta da aplicação (caso a sua aplicação esteja escutando em alguma porta específica)

EXPOSE 3000
CMD ["npm", "start"]