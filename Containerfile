FROM alpine:3.15

WORKDIR /app

COPY cron .

RUN cat cron >> /etc/crontabs/root
RUN crontab -l

COPY . .

RUN apk add nodejs yarn

RUN yarn install
RUN yarn run build

CMD crond -f -l 8
