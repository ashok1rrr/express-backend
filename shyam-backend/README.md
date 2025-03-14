# Only Click Recuritment (Task Management API)

This is a simple Task Management API that allows authenticated users to create, update, read, and delete their tasks. The API ensures that each user can only access their own tasks, using authentication via JWT (JSON Web Tokens). The API also supports CRUD (Create, Read, Update, Delete) operations for managing tasks.

## Features

- **User Authentication**: JWT-based authentication to protect routes and ensure secure access.
- **CRUD Operations**: Create, Read, Update, and Delete tasks associated with an authenticated user.
- **Access Control**: Prevent users from accessing or modifying tasks that do not belong to them (403 Forbidden).
- **Database**: MongoDB for storing user data and tasks.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database to store user and task data.
- **Mongoose**: ODM (Object Data Modeling) library to interact with MongoDB.
- **JWT (JSON Web Tokens)**: For user authentication and session management.
- **Bcryptjs**: To hash passwords and ensure secure user authentication.

## Requirements

- **Node.js**: v18.19.1 or higher (LTS)
- **MongoDB**: Make sure MongoDB is installed and running, or use a MongoDB cloud service like Atlas or locally.

## API Endpoints

### Authentication Routes



### **POST /api/v1/auth/login**

This route is used by users to log in. It requires a valid username/email and password, and in return, it provides a JWT token that should be used for subsequent authenticated requests.

#### Request

- **URL**: `/api/v1/auth/login`
- **Method**: `POST`
- **Body**: The request body should contain the following fields:

  ```json
  {
    "username": "user@example.com",  // User's email or username
    "password": "password123"         // User's password
  }
  ```

#### Response

```json
{
  "message": "Logged in successfully",
  "authToken": "jwt-token-here"
}
```

---

### **POST /register**

#### Request

- **URL**: `/api/v1/auth/register`
- **Method**: `POST`
- **Body**: The request body should contain the following fields:

  ```json
  {
    "username": "newuser",        // New user's username
    "email": "newuser@example.com", // New user's email
    "password": "password123"      // New user's password
  }
  ```

#### Response

```json
{
  "message": "User registered successfully"
}
```


---

### **POST /api/v1/auth/change-password**


#### Request

- **URL**: `/api/v1/auth/change-password`
- **Method**: `POST`
- **Headers**: Include the JWT token in the request headers (`Authorization: Bearer <JWT_TOKEN>`).
- **Body**: The request body should contain the following fields:

  ```json
  {
    "currentPassword": "oldPassword123",  // The user's current password
    "newPassword": "newPassword123",      // The new password
    "reEnterPassword": "newPassword123"   // The new password repeated for confirmation
  }
  ```

#### Response

If the password change is successful, the response will confirm the password change.

```json
{
  "message": "Password changed successfully"
}
```



### Task Routes

#### **POST /api/v1/tasks**

Create a new task.

Request Body:
```json
{
  "title": "Task title",
  "description": "Task description",
  "dueDate": "2025-05-01T12:00:00Z",
  "status": "pending"
}
```

Response:
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "task-id",
    "title": "Task title",
    "description": "Task description",
    "dueDate": "2025-05-01T12:00:00Z",
    "status": "pending",
    "user": "user-id",
    "createdAt": "2025-03-14T00:00:00Z",
    "updatedAt": "2025-03-14T00:00:00Z"
  }
}
```

#### **GET /api/v1/tasks**

Fetch all tasks for the authenticated user.

Response:
```json
{
  "tasks": [
    {
      "_id": "task-id",
      "title": "Task title",
      "description": "Task description",
      "dueDate": "2025-05-01T12:00:00Z",
      "status": "pending",
      "user": "user-id",
      "createdAt": "2025-03-14T00:00:00Z",
      "updatedAt": "2025-03-14T00:00:00Z"
    }
  ]
}
```

#### **GET /api/v1/tasks/:taskId**

Fetch a specific task by its ID. Only the authenticated user who owns the task can access it.

Response:
```json
{
  "task": {
    "_id": "task-id",
    "title": "Task title",
    "description": "Task description",
    "dueDate": "2025-05-01T12:00:00Z",
    "status": "pending",
    "user": "user-id",
    "createdAt": "2025-03-14T00:00:00Z",
    "updatedAt": "2025-03-14T00:00:00Z"
  }
}
```

#### **PUT /api/v1/tasks/:taskId**

Update an existing task by its ID. Only the authenticated user who owns the task can update it.

Request Body:
```json
{
  "title": "Updated Task title",
  "description": "Updated description",
  "dueDate": "2025-06-01T12:00:00Z",
  "status": "completed"
}
```

Response:
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "task-id",
    "title": "Updated Task title",
    "description": "Updated description",
    "dueDate": "2025-06-01T12:00:00Z",
    "status": "completed",
    "user": "user-id",
    "createdAt": "2025-03-14T00:00:00Z",
    "updatedAt": "2025-03-14T00:00:00Z"
  }
}
```

#### **DELETE /api/v1/tasks/:taskId**

Delete a specific task by its ID. Only the authenticated user who owns the task can delete it.

Response:
```json
{
  "message": "Task deleted successfully"
}
```

---

## Middleware

### `authMiddleware`

This middleware ensures that the user is authenticated by verifying the JWT token and attaching the user to the `req.user` object. All protected routes use this middleware to ensure users can only access their own tasks.


---

## Additional Features

### `Rate Limiting`

I have implemented rate limiting in the application using the `express-rate-limit` package, which restricts the number of requests a user can make to the server within a specified time window (15 minutes). This helps prevent abuse and ensures fair usage of resources by limiting the maximum number of requests to 100 per IP address within that window. If a user exceeds the limit, they will receive a "Too many requests, please try again later" message.

---

## Error Codes

- **400 Bad Request**: The request was malformed or missing required parameters.
- **401 Unauthorized**: The user is not authenticated (missing or invalid token).
- **403 Forbidden**: The user is trying to access or modify a task that does not belong to them.
- **404 Not Found**: The requested resource (e.g., task) was not found.
- **500 Internal Server Error**: A server-side error occurred.

