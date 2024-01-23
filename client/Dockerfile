# Dockerfile.client

FROM node:18.16.1
WORKDIR /app/client
COPY ./package*.json ./
RUN npm install --force
COPY . .
EXPOSE 3000
CMD ["npm", "start"]


#docker build -t mslee978/client .