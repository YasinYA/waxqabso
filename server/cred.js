const emailConfig = {
    service: process.env.SERVICE,
    email: process.env.EMAIL,
    password: process.env.PASSWORD
};

const secret = process.env.EMAIL_SECRET;

module.exports = { emailConfig, secret };
