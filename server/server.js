const express = require("express");
const app = express();
const { getServers } = require("./database/queries");

app.get("/", async (req, res) => {
  // Fetch the servers and return it as .json
  const serverList = await getServers();
  if (serverList !== null) {
    res.json({ servers: serverList }); // Send it as JSON response
  } else {
    res.status(500).json({ error: "Failed to retreive server data." });
  }
});

app.listen(5000);
