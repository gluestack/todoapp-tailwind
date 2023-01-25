module.exports = () => [
  {
    "server_name": "your-app-name"
  },
  {
    "path": "/backend",
    "proxy": {
      "path": "/"
    }
  }
];
