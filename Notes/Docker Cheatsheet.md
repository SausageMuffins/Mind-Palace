---
tags: Programming
date: 06-06-2023
type: 
 Cheatsheet
 Complete
summary: Documentation on what Docker is and how to use it.
---

## Installation

The link can be found [here](https://www.docker.com/products/docker-desktop/).

If the link does not work, simply google install docker desktop ;)

**Install with the correct platform! -> MacOS people need to choose to correct chip (apple silicon or intel)**

---

## Overview of Docker Engine Terms

#### Docker Images and Containers

**Images: Basically a snapshot of our application and everything related to it.** 
- Includes our application (JS for example), services/frameworks (node, npm for example) and the OS layer (Linux)
- Includes all source code and the complete environment configurations
- Can add environment variables, create directories and files.
- They may have different versions -> also known as tags

**Containers: A running instance of an image**
- The thing that starts the application!
- Can run multiple containers for one image! -> use case: boost speed.

#### Getting Containers (Registries)

**Registries** are a "storage" for docker images and many applications/engines have official images (eg: mongoDB, ubuntu, mySQL etc). These official images can be found at [Docker Hub](https://hub.docker.com/).



---

## Main Docker Commands

#### Downloading Images

```bash
docker pull nginx:1.23 # docker pull NAME:TAG
```

Note: pulling without a tag will pull the latest image! -> might pull more than one image if not careful.


#### Creating a container from an image

```bash
docker run nginx:1.23 # docker run NAME_OF_CONTAINER

docker run -d nginx:1.23 # run docker without blocking terminal

docker run --name webapp -d nginx:1.23 # run docker without blocking terminal
```

Note:
- docker is smart enough to run any images from [Docker Hub](https://hub.docker.com/). so we don't need to download it locally.
- docker run always creates a new container!


#### Viewing Containers and Images

```bash
docker images # list out images
docker ps # list out running containers
docker ps -a # list out all existing containers -> include not running
```

Use this command to find the container ID, ports, name etc. CTRL C to exit the container.

**Logs for Containers**
```bash
docker logs nginx:1.23
```

**Starting Containers (exist but not active)**
```bash
docker start {id} OR {CONTAINER_NAME}
```

**Stopping Containers** 
```bash
docker stop
```

---

## Port Binding

We need this to access containers running in different ports as if it is running on my own local machine.

```bash
# docker run -d -p {HOST}:{CONTAINER_PORT} {CONTAINER_NAME}:{TAG}
docker run -d -p 9000:80 nginx:1.23 

# naming containers as webapp
docker run --name webapp -d -p 9000:80 nginx:1.23 
```

Note: 
- -p or --publish is to publish a container's port to the host.
- It is standard to use the same host port as the host!

---

## Private Docker Registries

This is **IMPORTANT** for making our own custom images -> basically where we define a container for our projects!

#### Docker Files (for Node.js)

#### Instructions

**1. Base Image: what we will be building upon (eg: node, python) - they are just like any other images.**

```docker
FILE node:19-alpine
```

**2. Copy the files of our application**

COPY *src* on local machine to *dest* in container

```docker
COPY package.json /app/
COPY src /app/ # copying whole directories
```

**3. Add Working Directory** (similar to cd)

```docker
WORKDIR /app # set the directory for everything that runs below this line
```

**4. Execute commands for dependencies**

```docker
RUN npm install 
```

this will download the dependencies in the container -> in it's own environment. (virtual machine concept ;) )

**5. Start the application**

```docker
CMD ("node", "server.js")
```

Starting the server.js application based on the node image.

### Example Docker File

```
FILE node:19-alpine

COPY package.json /app/
COPY src /app/ # copying whole directories

WORKDIR /app # set the directory for everything that runs below this line

RUN npm install 

CMD ("node", "server.js")
```


---

## Running Docker Files (Building Containers)

After we have defined the docker file, we want to make sure we build our app inside the container of that custom docker file!

1. CD to where the docker file is at.
2. run the command below in terminal

```bash
docker build -t node-app:1.0 .
docker run -d -p 3000:3000 node-app:1.0 # the 3000 depends on where your app host is at.
```