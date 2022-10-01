FROM golang:1.19-alpine

RUN apk add build-base
ENV PORT=8090

WORKDIR /

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY ./backend/*.go .

RUN go build -o /pocketbase
EXPOSE 8090
CMD /bin/sh -c "/pocketbase serve --http 0.0.0.0:${PORT}"
