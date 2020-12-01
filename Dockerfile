# from base image node
FROM node:8.11-slim

ENV PORT 3000
ENV MONGO_URL mongodb+srv://ramses:88812271jona@cluster0-kfag5.mongodb.net/rocketPlanet?retryWrites=true&w=majority
RUN mkdir -p /usr/app
WORKDIR /usr/app

# copying all the files from your file system to container file system
COPY package.json .

# install all dependencies
RUN npm install

# copy oter files as well
COPY ./ .

#expose the port
EXPOSE 3070

# command to run when intantiate an image
CMD ["npm","start"]