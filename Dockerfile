# Use an official Node.js runtime as a base image
FROM node:20.14.0

# Set the working directory
WORKDIR /app

# Copy the package files
COPY backend/package*.json ./backend/
#COPY frontend ./frontend/

# Install dependencies
RUN cd backend && npm install

# Copy the rest of the source code
COPY . .

# Build the backend
RUN cd backend && npm run build

# Expose the port that the backend will run on
ENV PORT=3000
EXPOSE 3000

# Command to run the backend server
CMD ["node", "backend/server.js"]
