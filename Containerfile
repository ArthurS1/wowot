FROM alpine:3.15

WORKDIR /app

COPY . .

RUN apk add nodejs yarn tzdata

RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime

RUN yarn install
RUN yarn run build

CMD node build/src/index.js --prod
