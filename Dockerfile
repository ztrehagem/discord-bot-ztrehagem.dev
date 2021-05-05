FROM node:14.16.0

WORKDIR /root

COPY package.json /root/
COPY package-lock.json /root/

# RUN npm ci --production
RUN npm i

COPY tsconfig.json /root/
COPY .env /root/
COPY src/* /root/src/

CMD ["npm", "start"]
# CMD ["tail", "-f", "/dev/null"]
