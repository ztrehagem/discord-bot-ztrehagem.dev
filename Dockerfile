FROM node:14.16.0

EXPOSE 443

COPY .env /root/
COPY tsconfig.json /root/
COPY package-lock.json /root/
COPY package.json /root/
COPY src/* /root/src/

WORKDIR /root

RUN npm ci --production

# CMD ["npm", "start"]
CMD ["tail", "-f", "/dev/null"]
