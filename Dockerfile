FROM node:14

WORKDIR /config

COPY . .

RUN yarn

# Build all production files
RUN yarn workspaces run build

EXPOSE 3000
ENTRYPOINT [ "node", "./packages/server/dist/index.js" ]
