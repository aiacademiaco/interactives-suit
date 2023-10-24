# stage- build front
FROM node:18 AS web
WORKDIR /usr/src/app
COPY aprendelibre-interactives-suite-web/ ./web/
RUN cd web && npm install && npm run build

# stage- build back
FROM node:18 AS backend
WORKDIR /usr/src/app
COPY aprendelibre-interactives-suite-api/ ./api/
RUN cd api && npm install && npm run build
RUN cp -R api/node_modules api/dist/node_modules

# final stage- combine front and back
FROM node:18
WORKDIR /usr/src/app/
COPY --from=web /usr/src/app/web/.output/server/ ./web
COPY --from=backend /usr/src/app/api/dist ./
RUN ls

EXPOSE 8080
CMD [ "node", "web/.output/server/index.mjs" ]