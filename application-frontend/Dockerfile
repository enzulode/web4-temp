# Build stage
FROM node:20.10-alpine as builder
WORKDIR /app-source
COPY . /app-source
#COPY src ./
#COPY angular.json package.json package-lock.json ./
#COPY tsconfig.app.json tsconfig.json ./
RUN npm install -g @angular/cli
RUN npm install
RUN ng build

# Serve stage
FROM nginx:1.25.4-alpine
COPY nginx/reverse-proxy.conf /etc/nginx/nginx.conf
COPY --from=builder /app-source/dist/application-frontend/browser /app
