FROM node:14

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /usr/local
COPY package.json package-lock.json* ./
RUN npm ci --ignore-scripts && npm cache clean --force
ENV PATH /usr/local/node_modules/.bin:$PATH

WORKDIR /usr/local/app
COPY . .

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh