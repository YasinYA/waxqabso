FROM node:11.10.0-alpine

WORKDIR 'server'

ENV NODE_ENV='${NODE_ENV}'

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]