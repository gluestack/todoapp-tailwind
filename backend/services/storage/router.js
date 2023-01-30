module.exports = () => [
  {
    "path": "/backend/storage/upload",
    "size_in_mb": 100,
    "proxy": {
      "instance": "storage:3500",
      "path": "/v1.0/invoke/storage/method/upload",
    },
  },
  {
    "path": "/backend/storage/file",
    "host": "host.docker.internal:10310",
    "proxy": {
      "instance": "host.docker.internal:10310",
      "path": "/",
    },
  },
];
