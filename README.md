<p align="center" style="border-radius: 1rem;"><img src="https://github.com/hstoklosa/hstoklosa/blob/main/assets/xclone-img.png?raw=true" style="width: 100%; border-radius: 1rem;" /></p>

<!-- <p align="center" style="">A simplified version of X/Twitter built in React and Node.js using Express & MongoDB.</p> -->

## Roadmap 🎉

The goal of this side-project is to create a fully functional full-stack Twitter clone, which will be deployed and used as my resume project. I believe that such project is a perfect opportunity to further & demonstrate my coding capabilities.

The project is currently in the beginning phases of development, and in order to keep track of the progress, the following README will contain series of information (stack, features, specific todos).

Over the summer of 2023 (or longer if neccessary), I will be working on this project until it will be of a satisfactory standard to be deployed and included as my resume project.

### 🔍 Features

-   [x] User Authentication (Local & Google Auth)
-   [x] Profile Management
-   [x] Following/Followers
-   [x] Tweeting: Text and Images
-   [x] Commenting, retweeting, quoting, and liking
-   [x] Algorithmic feed
-   [x] Search Functionality: User/Tweets/Hashtags
-   [x] Real-time direct messaging (only in **_development_**)
-   [x] Real-time notifications (only in **_development_**)

### 🎥 Preview

**_<h3 style="text-align: center;">COMING SOON</h3>_**

## 🔌 Technologies

_MERN Stack:_ I'm embracing the opportunity to delve into the realm of NoSQL databases, a new direction for my development skills.

MongoDB, a key component of this stack, stands out due to its widespread acclaim in the developer community. Its prowess extends beyond just managing large volumes of data with ease; it's equally adept at handling diverse data structures, making it highly suitable for a variety of complex applications.

The choice of MongoDB is further solidified by its growing prominence across multiple domains, not just limited to social media. Its scalability, combined with user-friendly features, positions it as a strategic choice for developers eager to explore and leverage the full potential of NoSQL databases in modern web development.

### Additional information

-   `MongoDB` a document-orientated & NoSQL data storage
-   `Mongoose` for ODM modelling and easier data access/manipulation
-   `Passport.js` for authentication purposes such as LocalAuth and OAuth2.0
-   `express-session` and `mongo-connect`, respectively, to create and store the sessions
-   `@reduxjs/toolkit` instead of `redux` for simplified apprach to state management
    <br/><br/>

<p align="center">
   <a href="https://react.dev/" target="__blank">
      <img 
        src=https://github.com/imexotic/imexotic/blob/main/assets/react.png?raw=true  
        width=50px 
        valign="middle" 
        title="React" 
        alt="React" 
        style="margin-right: 1rem; ">
   </a> 
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="https://reactrouter.com/en/main" target="__blank">
      <img 
        src=https://github.com/imexotic/imexotic/blob/main/assets/react_router.png?raw=true width=50px 
        valign="middle" 
        title="React Router" 
        alt="React Router" 
        style="margin-right: 1rem;">
   </a> 
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="https://redux-toolkit.js.org/" target="__blank">
      <img 
        src=https://github.com/imexotic/imexotic/blob/main/assets/redux.png?raw=true
        width=50px 
        valign="middle" 
        title="Redux Toolkit" 
        alt="Redux Toolkit" 
        style="margin-right: 1rem;">
   </a> 
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="https://nodejs.org/en" target="__blank">
      <img 
        src=https://github.com/imexotic/imexotic/blob/main/assets/node.png?raw=true 
        height=50px 
        valign="middle" 
        title="Nodejs" 
        alt="Nodejs" 
        style="margin-right: 1rem;">
   </a> 
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="https://expressjs.com/" target="__blank">
      <img 
        src=https://github.com/imexotic/imexotic/blob/main/assets/express.png?raw=true 
        width=50px 
        valign="middle" 
        title="Express" 
        alt="Express" 
        style="margin-right: 1rem;">
   </a> 
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="https://www.mongodb.com/" target="__blank">
      <img 
        src=https://raw.githubusercontent.com/imexotic/imexotic/main/assets/mongodb.ico width=50px 
        valign="middle" 
        title="MongoDB"
        alt="MongoDB" 
        style="margin-right: 1rem;">
   </a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <a href="https://www.docker.com/" target="__blank">
      <img 
        src=https://raw.githubusercontent.com/imexotic/imexotic/main/assets/docker.webp height=50px 
        valign="middle" 
        title="Docker" 
        alt="Docker" 
        style="margin-right: 1rem;">
   </a>
   <br/>
   <br/>
</p>

## 📖 Usage

This project is open-source and I welcome anyone to clone the repository. Whether you're curious about my approach or looking to build upon it, feel free to dive in.

I only ask that if you use my code, please don't present it as solely your own creation. If you decide to extend and deploy this X/Twitter clone application, I'd appreciate a shoutout: just add a link back to this repository in your README. Happy exploring!

### 📦 Installation

The command will clone the repository, and automatically navigate into the project directory.

```
git clone git@github.com:<username>/twitter-clone.git && cd twitter-clone
```

