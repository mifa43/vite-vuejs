FROM node:lts-alpine3.18 as nodeVite

# Vite vuejs tuto with docker and nginx: https://www.youtube.com/watch?v=N9hRhcHpg1c

WORKDIR /app

COPY package*.json ./

RUN npm install --no-cache
RUN npm install bootstrap
RUN npm i bootstrap-icons
RUN npm install vue-material --save --force
RUN npm i vue-material-design-icons --force
RUN npm install axios --save --force

COPY . .

# CMD ["npm","run","build","--force"]
RUN npm run build

FROM nginx:stable-alpine as production-nginx

COPY --from=nodeVite /app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]