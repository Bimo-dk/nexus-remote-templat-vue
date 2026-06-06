# syntax=docker/dockerfile:1.7
# @bimo-dk/* packages are public on npmjs.com — no auth required.
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json .npmrc ./
RUN npm install --no-audit --no-fund --legacy-peer-deps

ARG REMOTE_NAME=__REMOTE_NAME__
ARG REMOTE_ROUTE=__REMOTE_ROUTE__

COPY tsconfig.json vite.config.ts index.html ./
COPY src ./src
RUN NEXUS_REMOTE_NAME=${REMOTE_NAME} REGISTRY_URL=${REGISTRY_URL} NEXUS_TOKEN=${NEXUS_TOKEN} \
    npm run build:prod

# Workaround for B-21: @bimo-dk/nexus-build@0.2.1 emits `exposes` as an
# object; the host's @bimo-dk/nexus-runtime expects the native-federation
# array shape. Rewrite the manifest. Remove once nexus-build republishes
# with the array shape.
RUN node -e "const fs=require('fs'),p='dist/remoteEntry.json',m=JSON.parse(fs.readFileSync(p,'utf8'));if(m.exposes&&!Array.isArray(m.exposes)){m.exposes=Object.entries(m.exposes).map(([k,v])=>({key:k,outFileName:String(v).replace(/^\.\//,'')}));m.shared=m.shared||[];fs.writeFileSync(p,JSON.stringify(m,null,2));console.log('[B-21] rewrote',p);}"

FROM nginx:alpine
ARG REMOTE_NAME=__REMOTE_NAME__
ARG REMOTE_ROUTE=__REMOTE_ROUTE__
RUN apk add --no-cache wget curl jq
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://127.0.0.1/health || exit 1
ENTRYPOINT ["/docker-entrypoint.sh"]
