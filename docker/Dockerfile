# this dockerfile is for dev instance
FROM node:current-alpine
EXPOSE 3020

RUN mkdir -p /app
WORKDIR /app
RUN apk update

RUN apk add dumb-init

RUN cd /app
# install nodejs packages
# RUN yarn install

ENTRYPOINT ["dumb-init"]