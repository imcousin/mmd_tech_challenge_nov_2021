FROM node:16-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

#expose the port
EXPOSE 8080

CMD ["npm", "start"]
