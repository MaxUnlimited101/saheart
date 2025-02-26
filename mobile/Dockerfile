# Use the official Node.js image as the base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Install expo-cli globally
RUN npm install -g expo-cli

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the project dependencies, including TypeScript and @types/react-native
RUN npm install

RUN npm install --global @expo/ngrok@^4.1.0
RUN npm install --save-dev typescript @types/react-native

# Copy the rest of the application code
COPY . .

# Expose the ports used by Expo
EXPOSE 8081 80 443

# Start the Expo development server
CMD ["npx", "expo", "start", "--tunnel"]
