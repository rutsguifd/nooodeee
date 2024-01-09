const respondWithJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const respondWithError = (res, statusCode, errorMessage) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: errorMessage }));
};

module.exports = { respondWithJSON, respondWithError };
