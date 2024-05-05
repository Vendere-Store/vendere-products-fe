# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Set environment variables
# Ensure that the Next.js uses local webpack and has appropriate settings for Docker
ENV NEXT_PRIVATE_LOCAL_WEBPACK=true
ENV NODE_ENV=production

# Copy package.json, package-lock.json, and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
# --frozen-lockfile: If dependencies in the lock file do not match those in package.json, fail
RUN yarn install --frozen-lockfile

# Copy the rest of your application code
COPY . .

# Build the application
RUN if [ "$NODE_ENV" = "development" ]; then yarn install --include=dev; fi && \
    yarn build

# Vendere Core listens on port 3000 by default, expose it
EXPOSE 3001

# Command to run the app
CMD ["yarn", "start"]
