FROM node

WORKDIR /api

# Just copy package.json up here so its cached
# And if we change and rebuild our source code npm install
# Won't have to rerun. Making it build a lot faster
COPY package.json /api

RUN npm install

COPY . /api

EXPOSE 3001

CMD ["node", "server.js"]