FROM node:16

WORKDIR /app

COPY my-react-app/package.json /app/
COPY my-react-app/package-lock.json /app/
RUN npm install

COPY my-react-app /app/

CMD ["npm", "run", "dev"]

