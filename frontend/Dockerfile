FROM node:22.14.0-alpine3.21
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and package-lock.json
COPY package*.json .
 
# Install dependencies
RUN npm install
 
# Copy the rest of your application files
COPY . .
 
# expose the app on port 3000
EXPOSE 3000

# Start your frontend application
CMD ["npm", "run","dev"]