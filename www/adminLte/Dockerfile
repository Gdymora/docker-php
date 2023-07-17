FROM node:18-alpine As development
WORKDIR /project

RUN npm install -g @angular/cli@14

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]
