# Use an official Node runtime as a parent image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Set environment variables
# Ensure that the Next.js uses local webpack and has appropriate settings for Docker
ENV NEXT_PRIVATE_LOCAL_WEBPACK=true
ENV NODE_ENV=production

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
# --frozen-lockfile: If dependencies in the lock file do not match those in package.json, fail
RUN yarn install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build the application
RUN yarn build

# Production image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Set environment variables
ENV NEXT_PRIVATE_LOCAL_WEBPACK=true
ENV NODE_ENV=production

# Copy the build output and dependencies from the builder stage
COPY --from=builder /usr/src/app /usr/src/app

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Expose port 3001
EXPOSE 3001

# Command to run the app
CMD ["yarn", "start"]
