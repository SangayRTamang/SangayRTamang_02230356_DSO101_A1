FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm test
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "start"]
