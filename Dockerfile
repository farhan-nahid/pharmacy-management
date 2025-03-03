# Build Stage
FROM node:20-alpine AS build

# Install dependencies and tools
RUN apk update && apk upgrade && apk add --no-cache openssl

WORKDIR /app

# Install pnpm globally
RUN npm i -g pnpm

# Copy package.json and lock files to install dependencies
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install dependencies with pnpm
RUN pnpm i

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Runtime Stage
FROM node:20-alpine AS runtime

# Install runtime dependencies (if any, like openssl)
RUN apk update && apk upgrade && apk add --no-cache openssl

WORKDIR /app

# Install pnpm globally in the runtime stage
RUN npm i -g pnpm

# Copy necessary build artifacts from the build stage
COPY --from=build /app /app

# Expose port and set the command to run the app
EXPOSE 8080
CMD ["pnpm", "dev"]