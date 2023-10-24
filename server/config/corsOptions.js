const corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
};

module.exports = corsOptions;
