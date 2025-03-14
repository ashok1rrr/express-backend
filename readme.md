Tech Stack
Node.js – Backend runtime
Express.js – Fast, minimalist backend framework
MongoDB – NoSQL database for storing user data
JWT (JSON Web Token) – Secure user authentication
Project Setup
1. Clone the Repository
To get started, clone the repository to your local machine:

bash
Copy
Edit
git clone https://github.com/JosephRemingston/onlyclick-recuritment.git
2. Install Dependencies
Navigate to the project folder and run the following command to install the required dependencies:

bash
Copy
Edit
npm install
3. Environment Variables
Create a .env file in the root directory of the project and add the following variables:

env
Copy
Edit
MONGO_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=your-secret-key
PORT=5000
MONGO_URI: Your MongoDB connection string. Replace localhost:27017/your-db-name with the URL to your MongoDB instance. If you're using MongoDB Atlas, it will be a different URL.
JWT_SECRET: A secret key used to sign JWT tokens. Keep this key private and secure.
PORT: The port number on which your server will run (default is 5000).
4. Run the Development Server
To start the development server, run the following command:

bash
Copy
Edit
npm run dev
This will start the server on http://localhost:5000.

API Endpoints
1. User Authentication
POST /signup
Register a new user.

Request Body:

json
Copy
Edit
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "yourpassword"
}
Response:

201 Created – User created successfully.
400 Bad Request – If the user already exists.
POST /login
Authenticate a user and issue a JWT token.

Request Body:

json
Copy
Edit
{
  "email": "user@example.com",
  "password": "yourpassword"
}
Response:

200 OK – JWT token issued successfully.
json
Copy
Edit
{
  "token": "your-jwt-token"
}
400 Bad Request – Invalid credentials.
2. CRUD API for Sample Resource (Tasks)
For this example, we will implement CRUD operations for a Task resource.

GET /tasks
Retrieve all tasks.

Response:

json
Copy
Edit
[
  {
    "id": "task-id-1",
    "title": "Task 1",
    "description": "Task description",
    "createdAt": "2025-03-14T10:00:00Z"
  }
]
POST /tasks
Create a new task.

Request Body:

json
Copy
Edit
{
  "title": "New Task",
  "description": "Description of the new task"
}
Response:

201 Created – Task created successfully.
PUT /tasks/:id
Update an existing task.

Request Body:

json
Copy
Edit
{
  "title": "Updated Task",
  "description": "Updated description of the task"
}
Response:

200 OK – Task updated successfully.
404 Not Found – If the task with the specified ID does not exist.
DELETE /tasks/:id
Delete a task.

Response:

200 OK – Task deleted successfully.
404 Not Found – If the task with the specified ID does not exist.
Database Schema
User Schema (MongoDB)
The user model defines the fields for user data:

ts
Copy
Edit
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
Task Schema (MongoDB)
The task model defines the fields for task data:

ts
Copy
Edit
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
Middleware
JWT Authentication Middleware
To protect private routes, you can use the following middleware to verify the JWT token:

ts
Copy
Edit
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
TypeScript Interfaces for API Responses
Here are the TypeScript interfaces for the API responses:

User Interface
ts
Copy
Edit
interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}
Task Interface
ts
Copy
Edit
interface Task {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}
