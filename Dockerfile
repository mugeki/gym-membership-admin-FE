FROM node:16-alpine as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:16-alpine as builder
ARG NEXT_PUBLIC_BE_API_URL
ARG NEXT_PUBLIC_DEFAULT_PROFILE
ARG NEXT_PUBLIC_DEFAULT_THUMB

ENV NEXT_PUBLIC_BE_API_URL=$NEXT_PUBLIC_BE_API_URL
ENV NEXT_PUBLIC_DEFAULT_PROFILE=$NEXT_PUBLIC_DEFAULT_PROFILE
ENV NEXT_PUBLIC_DEFAULT_THUMB=$NEXT_PUBLIC_DEFAULT_THUMB

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
ARG NODE_ENV=production
RUN NODE_ENV=${NODE_ENV} npm run build

FROM node:16-alpine as runner
WORKDIR /app

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 80
CMD ["npm", "start"]