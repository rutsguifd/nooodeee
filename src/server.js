const http = require("http");
const { handleRequests } = require("./routes");

const server = http.createServer(handleRequests);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
