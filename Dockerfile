# Use the specified Node.js version
FROM node:20.6.1

# Set the version of pnpm to install
ARG PNPM_VERSION=8.7.1

# Install pnpm globally
RUN npm install -g pnpm@${PNPM_VERSION}

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the entire project to the working directory
COPY . .

# Install dependencies using pnpm
RUN pnpm install

# Build the application
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "start"]
