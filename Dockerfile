FROM golang:1.19-alpine
RUN apk add build-base

WORKDIR /

COPY go.mod .
COPY go.sum .

RUN go mod download

COPY ./src/backend/*.go .

RUN go build -o /pocketbase
EXPOSE 8090
CMD [ "/pocketbase", "serve" ]
