# Build from the reviewed tool-source export root; see docs/HOSTED_DEPLOYMENT.md.
FROM node:24-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Retain the source license in the distributed image.
COPY LICENSE LICENSE

# Preserve the canonical relative imports between gateway and skill modules.
COPY publisher/static-server/package.json publisher/static-server/package.json
COPY publisher/static-server/src/ publisher/static-server/src/
COPY publisher/static-server/ui/ publisher/static-server/ui/
COPY skills/deck-studio/scripts/release_admission.py \
     skills/deck-studio/scripts/proof_identity.py \
     skills/deck-studio/scripts/pptx_inspection.py \
     skills/deck-studio/scripts/validate_deck.py \
     skills/deck-studio/scripts/release_store.py \
     skills/deck-studio/scripts/delivery_profile.mjs \
     skills/deck-studio/scripts/

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000 \
    DECKS_LIBRARY_ROOT=/data/library \
    DECKS_POLICY_PATH=/data/policy/policy.sqlite \
    PYTHONDONTWRITEBYTECODE=1

# No dependency install, browser, producer, library, policy or secret enters here.
RUN node --input-type=module -e 'const [major, minor] = process.versions.node.split(".").map(Number); if (major !== 24 || minor < 21) throw new Error("Node >=24.21 <25 required"); await import("./publisher/static-server/src/server.mjs");' \
    && python3 -c 'import sys; sys.path.insert(0, "/app/skills/deck-studio/scripts"); import release_admission, release_store'

USER node
EXPOSE 3000
CMD ["node", "/app/publisher/static-server/src/server.mjs"]
