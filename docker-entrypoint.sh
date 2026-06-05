#!/bin/sh
set -e

REGISTRY_URL="${REGISTRY_URL:-http://registry:8670}"
NEXUS_TOKEN="${NEXUS_TOKEN:-dev-token}"
REMOTE_NAME="${REMOTE_NAME:-vueRemote}"
REMOTE_ROUTE="${REMOTE_ROUTE:-vue-remote}"
PUBLIC_URL="${PUBLIC_URL:-http://localhost:8702/remoteEntry.json}"
UPSTREAM_URL="${UPSTREAM_URL:-http://remote-vue:80}"
EXPOSED_MODULE="${EXPOSED_MODULE:-./RemoteEntry}"

MAX_WAIT="${REGISTER_TIMEOUT:-60}"
waited=0

until curl -sf -o /dev/null "${REGISTRY_URL}/health"; do
  if [ "$waited" -ge "$MAX_WAIT" ]; then
    echo "[nexus] registry not reachable after ${MAX_WAIT}s — starting without registration"
    exec nginx -g "daemon off;"
  fi
  echo "[nexus] waiting for registry..."
  sleep 2
  waited=$((waited + 2))
done

PAYLOAD="{\"name\":\"${REMOTE_NAME}\",\"url\":\"${PUBLIC_URL}\",\"routePath\":\"${REMOTE_ROUTE}\",\"exposedModule\":\"${EXPOSED_MODULE}\",\"upstreamUrl\":\"${UPSTREAM_URL}\"}"

HTTP_CODE=$(curl -s -o /tmp/nexus_reg.json -w "%{http_code}" \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-Nexus-Token: ${NEXUS_TOKEN}" \
  -d "${PAYLOAD}" \
  "${REGISTRY_URL}/api/remotes")

if [ "$HTTP_CODE" = "201" ]; then
  echo "[nexus] registered remote '${REMOTE_NAME}'"
elif [ "$HTTP_CODE" = "409" ]; then
  curl -sf -X PUT \
    -H "Content-Type: application/json" \
    -H "X-Nexus-Token: ${NEXUS_TOKEN}" \
    -d "${PAYLOAD}" \
    "${REGISTRY_URL}/api/remotes/${REMOTE_NAME}" > /dev/null
  echo "[nexus] updated remote '${REMOTE_NAME}'"
else
  echo "[nexus] warning: registration returned HTTP ${HTTP_CODE}"
  cat /tmp/nexus_reg.json 2>/dev/null || true
fi

exec nginx -g "daemon off;"
