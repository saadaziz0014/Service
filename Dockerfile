# Use a Node.js base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port your application listens on
EXPOSE 8800

# Start the application
CMD ["npm", "start"]
