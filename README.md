<p align="center" style="border-radius: 1rem;"><img src="https://github.com/hstoklosa/hstoklosa/blob/main/assets/xclone-img.png?raw=true" style="width: 100%; border-radius: 1rem;" /></p>

<!-- <p align="center" style="">A simplified version of X/Twitter built in React and Node.js using Express & MongoDB.</p> -->

## Roadmap 🎉

The X/Twitter clone was developed using the MERN stack to replicate the essential features of the platform. This project is designed to demonstrate my full-stack development capabilities by implementing dynamic web functionalities with a focus on performance, scalability, and security. By completing this project, I aim to achieve a comprehensive understanding of various new technologies, consequently enhancing my proficiency in full-stack development.

### 🔍 Features

Here's what you can do with the X Clone:

-   **User Authentication:** The application supports both local authentication (using username and password) and Google Authentication. It protects user data and personalises the experience, allowing for a quick sign-in process with Google accounts.

-   **Profile Management:** Users can create and edit their profiles, which includes details like name, biography, profile/background pictures, and other personal information.

-   **Following/Followers:** The social feature allows users to follow other accounts to see their tweets in the feed and to be followed back.

-   **Posting:** Users can post "tweets" composed of text and/or images. This is complemented by various interactive features such as liking, commenting, retweeting, and quoting to engage with these posts.

-   **Search Functionality:** This allows to search for other users, tweets, or trending hashtags. It's important for navigation and enhances the chance of discovering content, making the platform more user-friendly.

-   **Direct Messaging (real-time):** Users can send private messages to one another in real time.

-   **Notifications (real-time):** The systems alerts users of new interactions, keeping them informed and engaged with the activity related to their accounts and content.

### 🎥 Preview (COMING SOON)

...

## 🔌 Technologies

The application is built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), which simplifies the development process by maintaining a unified JavaScript environment across both client and server sides, reducing the need for context switches. Additionally, this project provided an opportunity to explore NoSQL databases that support efficient management of large, unstructured data sets to enhance the apps's scalability and performance. This experience has expanded my technical skill set and highlighted my dedication to learning modern technologies (e.g., Redux Toolkit, NoSQL, and Docker) to deliver robust software solutions.

### Additional information

-   `MongoDB` a document-orientated & NoSQL data storage
-   `mongoose` for ODM modelling and easier data access/manipulation
-   `passport.js` for local authentication and OAuth2.0
-   `express-session` and `mongo-connect` to create and store sessions
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

## 📚 What I Learned

### 🗄️ NoSQL

-   **Models:** Despite MongoDB being schema-less, I have created NoSQL models by defining them using Mongoose. This assisted with validating data and structuring it by using e.g., embedded documents and references to design relationships between entities.

-   **Indexing:** I learned about implementing MongoDB indexing to improve query performance. By creating those indexes on frequently queried fields, the read operations became significantly faster, especially as users started registering.

-   **Scalability:** I experimented with MongoDB's replication and sharding capabilities to handle increased load and data volume. This part of the project has not been fully completed, however, the basic scalability of NoSQL databases appears sufficient.

### 💾 State Management with RTK

-   **Data Fetching and Caching:** I learned about managing server state efficiently by fetching data from the backend and caching the responses. The RTK library incorporates a cahcing features that invalidates data through tags and re-fetches it as necessary. This reduced the number of requests made, enhancing performance and user-experience.

-   **API Slices**: Developed "slices" to encapsulate logic for different resources. This modular approach simplified global state management by organising it into more manageable chunks and automatically handling different states such as success, loading, and error.

-   **Optimistic Updates:** Any changes made by the user (e.g., liking or unliking a post) are immediately reflected in the UI, while the API call processes the requests. This was utilised to improve the interactivity of the application.

-   **Streaming (real-time) updates:** I configured RTK Query to manage real-time updates within the application using WebSockets integration. This allows the UI to update dynamically as data is broadcasted to a specific set of users, improving the user-experience for real-time streaming services.

-   **Code Reusability:** Leveraged from the built-in utilities and hooks, such as `useQuery` and `useMutation` which reduced boilerplate code and increased the reusability of logic across components. This allowed for a more concise and maintainable codebase.

