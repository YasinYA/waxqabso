const nodemailer = require("nodemailer");
const EmailTemplate = require("email-templates");
const path = require("path");
const { emailConfig } = require("../cred.js");

// setup the transporter
const transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: {
        user: emailConfig.email,
        pass: emailConfig.password
    }
});

const loadTemplate = (templateName, context) => {
    let template = new EmailTemplate({
        views: {
            options: {
                extension: "hbs"
            }
        }
    });
    return template.renderAll(templateName, context);
};

const fullUrl = process.env.FULL_URL || "http://localhost:8000";
// send email wrapper
const sendEmail = (templateName, context) => {
    const ctx = {
        url: `${fullUrl}/${context.urlPath}/${context.token}`,
        ...context
    };

    loadTemplate(templateName, ctx).then(result => {
        transporter.sendMail(
            {
                to: context.email,
                from: `Waxqabso <${emailConfig.email}>`,
                subject: result.subject,
                text: result.text,
                html: result.html
            },
            (err, info) => {
                if (err) console.log(err);
                console.log(info);
            }
        );
    });
};

module.exports = sendEmail;
