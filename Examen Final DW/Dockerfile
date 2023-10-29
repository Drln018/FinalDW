FROM node:18-alpine3.17 

RUN mkdir -p /home/app

COPY . /home/app

RUN cd /home/app && npm install

EXPOSE 4000  

CMD ["node", "/home/app/server.js"]
