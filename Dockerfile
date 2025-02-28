FROM node:20-slim as builder

WORKDIR /app

# Define build arguments
ARG NODE_ENV=production

# Set environment variables for build time
ENV NODE_ENV=${NODE_ENV}

# Copy package files
COPY package*.json ./

# Install ALL dependencies for building
RUN npm install --include=dev

# Copy all source and config files
COPY . .

# Generate SvelteKit files and build the application
RUN npm run prepare || true
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy package files first
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev

# Copy built assets from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules/@sveltejs ./node_modules/@sveltejs

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "build"] 