const { Glue } = require("@gluestack/glue-server-sdk-js");

module.exports = async (req, res) => {
  const { headers, body } = req;

  const user = body?.data?.new;

  const emailBody = {
    "mailOptions": {
      "from": "geekyants@gmail.com",
      "to": user.email,
      "subject": "Welcome Sandeep",
      "text": "Hello",
      "template": "welcome",
      "data": {
        "name": user.name
      }
    },
    "transportOptions": {
      "host": "smtp.mailtrap.io",
      "port": 2525,
      "auth": {
        "user": "4e511763db148f",
        "pass": "5a622fbe556e76"
      }
    }
  }

  const glue = new Glue("http://host.docker.internal:9090")

  const _ = await glue.email.send(emailBody);

  console.log(_);

  return res.status(200).json({
    status: true,
    message: 'user-created!'
  });
};
