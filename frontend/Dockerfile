FROM node:18.17

ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn && yarn install

WORKDIR /app
ADD . /app

EXPOSE 8000
EXPOSE 35729

# CMD ["yarn", "dev"]

# ENTRYPOINT ["/bin/bash", "/app/run.sh"]
# CMD ["start"]
