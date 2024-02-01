# Dockerfile.client

FROM node:18.16.1
WORKDIR /app/client
COPY build/ .
RUN npm install -g serve
EXPOSE 80
CMD ["serve","-s",".","-p","80"]


#docker build -t mslee978/client .