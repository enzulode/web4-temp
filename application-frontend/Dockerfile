# Build stage
FROM node:20.10-alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY .. .
RUN npm run build

# Serve stage
FROM nginx:1.25.4-alpine
COPY --from=builder /app/dist/application-frontend /usr/share/nginx/html
COPY nginx/reverse-proxy.conf /etc/nginx/conf.d/default.conf
