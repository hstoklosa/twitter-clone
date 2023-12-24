const { transporter } = require("../config/nodemailer");
const User = require("../models/User.model");
const EmailToken = require("../models/EmailToken.model");
const getKeyAsync = require("../helpers/getKeyAsync");
const generateUsername = require("../helpers/generateUsername")

const createLocalUser = async (data) => {
    return await User.addUser(data);
};

const createGoogleUser = async (data) => {
    const generatedUsername = generateUsername(data.email);

    return await User.addUser({
        ...data,
        username: generatedUsername,
    });
};

const sendConfirmationEmail = async (userId, targetEmail) => {
    const { code = null } = await EmailToken.findOne({ userId }) || {};
    let toSend = code;

    if (!code) {
        const code = ((await getKeyAsync(3)).toString("hex"));

        new EmailToken({
            userId,
            code
        }).save();

        toSend = code;
    }

    const options = {
        to: targetEmail,
        from: '"Twitter Clone" <' + process.env.MAIL_USER + ">",
        subject: "Email Verification",
        text: "Thanks for giving my app a try! \nYour verification code is: " + toSend,
    };

    await transporter.sendMail(options);
};

module.exports = {
    createLocalUser,
    createGoogleUser,
    sendConfirmationEmail,
};
