FROM golang:1.19-alpine

RUN apk add build-base
ENV PORT=8090

WORKDIR /

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY ./src/backend/*.go .
COPY ./src/backend/coin/*.go /usr/local/go/src/prognovel/backend/coin/
COPY ./src/backend/user/*.go /usr/local/go/src/prognovel/backend/user/
COPY ./src/backend/image/*.go /usr/local/go/src/prognovel/backend/image/
COPY ./src/backend/novel/*.go /usr/local/go/src/prognovel/backend/novel/
COPY ./src/backend/app/*.go /usr/local/go/src/prognovel/backend/app/

RUN go build -o /pocketbase
EXPOSE 8090
CMD /bin/sh -c "/pocketbase serve --http 0.0.0.0:${PORT}"
