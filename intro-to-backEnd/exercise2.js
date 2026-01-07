import express from "express";
import knex from "knex";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// This connects to the database stored in the file mentioned below
const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: "/Users/efe/Desktop/HYFT/hyf-assignment/courses/foundation/intro-to-backend/database.sqlite3",
  },
  useNullAsDefault: true,
});

app.get("/api-docs.json", (req, res) => {
  const openApiPath = path.join(__dirname, "openapi.json");
  const openApi = JSON.parse(fs.readFileSync(openApiPath, "utf8"));
  res.json(openApi);
});

app.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  res.send(html);
});

app.get("/all-users", async (req, res) => {
  const rows = await knexInstance("users").orderBy("id", "asc");
  res.json(rows);
});

app.get("/unconfirmed-users", async (req, res) => {
  const rows = await knexInstance("users")
    .whereNull("confirmed_at")
    .orderBy("id", "asc");
  res.json(rows);
});

app.get("/gmail-users", async (req, res) => {
  const rows = await knexInstance("users")
    .where("email", "like", "%@gmail.com");
  res.json(rows);
});

app.get("/2022-users", async (req, res) => {
  const rows = await knexInstance("users")
    .whereBetween("created_at", ["2022-01-01", "2022-12-31"]);
  res.json(rows);
});

app.get("/user-count", async (req, res) => {
  const count = await knexInstance("users").count("* as count");
  res.json(count);
});

app.get("/last-name-count", async (req, res) => {
  const lastName = req.query.lastName || req.query.lastname;
  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(lastName) || lastName.trim() === "" || !lastName) {
    return res.status(400).json({ error: "lastName parameter is required and must be a string" });
  }
  const lastNameList = await knexInstance("users").select("first_name", "last_name").whereRaw("LOWER(last_name) = LOWER(?) ORDER BY first_name ASC", [lastName]);
  const count = await knexInstance("users")
    .whereRaw("LOWER(last_name) = LOWER(?)", [lastName])
    .count("* as count");
  res.json({ count, lastNameList });
});

app.get("/first-user", async (req, res) => {
  const rows = await knexInstance("users")
    .orderBy("created_at", "asc")
    .limit(1);
  res.json(rows);
});

app.get("/last-user", async (req, res) => {
  const rows = await knexInstance("users")
    .orderBy("created_at", "desc")
    .limit(1);
  res.json(rows);
});

app.post("/add-user", async (req, res) => {
  const { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: "first_name, last_name, and email are required" });
  }
  const created_at = new Date().toISOString();
  
  const maxIdResult = await knexInstance("users").max("id as max_id").first();
  const maxId = maxIdResult?.max_id || 0;
  const id = maxId + 1;
  
  await knexInstance("users").insert({
    id,
    created_at,
    first_name,
    last_name,
    email
  });
  
  const newUser = await knexInstance("users").where("id", id).first();
  res.status(201).json(newUser);
});

app.put("/update-user", async (req, res) => {
  const { id, first_name, last_name, email } = req.body;
  if (!id || !first_name || !last_name || !email) {
    return res.status(400).json({ error: "id, first_name, last_name, and email are required" });
  }
  
  const existingUser = await knexInstance("users").where("id", id).first();
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }
  
  await knexInstance("users")
    .where("id", id)
    .update({
      first_name,
      last_name,
      email
    });
  
  const updatedUser = await knexInstance("users").where("id", id).first();
  res.json(updatedUser);
});

app.delete("/delete-user", async (req, res) => {
  const { id } = req.body;
  if (!id || isNaN(id) || id <= 0 || typeof id !== "number") {
    return res.status(400).json({ error: "id is required and must be a positive number" });
  }
  const existingUser = await knexInstance("users").where("id", id).first();
  if (!existingUser) {
    return res.status(404).json({ error: "User not found" });
  }
  await knexInstance("users").where("id", id).delete();
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});