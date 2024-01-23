# Dockerfile.server

FROM node:18.16.1
WORKDIR /app/server
COPY ./package*.json ./
RUN npm install --silent
COPY . .
EXPOSE 5000
CMD ["npm", "start"]


# docker build -t mslee978/backend .