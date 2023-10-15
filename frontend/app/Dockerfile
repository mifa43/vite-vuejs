FROM node:lts-alpine3.18 as nodeVite

# Vite vuejs tuto with docker and nginx: https://www.youtube.com/watch?v=N9hRhcHpg1c

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","run","build"]
# RUN npm run build

FROM nginx:stable-alpine as production-nginx

COPY --from=nodeVite /app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]