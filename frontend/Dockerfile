FROM node:18

WORKDIR /app

COPY my-react-app/package.json /app/
COPY my-react-app/package-lock.json /app/
RUN npm install
RUN npx vite --version

COPY my-react-app /app/

CMD ["npm", "run", "dev"]

