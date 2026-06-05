# syntax=docker/dockerfile:1.7
# Build manually: docker build --secret id=node_auth_token,env=NODE_AUTH_TOKEN .
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json .npmrc ./
RUN --mount=type=secret,id=node_auth_token,required=true \
    NODE_AUTH_TOKEN=$(cat /run/secrets/node_auth_token) \
    npm install --no-audit --no-fund --legacy-peer-deps

COPY tsconfig.json vite.config.ts index.html ./
COPY src ./src
RUN REGISTRY_URL=${REGISTRY_URL} NEXUS_TOKEN=${NEXUS_TOKEN} npm run build:prod

FROM nginx:alpine
RUN apk add --no-cache wget
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://localhost/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