### 🖱️ Infinite Scrolling

-   **Pagination:** Integrating pagination involved structuring the backend to deliver data in chunks, which was essential for improving load times and reducing server load. This was implemented in both frontend and backend logic that interacts to request and display specific pages of data.

-   **Virtualisation:** This concept was applied to the project to optimise the rendering of large data lists without overwhelming the virtual DOM (remember, modern web technologies). The library `react-virtualized` was used to render only the visible elements based on the current scroll position. This was particularly useful in scenarios where the DOM could potentially become slower due to excessive rendering operations, leading to features such as smooth scrolling and interaction.

### 🎣 React Hooks

-   **Custom Hooks:** I learned about creating complex custom hooks, such as `useInfiniteScroll` and `useDebounce`. This allows the components to focus on the UI by encapsulating reusable logic, as well as resulting in a modular and maintainable codebase by abstracting common functionalities.

-   **Performance optimisation:** I gained a better understanding of how to optimise the performance of components using `useMemo` and `useCallback` in a complex and modular application. These hooks help avoid expensive calculations and unnecessary re-renders, ensuring that components are updated when necessary.

### 🐳 Containerisation

-   **Containers:** I learned about leveraging Docker images and containers to ensure a consistent development and production environment, by encapsulating the application and its dependencies within a container.

-   **Multi-container Architecture**: I gained experience in managing multi-container applications using `docker-compose`, which involved defining and configuring multiple services, networks, and volumes for each component in the project. This approach allowed for independent updates and service scaling without affecting the entire system.

-   **Networking:** I learned about how Docker handles inter-container communication within the same network, and the importance of network isolation and protocols in maintaining the integrity of the application. By configuring the networks, I have established connections between the containers, enabling communication that is closed by default.

### 🔗 Back-end (REST API)

-   **Concurrency:** I gained practical experience in handling concurrent promises. This allowed me to manage multiple asynchronous operations simultaneously using the `Promise.all` method, which has improved the efficiency of the back-end operations. This was useful in scenarios where executing several independent tasks wasn't efficient.

-   **File Storage:** To implement file storing I used `multer`, a Node.js middleware, to handle `multipart/form-data`. The library has been configured to process incoming files, store them locally, and reference their paths in the database. This allowed the application to retrieve files and display them in the user interface.

-   **Security:** I enhanced the application's security by implementing rate limiting, which helps prevent API abuse and mitigate DoS attacks by limiting the number of requests a node can make within a specific timeframe. Additionally, I learned to set HTTP headers to prevent XSS attacks and CORS policies to manage requests safely.

-   **WebSockets:** This was integrated into the backend to enable real-time bi-directional communication between the server and clients. This is important for features that require immediate user-interface updates without the need for polling. It has improved the responsiveness of the application and provided deeper insights into modern technologies that consist of handling persistent connections and the challenges with real-time data transmission.

## 📖 Usage

This project is open-source and I welcome anyone to clone the repository. Whether you're curious about my approach or looking to build upon it, feel free to dive in.

I only ask that if you use my code, please don't present it as solely your own creation. If you decide to extend and deploy this clone application, I'd appreciate a shoutout: just add a link back to this repository in your README. Happy exploring!

### 📦 Installation

The command will clone the repository, and automatically navigate into the project directory.

```
git clone git@github.com:<username>/twitter-clone.git && cd twitter-clone
```

#### Environmental Variables

The files containing envrionmental variables for both development and production environments have been configured, and they are to be included when building and running containers.

1. Rename the desired file to exclude the `.sample` suffix.
2. Fill in the values accordingly to avoid any compile/runtime issues.

Refer to `docker/production` and `docker/development` for the sample environmental variables.

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

    > **Note**:
    > In order for Docker-wise changes to take place, use the **[--build [service_name]]** argument to rebuild the images and containers. The **[service_name]** sub-argument is the name of the `.yml` file, which is `docker-compose.yml` by default for both dev and prod.

