const app = require("./api/app");

const port = process.env.NODE_DOCKER_PORT || 8080;

const server = app.listen(port, () => {
  console.log(`Short URL start with ${port}`);
});
