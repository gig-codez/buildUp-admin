# Multi-stage build: compile the CRA bundle, serve with nginx.
# CRA bakes REACT_APP_* env vars at build time, so API_BASE_URL is a
# build arg rather than a runtime env var.

# ---- builder ----
FROM node:20-alpine AS builder

WORKDIR /app

# Install deps first so rebuilds with unchanged package-lock hit the cache.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

ARG REACT_APP_BASE_URL=https://server.buildupuganda.com
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

# CI=false so CRA treats eslint warnings as warnings, not build-breaking errors.
RUN CI=false npm run build

# ---- runtime ----
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
