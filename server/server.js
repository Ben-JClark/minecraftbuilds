const express = require("express");
const cors = require("cors");
const app = express();
const { getServers } = require("./database/queries");

app.use(cors());

app.get("/", async (req, res) => {
  // Fetch the servers and return it as .json
  const serverList = await getServers();
  if (serverList !== null) {
    console.log("Sending server data");
    res.status(200).json({ serverList }); // Send it as JSON response
  } else {
    console.log("Error sending server data");
    res.status(500).json({ error: "Failed to retreive server data." });
  }
});

app.listen(5000);
