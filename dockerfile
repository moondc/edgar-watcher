FROM node:current-alpine3.19
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["npm", "run", "start"]