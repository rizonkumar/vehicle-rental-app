require("dotenv").config(); // Load environment variables
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000

const server = http.createServer(app);

// TODO: Add database connection logic here

server.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
