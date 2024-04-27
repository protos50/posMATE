# First build
FROM node:18.20.1-buster-slim AS build

WORKDIR /app

COPY package.json /app
 
RUN npm install --production 
COPY . /app

# -------------------------------Second build-------------
FROM node:18.20.1-buster-slim
WORKDIR /app

EXPOSE 3000
COPY --from=build /app /app
CMD [ "npm",  "start" ]
