# <p align="center"> Twitter Clone 🐦 </p>

A simplified version of Twitter, which has been designed to mimic the core features of Twitter itself, such as the ability to post tweets, follow other users, and like tweets.

## Roadmap 🎉

### Progess Update: 23/06/2023

The goal of this side-project is to create a fully functional full-stack Twitter clone, which will be deployed and used as my resume project. I believe that such project is a perfect opportunity to further & demonstrate my coding capabilities.

The project is currently in the beginning phases of development, and in order to keep track of the progress, the following README will contain series of information (stack, features, specific todos).

Over the summer of 2023, I will be working on this project until it will be of a satisfactory standard to be deployed and included as my resume project.

### Progess Update: --/--/2023

### 🔍 Features

-   [x] User Authentication

*   `MongoDB` and `Mongoose` to store and model (ODM) data
*   `Passport.js` for local auth and OAuth2.0
*   `express-session` and `mongo-connect` for sessions management & storage
*   `@reduxjs/toolkit` instead of `redux` for quicker development

-   [ ] Profile Management (profile picture, bio, location)
-   [ ] Tweeting (text, images, videos)
-   [ ] Feed (tweets from followed users, algorithmic order)
-   [ ] Following/Followers
-   [ ] Likes & Retweets
-   [ ] Search Functionality (user/tweets)
-   [ ] Direct Messaging
-   [ ] Real-time Notifications (likes, retweets, follows, dms)

## 🔌 Technologies

I have decided to use the **_MERN_** stack for this project due to the fact that I've been planning to learn and use MongoDB for a while now, and this project is a perfect opportunity to do so.

Additinally, I can't ignore the fact that Mongo has gained a ton of popularity among developers over the past few years, and it is usually favoured for social media apps.
<br/><br/>

<p align="center">
   <a href="https://react.dev/" target="__blank">
      <img src=https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png width=50px alt="React" valign="middle" title="React" style="margin-right: 1rem; ">
   </a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="https://reactrouter.com/en/main" target="__blank">
      <img src=https://global.discourse-cdn.com/ionicframework/optimized/3X/b/1/b1ba5917ce8abb85ceedd52d2d5862970b07c714_2_500x500.png width=50px alt="React Router" valign="middle" title="React Router" style="margin-right: 1rem; border-radius: 50%;">
   </a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="https://nodejs.org/en" target="__blank">
      <img src=https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png width=50px alt="Nodejs" valign="middle" title="Nodejs" style="margin-right: 1rem;">
   </a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="https://expressjs.com/" target="__blank">
      <img src=https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Status_iucn_EX_icon.svg/480px-Status_iucn_EX_icon.svg.png width=50px alt="Express" valign="middle" title="Express" style="margin-right: 1rem;">
   </a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.mongodb.com/" target="__blank">
      <img src=https://icons-for-free.com/download-icon-MongoDB-1329545826074381322_256.ico width=50px alt="MongoDB" valign="middle" title="MongoDB" style="margin-right: 1rem;">
   </a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="#" target="__blank">
      <img src=https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png.webp width=50px alt="Docker" valign="middle" title="Docker" style="margin-right: 1rem;">
   </a>
   <br/><br/>
</p>

<!-- <div style="background: white; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 0.85rem; border-radius: .85rem; overflow: hidden;">
   <img src=https://reactrouter.com/_brand/react-router-mark-color.png height=45px width=45px alt="Docker" valign="middle" title="Docker" style="">
</div> -->

## 📖 Usage

The project is open-source, so feel free to clone the repository and use it as you wish, either to inspect what I've done or to extend it.

However, I would prefer if you didn't copy my code and claim it as your own. Therefore, if you plan on extending and deploying this Twitter clone, please provide a link to this repository in your README.

### 📦 Installation

The command will clone the repository, and automatically navigate into the project directory.

```
git clone git@github.com:<username>/twitter-clone.git && cd twitter-clone
```

### 💻 Development

The following commands will build the multi-container application in Docker for local development. Volumes have been defined for client and server to create bind mounts for hot-reloading.

Assuming it's your first time using the project, there is no don't need to use the `--build` flag. However, if you make any Docker-wise changes, you will need to use the previously mentioned flag to rebuild the container/s.

```
docker-compose -f docker-compose.dev.yml up [--build [service_name]] [-d]
```

A detailed list of the containers found in the `docker-compose.dev.yml` file:

```
docker-compose ps

NAME                IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
tc-database         mongo               "docker-entrypoint.s…"   mongo               23 seconds ago      Up 22 seconds       0.0.0.0:27017->27017/tcp
tc-node-server      tc-server           "docker-entrypoint.s…"   server              23 seconds ago      Up 21 seconds       0.0.0.0:8080->8080/tcp
tc-react-client     tc-client           "docker-entrypoint.s…"   client              23 seconds ago      Up 21 seconds       0.0.0.0:3000->3000/tcp

```

```
DATABASE: mongodb://mongo:27017/<database_name>
SERVER: http://localhost:8080
CLIENT: http://localhost:3000
```

### ❌ Environmental Variables

For now there is only `docker-compose.developer.yml` that can be used to build the multi-container for local development. However, as I will be working on the project and getting closer to the finish line, I will be creating a `docker-compose.production.yml` for this repository.

`env_file` options for development are already set up in `docker-compose.developer.yml`. All you have to do is ensure that you have the following environmental variables setup in the client/server.

You can rename the `.sample.env` file to `.env`, and fill in the values accordingly.

The process for setting up **production environmental variables** will vary on the hosting platform that you're planning to use, therefore make sure to consult their documentation about the topic.

**SERVER**

```
CLIENT_URL=
SERVER_PORT=

SESION_NAME=
SESSION_SECRET=
MONGO_URI=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=

MAIL_USER=
MAIL_PASS=
MAIL_SERVICE=
```

<!-- ### 🚀 Deployment

```

npm build

```-->

## 📝 License

[MIT License](https://github.com/imexotic/ExoBot/blob/main/LICENSE)
