FROM node:7.7.4

COPY package.json /app/package.json
RUN cd /app; npm install --production; npm cache clean
COPY . /app

EXPOSE 3000
WORKDIR /app

ENTRYPOINT ["node", "bin/www"]
