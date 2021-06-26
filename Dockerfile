FROM node:14.17-alpine
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
RUN npx tsc 
CMD ["node", "./build/server.js"]
