# sushii-web

Website for sushii-2, built with PostGraphile

## Docker

```bash
docker build .
```

## Config

Configuration options are set via environment variables.

```bash
NODE_ENV=production
ROOT_URL=https://sushii.xyz

# Db owner connection string
DATABASE_URL=
# Unprivileged connection string
AUTH_DATABASE_URL=

# Sessions
REDIS_URL=
# Session secret
SECRET= 

# Discord OAuth
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

NEXT_PUBLIC_INVITE_URL=
TRUST_PROXY=cloudflare
# default 3000
PORT=
```
