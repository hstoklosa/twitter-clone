# <p align="center"> X Clone</p>

<p align="center"><img src="https://static.dezeen.com/uploads/2023/07/x-logo-twitter-elon-musk_dezeen_2364_col_0.jpg" width=150 /></p>
<p align="center">A simplified version of X (previously Twitter). </p>

## Roadmap 🎉

The goal of this side-project is to create a fully functional full-stack Twitter clone, which will be deployed and used as my resume project. I believe that such project is a perfect opportunity to further & demonstrate my coding capabilities.

The project is currently in the beginning phases of development, and in order to keep track of the progress, the following README will contain series of information (stack, features, specific todos).

Over the summer of 2023, I will be working on this project until it will be of a satisfactory standard to be deployed and included as my resume project.

### Progess Update: 04/07/2023

In the first week of the project commencing, I have managed to implement an authentication system that somewhat resembles the one used by Twitter by combining `passport.js` and `MongoDB`.

1. The application now supports local authentication as well as OAuth2.0 (Google), and it works alongside MongoDB to store user data and the sessions from `express-session` to maintain a persistant authentication for the user across the application. I have constructed appropriate pages on the client-side of the application to accomodate the backend authentication system, including Login (local & OAuth2.0) and Home pages.

2. Lastly, in order to allow the user to navigate through the application (either auth/not auth), I familiarised myself with the newly released `react-router-dom v6.14` library and applied the `RouterProvider` with some basic routes - Login & ProtectedRoute (Home, Profile...).

### Progess Update: 18/07/2023

**PERSONAL NOTE:** Lately I've been diving into new technologies that I will be using to build the Twitter clone. It's been somewhat time-consuming (thus the lack of updates), but I still managed to become familiar with their usage and how they can be combined to build a fully functional app.

1. I've learnt `Docker` and `docker-compose` to create a multi-container application. The architecture splits the full-stack application into 3 containers (client, server, database), which run and communicate with each other in parallel. The technology will save me a lot of time in the future, because it allows for **faster deployements and migrations**.

2. I've opted to use `@redux/toolkit` and `react-redux` instead of the `useContext` hook for maintaining a consistent global state. Although `redux` is a verbose and requires much more boilerplate code, the `toolkit` offers a more efficient implementation of the same store functionality.

3. The backend error-handling has been upgraded with a `CustomHttpError` object and re-implemented error-handling middleware that decides upon the content of the error response based on the current environment. It responds with either detailed or generic error messages, which can be caught by the `asyncThunk` function and displayed to the user.

### Progess Update: 05/08/2023

...

### 🔍 Features

-   [x] User Authentication

*   `MongoDB` and `Mongoose` to store and model (ODM) data
*   `Passport.js` for local auth and OAuth2.0
*   `express-session` and `mongo-connect` for sessions management & storage
*   `@reduxjs/toolkit` instead of `redux` for quicker development

-   [x] Profile Management (profile picture, bio, location)
-   [x] Following/Followers
-   [x] Tweeting (text, images, videos)
-   [ ] Likes & Retweets
-   [ ] Feed (tweets from followed users, algorithmic order)
-   [ ] Search Functionality (user/tweets)
-   [ ] Direct Messaging
-   [ ] Real-time Notifications (likes, retweets, follows, dms)

## 🔌 Technologies

I have decided to use the **MERN** stack since I've never used a NoSQL database technology before. In addition, MongoDB has gained a lot of popularity among developers due to its capabilities for storing and handling large amounts of data e.g., for social media apps.

Additinally, I can't ignore the fact that Mongo has gained a ton of popularity among developers due to its capabilities, and it is usually favoured for social media applications.
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

### ❌ Environmental Variables

For now there is only `docker-compose.developer.yml` that can be used to build the multi-container for local development. However, as I will be working on the project and getting closer to the finish line, I will be creating a `docker-compose.production.yml` for this repository.

`env_file` options for development are already set up in `docker-compose.developer.yml`. All you have to do is to rename the `.env.sample` file to `.env`, and fill in the values accordingly.

The process for setting up **production environmental variables** will vary on the hosting platform that you're planning to use, therefore make sure to check their documentation.

**Sample version of .env**

```
MONGO_URI=
MONGO_LOCAL_PORT=
MONGO_DOCKER_PORT=

SERVER_ORIGIN=
SERVER_LOCAL_PORT=
SERVER_DOCKER_PORT=

CLIENT_ORIGIN=
CLIENT_LOCAL_PORT=
CLIENT_DOCKER_PORT=

SESSION_NAME=
SESSION_SECRET=

MAIL_USER=
MAIL_PASS=
MAIL_SERVICE=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
```

## 📝 License

[MIT License](https://github.com/imexotic/ExoBot/blob/main/LICENSE)
