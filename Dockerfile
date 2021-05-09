FROM node:14.16.0

WORKDIR /root/app

COPY package.json ./
COPY package-lock.json ./

RUN npm ci --production

COPY tsconfig.json ./
COPY .env ./
COPY src/ ./src/

CMD ["npm", "start"]
