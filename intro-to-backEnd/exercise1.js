import express from "express";
const app = express();

app.listen(3000, function () {
  console.log(`> Ready on http://localhost:3000`);
});

app.get("/", (req, res) => {
    //read parameters from the request simply by accessing the query property
    const ip = req.ip;
    console.log("IP address: ", ip);

  res.send("Your IP address is: " + ip);
});

app.get("/currentYear", (req, res) => {
    // TODO: Implement this function to return a JSON object containing the current year
    const year = new Date().getFullYear();
    res.json({ year: year });

  });
  