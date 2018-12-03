
# build client
FROM node:6 AS build-env-client
WORKDIR /app
COPY *.js ./
COPY package.json ./
COPY tsconfig.json ./
COPY tslint.json ./
COPY ./client ./client/
RUN npm install
RUN npm run build



FROM golang:1.8

WORKDIR /go/src/app
COPY . .
COPY --from=build-env-client /app/bin ./bin/

RUN go get -d -v ./...
RUN go install -v ./...

CMD ["app"]

EXPOSE 3001
