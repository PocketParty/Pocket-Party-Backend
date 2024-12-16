FROM node:20-alpine as builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy the code
COPY . .

# Build the code for production
RUN npm run build

# Production image
FROM node:20-alpine
WORKDIR /app

# Copy only necessary files
COPY package*.json ./
RUN npm ci --only=production

# Copy built files from builder
COPY --from=builder /app/dist ./dist

ENV PORT=3000
EXPOSE 3000

# By default, we'll just run 'npm run dev' or 'npm run start'.
# For production, usually you'd run 'npm run start'.
CMD ["npm", "run", "start"]
