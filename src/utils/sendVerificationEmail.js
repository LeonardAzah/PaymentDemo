const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  const message = `<p>Please confirm your email by clicking on the following link: <button></button><a href="${verifyEmail}" >Verify Email</a> </button> </p>`;

  return sendEmail({
    to: email,
    subject: "Email verification",
    html: `<h4> Hello ${name} </h4>
    </br>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