#### ❌ Environmental Variables

`env_file` options are set up in `docker-compose.dev.yml` and `docker-compose.prod.yml`. All you have to do is: rename the desired file to exclude the `.sample` suffix and fill in the values accordingly to avoid any issues.

Refer to `.env.sample` for the required environmental variables.

#### 📐 Production Architecture

The first stage builds the necessary images and containers for the reverse proxy and the database, which are located on the `x-proxy-network` and `x-database-network` networks, respectively.

In the second stage, we build the front-end and back-end images to run in the container, and they will be located on the `x-network` network. The frontend and backend containers will be able to communicate with the reverse proxy, and only the backend container will be able to communicate with the database container over the `x-database-network` network.

<p align="center"><img src="https://github.com/hstoklosa/hstoklosa/blob/main/assets/AWS1.jpg?raw=true" style="width: 100%;" /></p>

### 💻 Development

The following commands will build the multi-container application in Docker for local development. Volumes have been defined for client and server to create bind mounts for hot-reloading.

1. Enter the development directory

    ```
    cd twitter-clone/docker/development
    ```

2. Create containers from images and run them.

    ```
    docker compose up
    ```

    > **_Note_**:
    > In order for Docker-wise changes to take place, use the **[--build [service_name]]** argument to rebuild the images and containers. <br> <br>The **[service_name]** sub-argument is the name of the `.yml` file, which is `docker-compose.yml` by default for both dev and prod.

<br>

**Development App Services:**

A detailed list of the containers found in the `docker/development/docker-compose.yml` file:

```
docker-compose ps

NAME       IMAGE             COMMAND                  SERVICE   CREATED       STATUS       PORTS
backend    xclone-backend    "docker-entrypoint.s…"   server    2 hours ago   Up 2 hours   0.0.0.0:8080->8080/tcp
frontend   xclone-frontend   "docker-entrypoint.s…"   client    2 hours ago   Up 2 hours   0.0.0.0:3000->3000/tcp
mongodb    mongo             "docker-entrypoint.s…"   mongo     2 hours ago   Up 2 hours   0.0.0.0:27017->27017/tcp
```

### 💻 Production

The project uses a multi-stage build with containers communicating over networks to create a production-ready deployement.

1.  Create the necessary networks.

    ```
    docker network create x-network
    docker network create x-database-network
    ```

2.  Build the images and run containers for the proxy and database.

    2.1 Enter the proxy directory

    ```
    cd twitter-clone/docker/proxy
    ```

    2.2 Starting the containers (incompatible with docker-compose version less than v3)

    ```
    docker compose up -d
    ```

    Rebuilding production images and containers

    -   **-v**: removes volumes:
    -   **[-f docker-compose.yml]**: specifies the docker-compose file to use

     <br />

    ```
    docker compose [-f COMPOSE_FILENAME] down [-v]

    docker compose [-f COMPOSE_FILENAME] build --no-cache
    ```

    2.3. Check the service of the containers from `proxy/docker-compose.yml`

    **First Layer of Services (Proxy):**

    ```
    docker-compose ps

    NAME             IMAGE                       COMMAND                                                  SERVICE          CREATED        STATUS                     PORTS
    acme-companion   nginxproxy/acme-companion   "/bin/bash /app/entrypoint.sh /bin/bash /app/start.sh"   acme-companion   2 months ago   Up 9 minutes
    mongodb          mongo                       "docker-entrypoint.sh mongod"                            mongodb          2 hours ago    Up 9 minutes (unhealthy)   127.0.0.1:27017->27017/tcp
    nginx-proxy      nginxproxy/nginx-proxy      "/app/docker-entrypoint.sh forego start -r"              nginx-proxy      2 months ago   Up 9 minutes               0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp
    ```

3.  Build the images and run containers for the application.

    3.1 Enter the production directory

    ```
    cd twitter-clone/docker/production
    ```

    3.2 Create containers from images and run them (ncompatible with docker-compose version less than v3.5)

    ```
    docker compose build --no-cache

    docker compose up -d
    ```

    > **Memory Note**: If you don't have enough memory on a machine (such as a VPS) to build the production images, consider setting up swap memory. [Here's a guide](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-18-04) on how to do it.

    3.3. Check the status of the containers from `docker-compose.prod.yml`

    **Second Layer of Services (App):**

    ```
    docker compose ps

    NAME       IMAGE             COMMAND                                          SERVICE    CREATED        STATUS              PORTS
    backend    xclone-backend    "docker-entrypoint.sh npm run prod"              backend    11 hours ago   Up About a minute   0.0.0.0:33566->8080/tcp, :::33566->8080/tcp
    frontend   xclone-frontend   "/docker-entrypoint.sh nginx -g 'daemon off;'"   frontend   11 hours ago   Up 11 hours         80/tcp, 0.0.0.0:33539->3000/tcp, :::33539->3000/tcp
    ```

## 📝 License

H. Stoklosa - hubert.stoklosa23@gmail.com

Distributed under the MIT license. See `LICENSE` for more information.

[https://github.com/hstoklosa](https://github.com/hstoklosa)
