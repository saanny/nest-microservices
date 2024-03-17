FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .


RUN pnpm run build 

EXPOSE 5000

CMD ["node","dist/apps/gallatin/main.js"]
