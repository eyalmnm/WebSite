const http = require('http');
const handler = require('serve-handler');

const port = Number(process.env.PORT) || 3000;

const server = http.createServer((request, response) =>
  handler(request, response, {
    public: __dirname,
    cleanUrls: true,
  })
);

server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${port}`);
});
