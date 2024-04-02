# Use the latest Node.js as a parent image
FROM  node:lts-alpine as development

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json .

# Perform Clean Install for dependencies
RUN npm ci

# Bundle app source
COPY . /usr/src/app

# Your app binds to port 5000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 5000

# Command to run the app
CMD [ "npm", "run", "start" ]

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
CMD [ "npm", "run", "start" ]