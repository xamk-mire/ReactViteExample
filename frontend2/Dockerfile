# Use the latest official Node.js as a parent image
FROM  node:lts-alpine AS development

# This line sets the working directory within the Docker container. All subsequent commands will be run from this directory.
WORKDIR /usr/src/app

# The COPY command copies the package.json and package-lock.json (or yarn.lock) files into the working directory 
# in the Docker container. These files define your Node.js application's dependencies.
COPY package*.json .

# Perform Clean Install for dependencies
RUN npm ci

# This copies all the files from the current directory on your host (where the Dockerfile is located) 
# into the current working directory in the container
COPY . /usr/src/app

# Executes the build script defined in package.json. 
# For a Vite-based React application, this typically produces a production build of the app in the dist directory.
RUN npm run build

# Serve the app
CMD ["npm", "start"]

FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]