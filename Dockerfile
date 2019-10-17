FROM node:12-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY yarn.lock package.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "run", "start:dev" ]