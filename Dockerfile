ARG NODE_VERSION=19
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /opt/site-tmp
COPY package*.json ./
RUN  mkdir src && \
     npm install 
COPY src/ src/ 
COPY .env.local .env.local 
COPY public/  public/
EXPOSE 3000
CMD npm run build && \
    npm run dev