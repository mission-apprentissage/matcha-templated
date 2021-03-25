# build stage
FROM node:14.16-stretch as build
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn build

FROM node:14.16-alpine
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

EXPOSE 3000
CMD yarn serve