# Build stage: install everything and run the SvelteKit build.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

# Runtime stage: only the built server, runtime deps, and the files the
# server reads from disk (notebook frontmatter and rendered posts).
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
COPY nbs ./nbs
COPY static/posts ./static/posts
USER node
EXPOSE 3000
CMD ["node", "build"]
