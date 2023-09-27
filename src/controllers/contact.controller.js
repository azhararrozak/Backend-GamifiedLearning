const nodeMailer = require("nodemailer");

exports.contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: process.env.EMAIL_CONTACT,
        pass: process.env.EMAIL_PASS,
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_CONTACT,
      subject: `You Got Message from:${name} on email:${email}`,
      text: message,
    };

    await transporter.sendMail(mailOptions, (err) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send({ message: "Email sent successfully!" });
      }
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
