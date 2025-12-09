# Recipe API Requirements (CRUD)

## Functional Requirements

The app should allow users to:

- **Create:** Add a new recipe (**title**, **ingredients**, **instructions**)
- **Read:** View all recipes and individual recipe details
- **Update:** Edit existing recipes
- **Delete:** Remove recipes they no longer want

---

## Base Information

- **Domain:** `https://api.recipe.com`
- **Base Path:** `/api/v1/recipes`

---

## Endpoints

### 1) List Recipes

- **HTTP Method:** `GET`
- **URL Path:** `/api/v1/recipes`
- **Request Format:** None
- **Response Format:** JSON
- **Status Codes:** `200 OK`, `404 Not Found`

**Response Body Sample**
```json
{
  "recipes": [
    {
      "id": 1,
      "title": "Recipe 1",
      "ingredients": "Description 1",
      "instructions": "ingredients 1"
    },
    {
      "id": 2,
      "title": "Task 2",
      "ingredients": "ingredients 2",
      "instructions": "instructions 2"
    },
    {
      "id": 3,
      "title": "Task 3",
      "ingredients": "ingredients 3",
      "instructions": "instructions 3"
    }
  ]
}
```

---

### 2) Get Recipe by ID

- **HTTP Method:** `GET`
- **URL Path:** `/api/v1/recipes/:id`
- **Request Format:** None
- **Response Format:** JSON
- **Status Codes:** `200 OK`, `404 Not Found`

**Response Body Sample**
```json
{
  "recipe": {
    "id": 1,
    "title": "Recipe 1",
    "ingredients": "ingredients 1",
    "instructions": "instructions 1"
  }
}
```

---

### 3) Create a New Recipe

- **HTTP Method:** `POST`
- **URL Path:** `/api/v1/recipes`
- **Request Format:** JSON
- **Response Format:** JSON
- **Status Codes:** `201 Created`, `400 Bad Request`

**Request Body Sample**
```json
{
  "recipe": {
    "title": "Recipe 4",
    "ingredients": "ingredients 4",
    "instructions": "instructions 4"
  }
}
```

**Response Body Sample**
```json
{
  "recipe": {
    "id": 4,
    "title": "Recipe 4",
    "ingredients": "ingredients 4",
    "instructions": "instructions 4"
  }
}
```

---

### 4) Update a Recipe

- **HTTP Method:** `PUT`
- **URL Path:** `/api/v1/recipes/:id`
- **Request Format:** JSON
- **Response Format:** JSON
- **URL Sample:** `https://api.recipe.com/api/v1/recipes/4`
- **Status Codes:** `200 OK`, `400 Bad Request`

**Request Body Sample**
```json
{
  "recipe": {
    "title": "Recipe 5",
    "ingredients": "ingredients 5",
    "instructions": "instructions 5"
  }
}
```

**Response Body Sample**
```json
{
  "recipe": {
    "id": 4,
    "title": "Recipe 5",
    "ingredients": "ingredients 5",
    "instructions": "instructions 5"
  }
}
```

---

### 5) Delete a Recipe

- **HTTP Method:** `DELETE`
- **URL Path:** `/api/v1/recipes/:id`
- **Request Format:** None
- **Response Format:** None
- **URL Sample:** `https://api.recipe.com/api/v1/recipes/4`
- **Status Codes:** `204 No Content`, `404 Not Found`

---
