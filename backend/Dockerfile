# 1️⃣ Base image (Node already installed)
FROM node:20-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files first
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy rest of your code
COPY . .

# 6️⃣ Tell Docker which port your app uses
EXPOSE 3000

# 7️⃣ Start your app
CMD ["npm", "start"]
