FROM node:latest

# Create app dir
WORKDIR /usr/app

# Install packages
COPY package.json .
RUN npm install --omit=dev

# Copy files into app dir
COPY . .

# Compile typescript
RUN npx tsc

# Expose status port
EXPOSE 80

# Run bot
CMD [ "node", "dist/index.js" ]