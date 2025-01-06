FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN mkdir -p /etc/ssl/certs
RUN mkdir -p /etc/ssl/private

EXPOSE 443

CMD ["node", "server.js"]