3. Check the service of containers from `docker/development/docker-compose.yml`

    ```
    docker-compose ps

    NAME       IMAGE             COMMAND                  SERVICE   CREATED       STATUS       PORTS
    backend    xclone-backend    "docker-entrypoint.s…"   server    2 hours ago   Up 2 hours   0.0.0.0:8080->8080/tcp
    frontend   xclone-frontend   "docker-entrypoint.s…"   client    2 hours ago   Up 2 hours   0.0.0.0:3000->3000/tcp
    mongodb    mongo             "docker-entrypoint.s…"   mongo     2 hours ago   Up 2 hours   0.0.0.0:27017->27017/tcp
    ```

### 🚀 Production

The project uses a multi-stage build with containers communicating over networks to create a production-ready deployement.

The first stage builds the necessary images and containers for the reverse proxy and the database, which are located on the `x-proxy-network` and `x-database-network` networks, respectively.

In the second stage, we build the front-end and back-end images to run in the container, and they will be located on the `x-network` network. The frontend and backend containers will be able to communicate with the reverse proxy, and only the backend container will be able to communicate with the database container over the `x-database-network` network.

<p align="center"><img src="https://github.com/hstoklosa/hstoklosa/blob/main/assets/AWS1.jpg?raw=true" style="width: 100%;" /></p>

#### First Layer of Services (Proxy & Database)

1.  Create the necessary networks.

    ```
    docker network create x-network
    docker network create x-database-network
    ```

2.  Enter the proxy directory

    ```
    cd twitter-clone/docker/proxy
    ```

3.  Starting the containers (incompatible with docker-compose version less than v3)

    ```
    docker compose up -d
    ```

    Rebuilding production images and containers

    -   **-v**: removes volumes:

     <br />

    ```
    docker compose [-f COMPOSE_FILENAME] down [-v]

    docker compose [-f COMPOSE_FILENAME] build --no-cache
    ```

4.  Check the service of containers from `docker/proxy/docker-compose.yml`

    ```
    docker-compose ps

    NAME             IMAGE                       COMMAND                                                  SERVICE          CREATED        STATUS                     PORTS
    acme-companion   nginxproxy/acme-companion   "/bin/bash /app/entrypoint.sh /bin/bash /app/start.sh"   acme-companion   2 months ago   Up 9 minutes
    mongodb          mongo                       "docker-entrypoint.sh mongod"                            mongodb          2 hours ago    Up 9 minutes (unhealthy)   127.0.0.1:27017->27017/tcp
    nginx-proxy      nginxproxy/nginx-proxy      "/app/docker-entrypoint.sh forego start -r"              nginx-proxy      2 months ago   Up 9 minutes               0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcp
    ```

#### Second Layer of Services (Application)

1.  Enter the production directory

    ```
    cd twitter-clone/docker/production
    ```

2.  Create containers from images and run them (docker-compose version>= v3.5)

    ```
    docker compose build --no-cache

    docker compose up -d
    ```

    > If you don't have enough memory on a machine (such as a VPS) to build the production images, consider setting up swap memory. [Here's a guide](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-18-04) on how to do it.

3.  Check the status of containers from `docker/production/docker-compose.yml`

    ```
    docker compose ps

    NAME       IMAGE             COMMAND                                          SERVICE    CREATED        STATUS              PORTS
    backend    xclone-backend    "docker-entrypoint.sh npm run prod"              backend    11 hours ago   Up About a minute   0.0.0.0:33566->8080/tcp, :::33566->8080/tcp
    frontend   xclone-frontend   "/docker-entrypoint.sh nginx -g 'daemon off;'"   frontend   11 hours ago   Up 11 hours         80/tcp, 0.0.0.0:33539->3000/tcp, :::33539->3000/tcp
    ```

<!-- #### Docker Architecture

The first stage builds the necessary images and containers for the reverse proxy and the database, which are located on the `x-proxy-network` and `x-database-network` networks, respectively.

In the second stage, we build the front-end and back-end images to run in the container, and they will be located on the `x-network` network. The frontend and backend containers will be able to communicate with the reverse proxy, and only the backend container will be able to communicate with the database container over the `x-database-network` network. -->

## 📝 License

H. Stoklosa - hubert.stoklosa23@gmail.com

Distributed under the MIT license. See `LICENSE` for more information.

[https://github.com/hstoklosa](https://github.com/hstoklosa)
