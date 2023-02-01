module.exports = () => [
  {
    "path": "/backend/email",
    "proxy": {
      "instance": "email:3500",
      "path": "/v1.0/invoke/email/method/"
    }
  }
];
