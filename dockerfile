FROM node:latest
WORKDIR /usr/app
COPY package.json .
RUN npm install --omit=dev
COPY . .
RUN npm run build
CMD [ "node", "dist/index.js" ]