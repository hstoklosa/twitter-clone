# <p align="center"> Twitter Clone 🐦 </p>

A simplified version of Twitter, which has been designed to mimic the core features of Twitter itself, such as the ability to post tweets, follow other users, and like tweets.

## Roadmap 🎉

### Progess Update: 23/06/2023

The goal of this side-project is to create a fully functional full-stack Twitter clone, which will be deployed and used as my resume project. I believe that such project is a perfect opportunity to further & demonstrate my coding capabilities.

The project is currently in the beginning phases of development, and in order to keep track of the progress, the following README will contain series of information (stack, features, specific todos).

Over the summer of 2023, I will be working on this project until it will be of a satisfactory standard to be deployed and included as my resume project.

### Progess Update: --/--/2023

...

### 🔍 Features

-   [ ] User Authentication

*   `Passport.js` for local auth and OAuth2.0
*   `express-session` (and cookies) vs `jwt` for session management
*   `MongoDB` to store and handle user data
*   `Mongoose` object modelling library (ODM) for MongoDB
*   `ReactContext` vs `Redux` for state management

-   [ ] Profile Management (profile picture, bio, location)
-   [ ] Tweeting (text, images, videos)
-   [ ] Feed (tweets from followed users, algorithmic order)
-   [ ] Following/Followers
-   [ ] Likes & Retweets
-   [ ] Search Functionality (user/tweets)
-   [ ] Direct Messaging
-   [ ] Real-time Notifications (likes, retweets, follows, dms)

### 👇🏼 TODO

-   [x] Decide on SQL vs NoSQL - **MongoDB**
-   [x] Decide on a stack - **MERN**
-   [ ] ...

## 🔌 Technologies

I have decided to use the PERN stack for this project due to my previous experience with the technologies in this stack, and not to ignore the fact that it is very suitable for the chosen project.

<a href="#">
   <img src=https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png height=40px width=40px alt="React" valign="middle" title="React" style="background: white; border-radius: .85rem; padding: 0.3rem; margin-right: 0.4rem;">
</a> <a href="#">
   <img src=https://reactrouter.com/_brand/react-router-mark-color.png height=40px width=48px alt="React" valign="middle" title="React" style="background: white; border-radius: .85rem; padding: 0.3rem; margin-right: 0.4rem;">
</a> <a href="#">
   <img src=https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png height=40px width=40px alt="Redux" valign="middle" title="Redux"
   style="background: white; border-radius: .85rem; padding: 0.3rem; margin-right: 0.4rem;"> 
</a> <a href="#">
   <img src=https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png height=40px width=40px alt="Node" valign="middle" title="Node"
   style="background: white; border-radius: .85rem; padding: 0.3rem; margin-right: 0.4rem;">
</a> <a href="#">
   <img src=https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png height=40px width=40px alt="Express" valign="middle" title="Express"
   style="background: white; border-radius: .85rem; padding: 0.3rem; margin-right: 0.4rem;">
</a> <a href="#">
   <img src=https://icons-for-free.com/download-icon-MongoDB-1329545826074381322_256.ico height=40px width=40px alt="MongoDB" valign="middle" title="MongoDB"
   style="background: white; border-radius: .85rem; padding: 0.3rem; margin-right: 0.4rem;">
</a> <a href="#">
   <img src=https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png.webp height=40px width=40px alt="Docker" valign="middle" title="Docker"
   style="background: white; border-radius: .85rem; padding: 0.3rem; margin-right: 0.4rem;">
</a>

<!-- <div style="background: white; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 0.85rem; border-radius: .85rem; overflow: hidden;">
   <img src=https://reactrouter.com/_brand/react-router-mark-color.png height=45px width=45px alt="Docker" valign="middle" title="Docker" style="">
</div> -->

## 📖 Usage

The project is open-source, so feel free to clone the repository and use it as you wish, either to inspect what I've done or to extend it.

However, I would prefer if you didn't copy my code and claim it as your own. Therefore, if you plan on extending and deploying this Twitter clone, please provide a link to this repository in your README.

### 📦 Installation

The following command will clone the repository, and install all of the required dependencies straight after to make the project runnable.

```
git clone git@github.com:imexotic/twitter-clone.git && cd twitter-clone && npm install
```

### ❌ Environmental Variables

Ensure that you have the following environmental variables setup in your project's directory to establish a connection to MongoDB. You can rename the `.sample.env` file to `.env`, and fill in the values accordingly.

```
...
```

### 💻 Development

```
npm start
```

### 🚀 Deployment

```
npm build
```

## 📝 License

[MIT License](https://github.com/imexotic/ExoBot/blob/main/LICENSE)
