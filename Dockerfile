FROM node:14

WORKDIR /config

COPY . .

RUN yarn

# Generate graphql components
RUN yarn workspace @sushii-web/graphql run build

# Build production client, requires @sushii-web/graphql
RUN yarn workspace @sushii-web/client run build

# Build server
RUN yarn workspace @sushii-web/server run build

EXPOSE 3000
ENTRYPOINT [ "node", "./packages/server/dist/index.js" ]
