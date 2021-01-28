# https://hub.docker.com/_/node
FROM node:14-slim

WORKDIR /usr/src/app

COPY [ "package.json", "./"]
COPY [ "package-lock.json" , "./"]
COPY [ "distribution/**", "./"]

# Install production dependencies.
# If you add a package-lock.json, speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
RUN npm ci --only=production

# Run the web service on container startup.
CMD [ "node", "main.js" ]