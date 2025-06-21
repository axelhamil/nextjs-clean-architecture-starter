FROM node:22.16.0-alpine AS base

RUN apk update \
    && apk add --no-cache libc6-compat \
    && npm install pnpm@10.11.0 turbo@2.5.3 --global \
    && pnpm config set store-dir ~/.pnpm-store

FROM base AS pruner

WORKDIR /app

COPY . .

RUN turbo prune nextjs --docker

FROM base AS builder

WORKDIR /app

ARG DATABASE_URL=${DATABASE_URL}

COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

COPY --from=pruner /app/out/full/ .

RUN turbo build --filter=nextjs...

RUN rm -rf ./**/*/node_modules 
RUN pnpm install --prod --no-optional --frozen-lockfile --ignore-scripts
RUN rm -rf ./**/*/src
RUN rm -rf .turbo && rm -rf ~/.pnpm-store && rm -rf /root/.npm

FROM base AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nodejs
USER nodejs

COPY --from=builder --chown=nodejs:nodejs /app .

COPY --chown=nodejs:nodejs /apps/nextjs/docker-entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

WORKDIR /app/apps/nextjs

ARG NODE_ENV=production
ARG PORT=5050

ENV PORT=${PORT} \
    NODE_ENV=${NODE_ENV}
EXPOSE ${PORT}

CMD ["docker-entrypoint.sh"]