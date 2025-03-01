FROM node:18-alpine AS build

WORKDIR /app 

COPY package.json package-lock.json ./ 
 
RUN npm install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "--port", "5173"]