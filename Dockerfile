FROM node:22.14.0-alpine as builder

WORKDIR /src
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.27.4-alpine

COPY --from=builder /src/public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443
