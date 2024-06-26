FROM node:18

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3001

EXPOSE 3001

CMD ["npm", "start"]