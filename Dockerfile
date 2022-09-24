FROM golang:1.19

WORKDIR /backend

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY ./src/backend/*.go ./

RUN go build -o /pocketbase
CMD [ "/pocketbase serve" ]
