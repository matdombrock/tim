#!/usr/bin/env bash
# setup-searxng.sh — run SearXNG with Podman
# Notes: 
# - This will create a `searxng` directory where you run the script.
#     - This is used to store the config files etc for easy editing. 
# - The script assumes you have `podman` installed and set up.
# Usage:
# ./setup-searxng.sh setup
# ./setup-searxng.sh start
# ./setup-searxng.sh stop
# ./setup-searxng.sh logs
# ./setup-searxng.sh update

set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
CONFIG_DIR="${HERE}/searxng/core-config"
DATA_DIR="${HERE}/searxng/data"
NAME="searxng"

cmd_setup() {
  mkdir -p "${CONFIG_DIR}" "${DATA_DIR}"
  echo "Ready. Run:  ${0} start"
}

cmd_start() {
  mkdir -p "${CONFIG_DIR}" "${DATA_DIR}"

  podman run -d --replace \
    --name "${NAME}" \
    -p 1235:8080 \
    -v "${CONFIG_DIR}:/etc/searxng/:Z" \
    -v "${DATA_DIR}:/var/cache/searxng/:Z" \
    docker.io/searxng/searxng:latest

  echo "Started.  Web UI: http://localhost:1235"
  echo "API:       curl 'http://localhost:1235/search?q=test&format=json'"
}

cmd_stop() {
  podman stop "${NAME}" 2>/dev/null || true
  podman rm "${NAME}" 2>/dev/null || true
  echo "Stopped."
}

cmd_logs() {
  podman logs -f "${NAME}"
}

cmd_update() {
  cmd_stop
  podman pull docker.io/searxng/searxng:latest
  cmd_start
  echo "Updated."
}

action="${1:-setup}"
case "${action}" in
  setup|start|stop|logs|update) "cmd_${action}" ;;
  *) sed -n '3,6p' "${0}" ;;
esac
