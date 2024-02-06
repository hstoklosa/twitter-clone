require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/database");


connectDB(() => {
    const PORT = process.env.API_PORT || 3001;

    app.listen(PORT, () => {
        console.log(`[SERVER]: Server is running at port ${PORT}`);
    });
});
