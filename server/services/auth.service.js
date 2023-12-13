const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { transporter } = require("../config/nodemailer");
const User = require("../models/User.model");

const createLocalUser = async (data) => {
    data[password] = await bcrypt.hash(password, 10);
    return await User.addUser(data);
};

const createGoogleUser = async (data) => {
    const generatedUsername = generateUsername(email);
    const customDob = new Date("1997-01-01").toISOString().split("T")[0];

    return await User.addUser({
        ...data,
        username: generatedUsername,
        dob: customDob,
    });
};

const sendConfirmationEmail = async (targetEmail) => {
    const code = crypto.randomBytes(3).toString("hex");

    const options = {
        to: targetEmail,
        from: '"Twitter Clone" <' + process.env.MAIL_USER + ">",
        subject: "Email Verification",
        text: "Thanks for giving my app a try! \nYour verification code is: " + code,
    };

    return await transporter.sendMail(options);
};

const comparePassword = async (p1, p2) => await bcrypt.compareSync(p1, p2);

module.exports = {
    createLocalUser,
    createGoogleUser,
    sendConfirmationEmail,
    comparePassword,
};
