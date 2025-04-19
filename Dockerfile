# # Build Stage
# FROM node:22.10-alpine3.20 AS builder

# WORKDIR /build

# # Install pnpm globally
# RUN npm i -g pnpm

# # Copy package.json and lock files to install dependencies
# COPY package.json pnpm-lock.yaml ./
# COPY prisma ./prisma/

# # Install dependencies with pnpm
# RUN pnpm install --frozen-lockfile

# # Generate Prisma client
# RUN npx prisma generate

# # Copy the rest of the application files
# COPY . .

# # Build the application
# RUN pnpm build

# # Runtime Stage
# FROM node:22.10-alpine3.20 AS runtime

# WORKDIR /app

# COPY --from=builder /build/node_modules ./node_modules
# COPY --from=builder /build/dist ./dist
# COPY --from=builder /build/prisma ./prisma

# ENV NODE_ENV=production
# # Expose port and set the command to run the app
# EXPOSE 8080
# CMD ["pnpm", "start"]

# Build Stage
FROM node:22.10-alpine3.20 AS builder

WORKDIR /build

# Install pnpm globally
RUN npm i -g pnpm

# Copy package.json and lock files to install dependencies
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install dependencies with pnpm (using the frozen lockfile)
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Build the application
RUN pnpm build

# Runtime Stage
FROM node:22.10-alpine3.20 AS runtime

WORKDIR /app

# Copy only necessary files from the builder image
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/prisma ./prisma
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN npm i -g pnpm && pnpm install --prod --frozen-lockfile

ENV NODE_ENV=production

# Expose port and set the command to run the app
EXPOSE 8080
CMD ["pnpm", "start"]
