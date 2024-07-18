# Use Node.js version 18 with Alpine, specifying the platform to match your architecture
FROM --platform=$BUILDPLATFORM node:18-alpine

# Install dependencies required for building native modules
RUN apk add --no-cache \
    g++ \
    make \
    python3

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json yarn.lock ./

# Install dependencies, ensuring native modules are built from source
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
