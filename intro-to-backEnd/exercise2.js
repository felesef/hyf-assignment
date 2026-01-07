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

// Serve OpenAPI spec
app.get("/api-docs.json", (req, res) => {
  const openApiPath = path.join(__dirname, "openapi.json");
  const openApi = JSON.parse(fs.readFileSync(openApiPath, "utf8"));
  res.json(openApi);
});

// Serve Swagger UI at root
app.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");
  res.send(html);
});

// Here is an example of the first route, /all-users, which returns all users sorted by their ID
app.get("/all-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users ORDER BY id ASC;");
  res.json(rows);
});

// TODO implement more routes here
app.get("/unconfirmed-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users WHERE confirmed_at IS NULL ORDER BY id ASC;");
  res.json(rows);
});

app.get("/gmail-users", async (req, res) => {
  const rows = await knexInstance.raw("SELECT * FROM users WHERE email LIKE '%@gmail.com';");
  res.json(rows);
});

app.get("/2022-users", async (req, res) => {
    const rows = await knexInstance.raw("SELECT * FROM users WHERE created_at >= '2022-01-01' AND created_at <= '2022-12-31';");
    res.json(rows);
});

app.get("/user-count", async (req, res) => {
    const rows = await knexInstance.raw("SELECT COUNT(*) FROM users;");
    res.json(rows);
});

app.get("/last-name-count", async (req, res) => {
    const lastName = req.query.lastName || req.query.lastname;
    
    if (!lastName) {
        return res.status(400).json({ error: "lastName parameter is required" });
    }
    const rows = await knexInstance.raw("SELECT COUNT(*) as count FROM users WHERE LOWER(last_name) = LOWER(?)", [lastName]);
    res.json(rows);
});

app.get("/first-user", async (req, res) => {
    const rows = await knexInstance.raw("SELECT * FROM users ORDER BY id ASC LIMIT 1;");
    res.json(rows);
});

app.get("/last-user", async (req, res) => {
    const rows = await knexInstance.raw("SELECT * FROM users ORDER BY id DESC LIMIT 1;");
    res.json(rows);
});

app.post("/add-user", async (req, res) => {
  const { first_name, last_name, email } = req.body;
  if (!first_name || !last_name || !email) {
    return res.status(400).json({ error: "first_name, last_name, and email are required" });
  }
  const created_at = new Date().toISOString();
  
  const maxIdResult = await knexInstance.raw("SELECT MAX(id) as max_id FROM users;");
  const maxId = maxIdResult[0]?.max_id || 0;
  const id = maxId + 1;
  
  await knexInstance.raw("INSERT INTO users (id, created_at, first_name, last_name, email) VALUES (?, ?, ?, ?, ?)", [id, created_at, first_name, last_name, email]);
  
  const newUser = await knexInstance.raw("SELECT * FROM users WHERE id = ?", [id]);
  res.status(201).json(newUser[0]);
});

app.put("/update-user", async (req, res) => {
  const { id, first_name, last_name, email } = req.body;
  if (!id || !first_name || !last_name || !email) {
    return res.status(400).json({ error: "id, first_name, last_name, and email are required" });
  }
  
  const existingUser = await knexInstance.raw("SELECT * FROM users WHERE id = ?", [id]);
  if (!existingUser || existingUser.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  
  await knexInstance.raw("UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?", [first_name, last_name, email, id]);
  
  const updatedUser = await knexInstance.raw("SELECT * FROM users WHERE id = ?", [id]);
  res.json(updatedUser[0]);
});

app.delete("/delete-user", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "id is required" });
  }
  const existingUser = await knexInstance.raw("SELECT * FROM users WHERE id = ?", [id]);
  if (!existingUser || existingUser.length === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  await knexInstance.raw("DELETE FROM users WHERE id = ?", [id]);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});